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
    formRow: {
        display: "flex",
        gap: "12px",
        alignItems: "flex-end",
        flexWrap: "wrap",
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
    input: {
        padding: "9px 14px",
        borderRadius: "8px",
        border: "0.5px solid #cbd5e1",
        background: "#f8fafc",
        fontSize: "13px",
        color: "#0f172a",
        outline: "none",
        width: "280px",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    },
    btnPrimary: {
        background: "#6366f1",
        color: "#fff",
        border: "none",
        padding: "9px 20px",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    },
    btnWarning: {
        background: "#fffbeb",
        color: "#d97706",
        border: "0.5px solid #fde68a",
        padding: "6px 12px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    },
    btnDanger: {
        background: "#fef2f2",
        color: "#ef4444",
        border: "0.5px solid #fecaca",
        padding: "6px 12px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    },
    btnCancel: {
        background: "#f8fafc",
        color: "#64748b",
        border: "0.5px solid #e2e8f0",
        padding: "9px 16px",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
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
    emptyState: {
        textAlign: "center",
        padding: "48px 0",
        color: "#94a3b8",
        fontSize: "14px",
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
};

function Subjects() {
    const [subjects, setSubjects]       = useState([]);
    const [subjectName, setSubjectName] = useState("");
    const [editingId, setEditingId]     = useState(null);

    useEffect(() => { loadSubjects(); }, []);

    const getToken  = () => localStorage.getItem("token");
    const authHeader = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

    const loadSubjects = async () => {
        try {
            const res = await api.get("/subjects", authHeader());
            setSubjects(res.data);
        } catch (e) { console.error(e); }
    };

    const saveSubject = async () => {
        if (!subjectName.trim()) return;
        try {
            if (editingId) {
                await api.put(`/subjects/${editingId}`, { subjectName }, authHeader());
                setEditingId(null);
            } else {
                await api.post("/subjects", { subjectName }, authHeader());
            }
            setSubjectName("");
            loadSubjects();
        } catch (e) { console.error(e); }
    };

    const editSubject = (subject) => {
        setEditingId(subject.id);
        setSubjectName(subject.subjectName);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setSubjectName("");
    };

    const deleteSubject = async (id) => {
        if (!window.confirm("Delete this subject?")) return;
        try {
            await api.delete(`/subjects/${id}`, authHeader());
            loadSubjects();
        } catch (e) { console.error(e); }
    };

    return (
        <div style={S.root}>
            <Sidebar />

            <main style={S.main}>
                {/* Header */}
                <h1 style={S.pageTitle}>📚 Subject Management</h1>
                <p style={S.pageSub}>Add, edit and remove subjects from the system</p>

                {/* Form panel */}
                <div style={S.panel}>
                    <div style={S.panelTitle}>
                        {editingId ? "✏️ Edit Subject" : "➕ Add New Subject"}
                    </div>
                    <div style={S.formRow}>
                        <div style={S.formGroup}>
                            <label style={S.label}>Subject Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Data Structures"
                                value={subjectName}
                                onChange={(e) => setSubjectName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && saveSubject()}
                                style={S.input}
                                onFocus={e => e.target.style.borderColor = "#6366f1"}
                                onBlur={e  => e.target.style.borderColor = "#cbd5e1"}
                            />
                        </div>

                        <button style={S.btnPrimary} onClick={saveSubject}>
                            {editingId ? "✅ Update Subject" : "➕ Add Subject"}
                        </button>

                        {editingId && (
                            <button style={S.btnCancel} onClick={cancelEdit}>
                                Cancel
                            </button>
                        )}
                    </div>
                </div>

                {/* Table panel */}
                <div style={S.panel}>
                    <div style={S.panelTitle}>
                        All Subjects
                        <span style={S.countBadge}>{subjects.length}</span>
                    </div>

                    <div style={{ overflowX: "auto" }}>
                        <table style={S.table}>
                            <thead>
                                <tr>
                                    {["ID", "Subject Name", "Actions"].map((h) => (
                                        <th key={h} style={S.th}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {subjects.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} style={S.emptyState}>
                                            No subjects added yet
                                        </td>
                                    </tr>
                                ) : (
                                    subjects.map((subject) => (
                                        <tr
                                            key={subject.id}
                                            onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                        >
                                            <td style={{ ...S.td, color: "#94a3b8", fontSize: "12px" }}>
                                                #{subject.id}
                                            </td>
                                            <td style={S.td}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <div style={{
                                                        width: "30px", height: "30px", borderRadius: "8px",
                                                        background: "#f5f3ff", display: "flex",
                                                        alignItems: "center", justifyContent: "center",
                                                        fontSize: "15px", flexShrink: 0,
                                                    }}>
                                                        📚
                                                    </div>
                                                    <span style={{ fontWeight: 500, color: "#0f172a" }}>
                                                        {subject.subjectName}
                                                    </span>
                                                </div>
                                            </td>
                                            <td style={S.td}>
                                                <div style={{ display: "flex", gap: "8px" }}>
                                                    <button
                                                        style={S.btnWarning}
                                                        onClick={() => editSubject(subject)}
                                                    >
                                                        ✏️ Edit
                                                    </button>
                                                    <button
                                                        style={S.btnDanger}
                                                        onClick={() => deleteSubject(subject.id)}
                                                    >
                                                        🗑 Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {subjects.length > 0 && (
                        <div style={{ marginTop: "14px", fontSize: "12px", color: "#94a3b8" }}>
                            {subjects.length} subject{subjects.length !== 1 ? "s" : ""} total
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Subjects;