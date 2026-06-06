import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import Sidebar from "../components/Sidebar";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

/* ─────────────────────────────────────────
   Inline styles — no external CSS file needed
───────────────────────────────────────── */
const S = {
    root: {
        display: "flex",
        minHeight: "100vh",
        background: "#f0f2f7",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    },
    main: {
        flex: 1,
        padding: "24px 28px",
        overflowY: "auto",
    },

    /* Hero */
    hero: {
        background: "#0f172a",
        borderRadius: "16px",
        padding: "28px 32px",
        marginBottom: "24px",
        position: "relative",
        overflow: "hidden",
    },
    heroInner: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        zIndex: 1,
    },
    heroTitle: {
        margin: 0,
        fontSize: "22px",
        fontWeight: 700,
        color: "#ffffff",
        letterSpacing: "-0.3px",
    },
    heroSub: {
        marginTop: "6px",
        fontSize: "13px",
        color: "#64748b",
    },
    heroBadge: {
        background: "rgba(99,102,241,0.2)",
        color: "#a5b4fc",
        fontSize: "11px",
        padding: "4px 14px",
        borderRadius: "20px",
        border: "0.5px solid rgba(99,102,241,0.35)",
        fontWeight: 500,
    },

    /* Stats */
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "14px",
        marginBottom: "24px",
    },
    statCard: {
        background: "#ffffff",
        borderRadius: "14px",
        padding: "18px 20px",
        border: "0.5px solid #e2e8f0",
    },
    statCardTop: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "14px",
    },
    statVal: {
        fontSize: "28px",
        fontWeight: 700,
        color: "#0f172a",
        lineHeight: 1,
    },
    statLabel: {
        fontSize: "12px",
        color: "#94a3b8",
        marginTop: "5px",
    },

    /* Panel */
    panel: {
        background: "#ffffff",
        borderRadius: "14px",
        border: "0.5px solid #e2e8f0",
        padding: "20px",
    },
    panelTitle: {
        fontSize: "14px",
        fontWeight: 600,
        color: "#0f172a",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },

    /* Quick Actions */
    actionsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "10px",
    },
    actionBtn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        padding: "14px 8px",
        borderRadius: "12px",
        border: "0.5px solid #e2e8f0",
        background: "#f8fafc",
        cursor: "pointer",
        transition: "all 0.15s",
    },
    actionLabel: {
        fontSize: "11px",
        color: "#475569",
        fontWeight: 500,
        textAlign: "center",
    },

    /* Chart row */
    chartRow: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginBottom: "20px",
    },
    chartHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "12px",
    },
    chartTitle: {
        fontSize: "14px",
        fontWeight: 600,
        color: "#0f172a",
    },
    legendRow: {
        display: "flex",
        gap: "14px",
        flexWrap: "wrap",
        marginBottom: "10px",
    },
    legendItem: {
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "12px",
        color: "#64748b",
    },
    legendDot: (color) => ({
        width: "10px",
        height: "10px",
        borderRadius: "2px",
        background: color,
        display: "inline-block",
        flexShrink: 0,
    }),

    /* Features */
    featuresGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "8px",
    },
    featureItem: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 12px",
        borderRadius: "10px",
        background: "#f8fafc",
        border: "0.5px solid #e2e8f0",
        fontSize: "13px",
        color: "#475569",
        fontWeight: 500,
    },
};

/* ─────────────────────────────────────────
   Small helpers
───────────────────────────────────────── */
function StatIcon({ bg, color, emoji }) {
    return (
        <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: bg, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "18px",
        }}>
            {emoji}
        </div>
    );
}

function TrendBadge({ value, up }) {
    return (
        <span style={{
            fontSize: "11px", fontWeight: 500, padding: "3px 8px",
            borderRadius: "20px",
            background: up ? "#f0fdf4" : "#f8fafc",
            color: up ? "#16a34a" : "#64748b",
        }}>
            {value}
        </span>
    );
}

