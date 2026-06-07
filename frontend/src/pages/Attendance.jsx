import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Sidebar from "../components/Sidebar";

/* ─────────────────────────────────────────
   Style tokens
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

    /* Page header */
    pageHeader: {
        marginBottom: "24px",
    },
    pageTitle: {
        fontSize: "22px",
        fontWeight: 700,
        color: "#0f172a",
        margin: 0,
    },
    pageSub: {
        fontSize: "13px",
        color: "#94a3b8",
        marginTop: "4px",
    },

    /* Stat cards */
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
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
    statIcon: (bg) => ({
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
    }),
    statVal: (color) => ({
        fontSize: "28px",
        fontWeight: 700,
        color: color || "#0f172a",
        lineHeight: 1,
    }),
    statLabel: {
        fontSize: "12px",
        color: "#94a3b8",
        marginTop: "5px",
    },
    statBadge: (up) => ({
        fontSize: "11px",
        fontWeight: 500,
        padding: "3px 8px",
        borderRadius: "20px",
        background: up ? "#f0fdf4" : "#fef2f2",
        color: up ? "#16a34a" : "#ef4444",
    }),

    /* Panel */
    panel: {
        background: "#ffffff",
        borderRadius: "14px",
        border: "0.5px solid #e2e8f0",
        padding: "20px",
        marginBottom: "20px",
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

    /* Form row */
    formRow: {
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        alignItems: "flex-end",
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    label: {
        fontSize: "12px",
        fontWeight: 500,
        color: "#475569",
    },
    select: {
        padding: "9px 12px",
        borderRadius: "8px",
        border: "0.5px solid #cbd5e1",
        background: "#f8fafc",
        fontSize: "13px",
        color: "#0f172a",
        outline: "none",
        minWidth: "170px",
        cursor: "pointer",
    },
    input: {
        padding: "9px 12px",
        borderRadius: "8px",
        border: "0.5px solid #cbd5e1",
        background: "#f8fafc",
        fontSize: "13px",
        color: "#0f172a",
        outline: "none",
        width: "220px",
    },

    /* Buttons */
    btnPrimary: {
        background: "#6366f1",
        color: "#fff",
        border: "none",
        padding: "9px 20px",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: 500,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
    },
    btnDanger: {
        background: "#fef2f2",
        color: "#ef4444",
        border: "0.5px solid #fecaca",
        padding: "9px 20px",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: 500,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
    },
    btnSuccess: {
        background: "#f0fdf4",
        color: "#16a34a",
        border: "0.5px solid #bbf7d0",
        padding: "9px 20px",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: 500,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
    },
    btnIconDanger: {
        background: "#fef2f2",
        color: "#ef4444",
        border: "0.5px solid #fecaca",
        padding: "6px 12px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: 500,
        cursor: "pointer",
    },

    /* Toolbar */
    toolbar: {
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        alignItems: "center",
        marginBottom: "16px",
    },

    /* Table */
    table: {
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "13px",
    },
    th: {
        padding: "10px 14px",
        textAlign: "left",
        fontSize: "11px",
        fontWeight: 600,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: "0.6px",
        borderBottom: "0.5px solid #e2e8f0",
        background: "#f8fafc",
    },
    td: {
        padding: "12px 14px",
        borderBottom: "0.5px solid #f1f5f9",
        color: "#334155",
        verticalAlign: "middle",
    },
    badge: (present) => ({
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: 600,
        background: present ? "#f0fdf4" : "#fef2f2",
        color: present ? "#16a34a" : "#ef4444",
        border: `0.5px solid ${present ? "#bbf7d0" : "#fecaca"}`,
    }),
    emptyState: {
        textAlign: "center",
        padding: "48px 0",
        color: "#94a3b8",
        fontSize: "14px",
    },
};

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
function Attendance() {
    const [attendance, setAttendance] = useState([]);
    const [students, setStudents]     = useState([]);
    const [subjects, setSubjects]     = useState([]);

    const [studentId, setStudentId]   = useState("");
    const [subjectId, setSubjectId]   = useState("");
    const [status, setStatus]         = useState("PRESENT");

    const [search, setSearch]             = useState("");
    const [filterStatus, setFilterStatus] = useState("ALL");

    useEffect(() => {
        loadAttendance();
        loadStudents();
        loadSubjects();
    }, []);

    const getToken = () => localStorage.getItem("token");
    const authHeader = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

    const loadAttendance = async () => {
        try {
            const res = await api.get("/attendance", authHeader());
            setAttendance(res.data);
        } catch (e) { console.error(e); }
    };

    const loadStudents = async () => {
        try {
            const res = await api.get("/students", authHeader());
            setStudents(res.data);
        } catch (e) { console.error(e); }
    };

    const loadSubjects = async () => {
        try {
            const res = await api.get("/subjects", authHeader());
            setSubjects(res.data);
        } catch (e) { console.error(e); }
    };

    const markAttendance = async () => {
        if (!studentId || !subjectId) {
            alert("Please select student and subject");
            return;
        }
        try {
            await api.post("/attendance", { studentId, subjectId, status }, authHeader());
            alert("Attendance marked successfully");
            setStudentId(""); setSubjectId(""); setStatus("PRESENT");
            loadAttendance();
        } catch (e) {
            console.error(e);
            alert("Failed to mark attendance");
        }
    };

    const deleteAttendance = async (id) => {
        if (!window.confirm("Delete this attendance record?")) return;
        try {
            await api.delete(`/attendance/${id}`, authHeader());
            loadAttendance();
        } catch (e) { console.error(e); }
    };

const exportPdf = () =>
    window.open(
        "https://attendance-backend-0sk5.onrender.com/api/reports/attendance/pdf",
        "_blank"
    );

const exportExcel = () =>
    window.open(
        "https://attendance-backend-0sk5.onrender.com/api/reports/attendance/excel",
        "_blank"
    );

    const filteredAttendance = attendance.filter((r) => {
        const matchesSearch  = r.student?.name?.toLowerCase().includes(search.toLowerCase());
        const matchesStatus  = filterStatus === "ALL" ? true : r.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const presentCount = attendance.filter((a) => a.status === "PRESENT").length;
    const absentCount  = attendance.filter((a) => a.status === "ABSENT").length;
    const rate = attendance.length ? Math.round((presentCount / attendance.length) * 100) : 0;

    return (
        <div style={S.root}>
            <Sidebar />

            <main style={S.main}>
                {/* ── Page header ── */}
                <div style={S.pageHeader}>
                    <h1 style={S.pageTitle}>📋 Attendance Management</h1>
                    <p style={S.pageSub}>Mark, filter and export student attendance records</p>
                </div>

                {/* ── Stats ── */}
                <div style={S.statsGrid}>
                    <div style={S.statCard}>
                        <div style={S.statCardTop}>
                            <div style={S.statIcon("#eff6ff")}>📊</div>
                            <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>Total</span>
                        </div>
                        <div style={S.statVal()}>{ attendance.length }</div>
                        <div style={S.statLabel}>Total Records</div>
                    </div>

                    <div style={S.statCard}>
                        <div style={S.statCardTop}>
                            <div style={S.statIcon("#f0fdf4")}>✅</div>
                            <span style={S.statBadge(true)}>{rate}% rate</span>
                        </div>
                        <div style={S.statVal("#16a34a")}>{ presentCount }</div>
                        <div style={S.statLabel}>Present</div>
                    </div>

                    <div style={S.statCard}>
                        <div style={S.statCardTop}>
                            <div style={S.statIcon("#fef2f2")}>❌</div>
                            <span style={S.statBadge(false)}>{100 - rate}% absent</span>
                        </div>
                        <div style={S.statVal("#ef4444")}>{ absentCount }</div>
                        <div style={S.statLabel}>Absent</div>
                    </div>
                </div>

                {/* ── Mark Attendance ── */}
                <div style={S.panel}>
                    <div style={S.panelTitle}>✏️ Mark Attendance</div>
                    <div style={S.formRow}>
                        <div style={S.formGroup}>
                            <label style={S.label}>Student</label>
                            <select style={S.select} value={studentId} onChange={(e) => setStudentId(e.target.value)}>
                                <option value="">Select student</option>
                                {students.map((s) => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>

                        <div style={S.formGroup}>
                            <label style={S.label}>Subject</label>
                            <select style={S.select} value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
                                <option value="">Select subject</option>
                                {subjects.map((s) => (
                                    <option key={s.id} value={s.id}>{s.subjectName}</option>
                                ))}
                            </select>
                        </div>

                        <div style={S.formGroup}>
                            <label style={S.label}>Status</label>
                            <select style={S.select} value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="PRESENT">Present</option>
                                <option value="ABSENT">Absent</option>
                            </select>
                        </div>

                        <div style={{ paddingBottom: "1px" }}>
                            <button style={S.btnPrimary} onClick={markAttendance}>
                                ✅ Mark Attendance
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Records panel ── */}
                <div style={S.panel}>
                    <div style={S.panelTitle}>📄 Attendance Records</div>

                    {/* Toolbar */}
                    <div style={S.toolbar}>
                        <input
                            type="text"
                            placeholder="🔍  Search student..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={S.input}
                        />

                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            style={{ ...S.select, minWidth: "130px" }}
                        >
                            <option value="ALL">All Status</option>
                            <option value="PRESENT">Present</option>
                            <option value="ABSENT">Absent</option>
                        </select>

                        <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
                            <button style={S.btnDanger} onClick={exportPdf}>
                                📄 Export PDF
                            </button>
                            <button style={S.btnSuccess} onClick={exportExcel}>
                                📑 Export Excel
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div style={{ overflowX: "auto" }}>
                        <table style={S.table}>
                            <thead>
                                <tr>
                                    {["ID", "Student", "Subject", "Date", "Status", "Actions"].map((h) => (
                                        <th key={h} style={S.th}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAttendance.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} style={S.emptyState}>
                                            No attendance records found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredAttendance.map((record) => (
                                        <tr key={record.id}
                                            style={{ transition: "background 0.1s" }}
                                            onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                        >
                                            <td style={{ ...S.td, color: "#94a3b8", fontSize: "12px" }}>#{record.id}</td>
                                            <td style={S.td}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                    <div style={{
                                                        width: "28px", height: "28px", borderRadius: "50%",
                                                        background: "#eff6ff", display: "flex", alignItems: "center",
                                                        justifyContent: "center", fontSize: "12px", fontWeight: 600,
                                                        color: "#3b82f6", flexShrink: 0,
                                                    }}>
                                                        {record.student?.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    {record.student?.name}
                                                </div>
                                            </td>
                                            <td style={S.td}>{record.subject?.subjectName}</td>
                                            <td style={{ ...S.td, color: "#64748b" }}>{record.attendanceDate}</td>
                                            <td style={S.td}>
                                                <span style={S.badge(record.status === "PRESENT")}>
                                                    {record.status}
                                                </span>
                                            </td>
                                            <td style={S.td}>
                                                <button
                                                    style={S.btnIconDanger}
                                                    onClick={() => deleteAttendance(record.id)}
                                                >
                                                    🗑 Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer count */}
                    {filteredAttendance.length > 0 && (
                        <div style={{ marginTop: "14px", fontSize: "12px", color: "#94a3b8" }}>
                            Showing {filteredAttendance.length} of {attendance.length} records
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Attendance;