import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Sidebar from "../components/Sidebar";

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
        marginBottom: "24px",
    },
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
    },
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
    countBadge: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f2f7",
        color: "#64748b",
        fontSize: "11px",
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: "20px",
        marginLeft: "8px",
    },
    emptyState: {
        textAlign: "center",
        padding: "48px 0",
        color: "#94a3b8",
        fontSize: "14px",
    },
    percentageBadge: {
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: 600,
        background: "#eff6ff",
        color: "#3b82f6",
        border: "0.5px solid #bfdbfe",
    },
    goodBadge: {
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: 600,
        background: "#ecfdf5",
        color: "#10b981",
        border: "0.5px solid #a7f3d0",
    },
    lowBadge: {
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: 600,
        background: "#fef2f2",
        color: "#ef4444",
        border: "0.5px solid #fecaca",
    },
};

function Avatar({ name }) {
    const initials = name
        ? name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
        : "?";

    return (
        <div
            style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#eff6ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 600,
                color: "#3b82f6",
                flexShrink: 0,
            }}
        >
            {initials}
        </div>
    );
}

function AttendanceAnalytics() {
    const [students, setStudents] = useState([]);
    const [analytics, setAnalytics] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const token =
                localStorage.getItem("token");

            const studentsResponse =
                await api.get(
                    "/students",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            setStudents(
                studentsResponse.data
            );

            const results = [];

            for (const student of studentsResponse.data) {
                const percentageResponse =
                    await api.get(
                        `/attendance/percentage/${student.id}`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );

                const lowResponse =
                    await api.get(
                        `/attendance/low/${student.id}`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );

                results.push({
                    student,
                    percentage:
                        percentageResponse.data,
                    lowAttendance:
                        lowResponse.data,
                });
            }

            setAnalytics(results);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={S.root}>
            <Sidebar />

            <main style={S.main}>
                <h1 style={S.pageTitle}>
                    📊 Attendance Analytics
                </h1>

                <p style={S.pageSub}>
                    Monitor attendance performance and
                    identify students with low attendance
                </p>

                <div style={S.panel}>
                    <div style={S.panelTitle}>
                        Student Analytics
                        <span style={S.countBadge}>
                            {analytics.length}
                        </span>
                    </div>

                    <div style={{ overflowX: "auto" }}>
                        <table style={S.table}>
                            <thead>
                                <tr>
                                    <th style={S.th}>ID</th>
                                    <th style={S.th}>
                                        Student
                                    </th>
                                    <th style={S.th}>
                                        Roll No
                                    </th>
                                    <th style={S.th}>
                                        Attendance %
                                    </th>
                                    <th style={S.th}>
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {analytics.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            style={
                                                S.emptyState
                                            }
                                        >
                                            No attendance
                                            analytics
                                            available
                                        </td>
                                    </tr>
                                ) : (
                                    analytics.map(
                                        (item) => (
                                            <tr
                                                key={
                                                    item
                                                        .student
                                                        .id
                                                }
                                                onMouseEnter={(
                                                    e
                                                ) =>
                                                    (e.currentTarget.style.background =
                                                        "#f8fafc")
                                                }
                                                onMouseLeave={(
                                                    e
                                                ) =>
                                                    (e.currentTarget.style.background =
                                                        "transparent")
                                                }
                                            >
                                                <td
                                                    style={{
                                                        ...S.td,
                                                        color:
                                                            "#94a3b8",
                                                        fontSize:
                                                            "12px",
                                                    }}
                                                >
                                                    #
                                                    {
                                                        item
                                                            .student
                                                            .id
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        S.td
                                                    }
                                                >
                                                    <div
                                                        style={{
                                                            display:
                                                                "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: "10px",
                                                        }}
                                                    >
                                                        <Avatar
                                                            name={
                                                                item
                                                                    .student
                                                                    .name
                                                            }
                                                        />

                                                        <span
                                                            style={{
                                                                fontWeight: 500,
                                                                color: "#0f172a",
                                                            }}
                                                        >
                                                            {
                                                                item
                                                                    .student
                                                                    .name
                                                            }
                                                        </span>
                                                    </div>
                                                </td>

                                                <td
                                                    style={{
                                                        ...S.td,
                                                        fontFamily:
                                                            "monospace",
                                                        fontSize:
                                                            "12px",
                                                    }}
                                                >
                                                    {
                                                        item
                                                            .student
                                                            .rollNo
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        S.td
                                                    }
                                                >
                                                    <span
                                                        style={
                                                            S.percentageBadge
                                                        }
                                                    >
                                                        {item.percentage.toFixed(
                                                            2
                                                        )}
                                                        %
                                                    </span>
                                                </td>

                                                <td
                                                    style={
                                                        S.td
                                                    }
                                                >
                                                    {item.lowAttendance ? (
                                                        <span
                                                            style={
                                                                S.lowBadge
                                                            }
                                                        >
                                                            🔴 Low
                                                            Attendance
                                                        </span>
                                                    ) : (
                                                        <span
                                                            style={
                                                                S.goodBadge
                                                            }
                                                        >
                                                            🟢 Good
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>

                    {analytics.length > 0 && (
                        <div
                            style={{
                                marginTop: "14px",
                                fontSize: "12px",
                                color: "#94a3b8",
                            }}
                        >
                            {analytics.length} student
                            {analytics.length !== 1
                                ? "s"
                                : ""}{" "}
                            analyzed
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default AttendanceAnalytics;