const CHART_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#6366f1"];

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: "#0f172a", padding: "8px 12px",
            borderRadius: "8px", fontSize: "12px", color: "#fff",
        }}>
            {payload[0].name}: <strong>{payload[0].value}</strong>
        </div>
    );
};

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
function Dashboard() {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/dashboard", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        loadDashboard();
    }, []);

    const attendanceData = [
        { name: "Attendance", value: data.totalAttendanceRecords || 0 },
        { name: "Students",   value: data.totalStudents || 0 },
    ];

    const systemData = [
        { name: "Students", value: data.totalStudents || 0 },
        { name: "Faculty",  value: data.totalFaculty || 0 },
        { name: "Subjects", value: data.totalSubjects || 0 },
    ];

    const stats = [
        { label: "Total Students",      value: data.totalStudents || 0,           bg: "#eff6ff", iconBg: "#eff6ff", color: "#3b82f6", emoji: "👨‍🎓", trend: "+12%", up: true  },
        { label: "Total Faculty",        value: data.totalFaculty || 0,            bg: "#f0fdf4", iconBg: "#f0fdf4", color: "#22c55e", emoji: "👨‍🏫", trend: "+3%",  up: true  },
        { label: "Subjects Enrolled",    value: data.totalSubjects || 0,           bg: "#fffbeb", iconBg: "#fffbeb", color: "#f59e0b", emoji: "📚", trend: "Stable", up: false },
        { label: "Attendance Records",   value: data.totalAttendanceRecords || 0,  bg: "#f5f3ff", iconBg: "#f5f3ff", color: "#8b5cf6", emoji: "✅", trend: "+8%",  up: true  },
    ];

    const actions = [
        { label: "Add Student", bg: "#eff6ff", color: "#3b82f6", emoji: "➕", path: "/students"   },
        { label: "Attendance",  bg: "#f0fdf4", color: "#22c55e", emoji: "📋", path: "/attendance" },
        { label: "Analytics",   bg: "#fffbeb", color: "#f59e0b", emoji: "📊", path: "/analytics"  },
        { label: "Prediction",  bg: "#f5f3ff", color: "#8b5cf6", emoji: "🤖", path: "/prediction" },
        { label: "Reports",     bg: "#fef2f2", color: "#ef4444", emoji: "📄", path: "/attendance" },
    ];

    const features = [
        { icon: "🎯", label: "Face Recognition Attendance" },
        { icon: "📊", label: "Analytics Dashboard" },
        { icon: "🤖", label: "Attendance Prediction" },
        { icon: "📄", label: "PDF Report Export" },
        { icon: "📑", label: "Excel Report Export" },
        { icon: "🔐", label: "JWT Authentication" },
        { icon: "⚡", label: "Spring Boot REST APIs" },
        { icon: "⚛️", label: "React Admin Dashboard" },
    ];

    return (
        <div style={S.root}>
            <Sidebar />

            <main style={S.main}>
                {/* ── Hero ── */}
                <div style={S.hero}>
                    {/* decorative blobs */}
                    <div style={{
                        position: "absolute", top: "-40px", right: "-40px",
                        width: "180px", height: "180px", borderRadius: "50%",
                        background: "rgba(99,102,241,0.12)", zIndex: 0,
                    }} />
                    <div style={{
                        position: "absolute", bottom: "-60px", right: "80px",
                        width: "140px", height: "140px", borderRadius: "50%",
                        background: "rgba(59,130,246,0.08)", zIndex: 0,
                    }} />
                    <div style={S.heroInner}>
                        <div>
                            <h1 style={S.heroTitle}>🎓 Attendance Management System</h1>
                            <p style={S.heroSub}>Face Recognition &bull; Analytics &bull; Prediction &bull; Reports</p>
                        </div>
                        <span style={S.heroBadge}>Live System</span>
                    </div>
                </div>

                {/* ── Stats ── */}
                <div style={S.statsGrid}>
                    {stats.map((s) => (
                        <div key={s.label} style={S.statCard}>
                            <div style={S.statCardTop}>
                                <StatIcon bg={s.iconBg} emoji={s.emoji} />
                                <TrendBadge value={s.trend} up={s.up} />
                            </div>
                            <div style={S.statVal}>{s.value}</div>
                            <div style={S.statLabel}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* ── Quick Actions ── */}
                <div style={{ ...S.panel, marginBottom: "20px" }}>
                    <div style={S.panelTitle}>⚡ Quick Actions</div>
                    <div style={S.actionsGrid}>
                        {actions.map((a) => (
                            <div key={a.label} style={S.actionBtn}
                                onClick={() => navigate(a.path)}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = "#eff6ff";
                                    e.currentTarget.style.borderColor = "#bfdbfe";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = "#f8fafc";
                                    e.currentTarget.style.borderColor = "#e2e8f0";
                                }}
                            >
                                <div style={{
                                    width: "36px", height: "36px", borderRadius: "10px",
                                    background: a.bg, display: "flex",
                                    alignItems: "center", justifyContent: "center", fontSize: "18px",
                                }}>
                                    {a.emoji}
                                </div>
                                <span style={S.actionLabel}>{a.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Charts ── */}
                <div style={S.chartRow}>
                    {/* Attendance Overview */}
                    <div style={S.panel}>
                        <div style={S.chartHeader}>
                            <span style={S.chartTitle}>Attendance Overview</span>
                        </div>
                        <div style={S.legendRow}>
                            {attendanceData.map((d, i) => (
                                <span key={d.name} style={S.legendItem}>
                                    <span style={S.legendDot(CHART_COLORS[i])} />
                                    {d.name}
                                </span>
                            ))}
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={attendanceData}
                                    dataKey="value"
                                    innerRadius={55}
                                    outerRadius={85}
                                    paddingAngle={3}
                                >
                                    {attendanceData.map((_, i) => (
                                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* System Distribution */}
                    <div style={S.panel}>
                        <div style={S.chartHeader}>
                            <span style={S.chartTitle}>System Distribution</span>
                        </div>
                        <div style={S.legendRow}>
                            {systemData.map((d, i) => (
                                <span key={d.name} style={S.legendItem}>
                                    <span style={S.legendDot(CHART_COLORS[i])} />
                                    {d.name}
                                </span>
                            ))}
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={systemData}
                                    dataKey="value"
                                    innerRadius={55}
                                    outerRadius={85}
                                    paddingAngle={3}
                                >
                                    {systemData.map((_, i) => (
                                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* ── Features ── */}
                <div style={S.panel}>
                    <div style={S.panelTitle}>🚀 Project Features</div>
                    <div style={S.featuresGrid}>
                        {features.map((f) => (
                            <div key={f.label} style={S.featureItem}>
                                <span style={{ fontSize: "16px" }}>{f.icon}</span>
                                {f.label}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;