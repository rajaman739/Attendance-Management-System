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
    formGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "14px",
        marginBottom: "16px",
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
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    },
    formActions: {
        display: "flex",
        gap: "10px",
        marginTop: "4px",
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
    semBadge: {
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: 600,
        background: "#eff6ff",
        color: "#3b82f6",
        border: "0.5px solid #bfdbfe",
    },
};

/* Avatar circle using initials */
function Avatar({ name }) {
    const initials = name
        ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
        : "?";
    return (
        <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: "#eff6ff", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "12px", fontWeight: 600,
            color: "#3b82f6", flexShrink: 0,
        }}>
            {initials}
        </div>
    );
}

function Students() {
    const [students, setStudents]       = useState([]);
    const [editingId, setEditingId]     = useState(null);
    const [name, setName]               = useState("");
    const [email, setEmail]             = useState("");
    const [rollNo, setRollNo]           = useState("");
    const [department, setDepartment]   = useState("");
    const [semester, setSemester]       = useState("");

    useEffect(() => { loadStudents(); }, []);

    const getToken   = () => localStorage.getItem("token");
    const authHeader = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

    const loadStudents = async () => {
        try {
            const res = await api.get("/students", authHeader());
            setStudents(res.data);
        } catch (e) { console.error(e); }
    };

    const clearForm = () => {
        setEditingId(null);
        setName(""); setEmail(""); setRollNo(""); setDepartment(""); setSemester("");
    };

    const saveStudent = async () => {
        if (!name.trim() || !rollNo.trim()) return;
        const payload = { name, email, rollNo, department, semester };
        try {
            if (editingId) {
                await api.put(`/students/${editingId}`, payload, authHeader());
            } else {
                await api.post("/students", payload, authHeader());
            }
            clearForm();
            loadStudents();
        } catch (e) { console.error(e); }
    };

    const editStudent = (student) => {
        setEditingId(student.id);
        setName(student.name);
        setEmail(student.email || "");
        setRollNo(student.rollNo);
        setDepartment(student.department);
        setSemester(student.semester);
    };

    const deleteStudent = async (id) => {
        if (!window.confirm("Delete this student?")) return;
        try {
            await api.delete(`/students/${id}`, authHeader());
            loadStudents();
        } catch (e) { console.error(e); }
    };

    const focusStyle  = (e) => e.target.style.borderColor = "#6366f1";
    const blurStyle   = (e) => e.target.style.borderColor = "#cbd5e1";

    return (
        <div style={S.root}>
            <Sidebar />

            <main style={S.main}>
                {/* Header */}
                <h1 style={S.pageTitle}>👨‍🎓 Students Management</h1>
                <p style={S.pageSub}>Add, edit and manage student records</p>

                {/* Form panel */}
                <div style={S.panel}>
                    <div style={S.panelTitle}>
                        {editingId ? "✏️ Edit Student" : "➕ Add New Student"}
                    </div>

                    <div style={S.formGrid}>
                        <div style={S.formGroup}>
                            <label style={S.label}>Full Name *</label>
                            <input
                                style={S.input}
                                placeholder="e.g. Aman Raj"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onFocus={focusStyle} onBlur={blurStyle}
                            />
                        </div>
                        <div style={S.formGroup}>
                            <label style={S.label}>Email</label>
                            <input
                                style={S.input}
                                placeholder="e.g. aman@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={focusStyle} onBlur={blurStyle}
                            />
                        </div>
                        <div style={S.formGroup}>
                            <label style={S.label}>Roll No *</label>
                            <input
                                style={S.input}
                                placeholder="e.g. RA2211003010001"
                                value={rollNo}
                                onChange={(e) => setRollNo(e.target.value)}
                                onFocus={focusStyle} onBlur={blurStyle}
                            />
                        </div>
                        <div style={S.formGroup}>
                            <label style={S.label}>Department</label>
                            <input
                                style={S.input}
                                placeholder="e.g. Computer Science"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                onFocus={focusStyle} onBlur={blurStyle}
                            />
                        </div>
                        <div style={S.formGroup}>
                            <label style={S.label}>Semester</label>
                            <input
                                style={S.input}
                                placeholder="e.g. 6"
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                                onFocus={focusStyle} onBlur={blurStyle}
                            />
                        </div>
                    </div>

                    <div style={S.formActions}>
                        <button style={S.btnPrimary} onClick={saveStudent}>
                            {editingId ? "✅ Update Student" : "➕ Add Student"}
                        </button>
                        {editingId && (
                            <button style={S.btnCancel} onClick={clearForm}>
                                Cancel
                            </button>
                        )}
                    </div>
                </div>

                {/* Table panel */}
                <div style={S.panel}>
                    <div style={S.panelTitle}>
                        All Students
                        <span style={S.countBadge}>{students.length}</span>
                    </div>

                    <div style={{ overflowX: "auto" }}>
                        <table style={S.table}>
                            <thead>
                                <tr>
                                    {["ID", "Student", "Email", "Roll No", "Department", "Semester", "Actions"].map((h) => (
                                        <th key={h} style={S.th}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {students.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} style={S.emptyState}>
                                            No students added yet
                                        </td>
                                    </tr>
                                ) : (
                                    students.map((student) => (
                                        <tr
                                            key={student.id}
                                            onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                        >
                                            <td style={{ ...S.td, color: "#94a3b8", fontSize: "12px" }}>
                                                #{student.id}
                                            </td>
                                            <td style={S.td}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <Avatar name={student.name} />
                                                    <span style={{ fontWeight: 500, color: "#0f172a" }}>
                                                        {student.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td style={{ ...S.td, color: "#64748b" }}>{student.email || "—"}</td>
                                            <td style={{ ...S.td, fontFamily: "monospace", fontSize: "12px" }}>
                                                {student.rollNo}
                                            </td>
                                            <td style={S.td}>{student.department || "—"}</td>
                                            <td style={S.td}>
                                                {student.semester
                                                    ? <span style={S.semBadge}>Sem {student.semester}</span>
                                                    : "—"}
                                            </td>
                                            <td style={S.td}>
                                                <div style={{ display: "flex", gap: "8px" }}>
                                                    <button style={S.btnWarning} onClick={() => editStudent(student)}>
                                                        ✏️ Edit
                                                    </button>
                                                    <button style={S.btnDanger} onClick={() => deleteStudent(student.id)}>
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

                    {students.length > 0 && (
                        <div style={{ marginTop: "14px", fontSize: "12px", color: "#94a3b8" }}>
                            {students.length} student{students.length !== 1 ? "s" : ""} total
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Students;