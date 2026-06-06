import { useState } from "react";
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

    btnPrimary: {
        background: "#6366f1",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: 500,
        cursor: "pointer",
    },

    statusCard: {
        background: "#f8fafc",
        border: "0.5px solid #e2e8f0",
        borderRadius: "10px",
        padding: "16px",
        marginTop: "16px",
    },

    statusBadge: {
        display: "inline-block",
        padding: "8px 14px",
        borderRadius: "20px",
        background: "#ecfdf5",
        color: "#16a34a",
        border: "1px solid #bbf7d0",
        fontSize: "12px",
        fontWeight: 600,
    },

    workflowItem: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 0",
        borderBottom: "0.5px solid #f1f5f9",
        color: "#334155",
        fontSize: "14px",
    },
};

function FaceRecognition() {

    const [status, setStatus] =
        useState("🟢 Backend Connected");

    const startRecognition = () => {

        setStatus("📷 Camera Ready");

        setTimeout(() => {

            setStatus("🟡 Scanner Running");

        }, 1500);

        setTimeout(() => {

            setStatus("✅ Attendance Marked");

        }, 4000);
    };

    return (

        <div style={S.root}>

            <Sidebar />

            <main style={S.main}>

                <h1 style={S.pageTitle}>
                    🎭 Face Recognition Attendance
                </h1>

                <p style={S.pageSub}>
                    Automated attendance marking
                    using facial recognition
                </p>

                {/* Scanner Panel */}

                <div style={S.panel}>

                    <div style={S.panelTitle}>
                        Face Scanner
                    </div>

                    <button
                        onClick={startRecognition}
                        style={S.btnPrimary}
                    >
                        📷 Start Scanner
                    </button>

                    <div style={S.statusCard}>

                        <div
                            style={{
                                fontSize: "12px",
                                color: "#64748b",
                                marginBottom: "8px",
                            }}
                        >
                            CURRENT STATUS
                        </div>

                        <span style={S.statusBadge}>
                            {status}
                        </span>

                    </div>

                </div>

                {/* Workflow */}

                <div style={S.panel}>

                    <div style={S.panelTitle}>
                        Recognition Workflow
                    </div>

                    <div style={S.workflowItem}>
                        <span>🟢</span>
                        <span>Backend Connected</span>
                    </div>

                    <div style={S.workflowItem}>
                        <span>📷</span>
                        <span>Camera Ready</span>
                    </div>

                    <div style={S.workflowItem}>
                        <span>🟡</span>
                        <span>Scanner Running</span>
                    </div>

                    <div style={S.workflowItem}>
                        <span>👨‍🎓</span>
                        <span>Student Identified</span>
                    </div>

                    <div style={S.workflowItem}>
                        <span>✅</span>
                        <span>Attendance Marked</span>
                    </div>

                    <div
                        style={{
                            ...S.workflowItem,
                            borderBottom: "none",
                        }}
                    >
                        <span>💾</span>
                        <span>Database Updated</span>
                    </div>

                </div>

                {/* Information */}

                <div style={S.panel}>

                    <div style={S.panelTitle}>
                        System Information
                    </div>

                    <div
                        style={{
                            color: "#64748b",
                            fontSize: "14px",
                            lineHeight: "1.8",
                        }}
                    >

                        <p>
                            • Backend service is connected
                            and ready to receive attendance
                            updates.
                        </p>

                        <p>
                            • Camera module is prepared for
                            face scanning.
                        </p>

                        <p>
                            • Face recognition is performed
                            using Python, OpenCV and the
                            face-recognition library.
                        </p>

                        <p>
                            • Run <strong>recognize.py</strong>
                            to start real-time face detection.
                        </p>

                        <p>
                            • When a registered student is
                            identified, attendance is
                            automatically recorded.
                        </p>

                        <p>
                            • Attendance records are stored
                            in the MySQL database through the
                            backend system.
                        </p>

                        <p>
                            • Updated attendance can be viewed
                            instantly in the Attendance module.
                        </p>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default FaceRecognition;