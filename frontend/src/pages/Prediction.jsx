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
    btnPrimary: {
        background: "#6366f1",
        color: "#fff",
        border: "none",
        padding: "9px 20px",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: 500,
        cursor: "pointer",
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
        borderBottom: "0.5px solid #e2e8f0",
        background: "#f8fafc",
    },
    td: {
        padding: "12px 14px",
        borderBottom: "0.5px solid #f1f5f9",
        color: "#334155",
    },
    emptyState: {
        textAlign: "center",
        padding: "48px 0",
        color: "#94a3b8",
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
                fontWeight: 600,
                color: "#3b82f6",
            }}
        >
            {initials}
        </div>
    );
}

function Prediction() {

    const [predictions, setPredictions] = useState([]);
    const [requiredClasses, setRequiredClasses] = useState({});

    useEffect(() => {
        loadPredictions();
    }, []);

    const authHeader = () => ({
        headers: {
            Authorization:
                `Bearer ${localStorage.getItem("token")}`,
        },
    });

    const loadPredictions = async () => {

        try {

            const response =
                await api.get(
                    "/predictions",
                    authHeader()
                );

            setPredictions(response.data);

            const classesMap = {};

            for (const prediction of response.data) {

                try {

                    const requiredResponse =
                        await api.get(
                            `/attendance/required/${prediction.student.id}`,
                            authHeader()
                        );

                    classesMap[
                        prediction.student.id
                    ] = requiredResponse.data;

                } catch {

                    classesMap[
                        prediction.student.id
                    ] = 0;
                }
            }

            setRequiredClasses(classesMap);

        } catch (error) {

            console.error(error);
        }
    };

    const generateAllPredictions = async () => {

        try {

            await api.post(
                "/predictions/generate-all",
                {},
                authHeader()
            );

            loadPredictions();

        } catch (error) {

            console.error(error);
        }
    };

    const deletePrediction = async (id) => {

        try {

            await api.delete(
                `/predictions/${id}`,
                authHeader()
            );

            loadPredictions();

        } catch (error) {

            console.error(error);
        }
    };

    const getRiskBadge = (risk) => {

        switch (risk) {

            case "LOW":
                return {
                    background: "#ecfdf5",
                    color: "#10b981",
                    border: "1px solid #a7f3d0",
                };

            case "MEDIUM":
                return {
                    background: "#fffbeb",
                    color: "#d97706",
                    border: "1px solid #fde68a",
                };

            default:
                return {
                    background: "#fef2f2",
                    color: "#ef4444",
                    border: "1px solid #fecaca",
                };
        }
    };

    return (

        <div style={S.root}>

            <Sidebar />

            <main style={S.main}>

                <h1 style={S.pageTitle}>
                    📈 Attendance Prediction
                </h1>

                <p style={S.pageSub}>
                    AI Attendance Risk Analysis
                </p>

                <div style={S.panel}>

                    <button
                        style={S.btnPrimary}
                        onClick={generateAllPredictions}
                    >
                        ⚡ Generate Predictions
                    </button>

                </div>

                <div style={S.panel}>

                    <div style={S.panelTitle}>
                        Prediction Records
                    </div>

                    <table style={S.table}>

                        <thead>

                        <tr>

                            <th style={S.th}>ID</th>
                            <th style={S.th}>Student</th>
                            <th style={S.th}>Roll No</th>
                            <th style={S.th}>Attendance %</th>
                            <th style={S.th}>Risk</th>
                            <th style={S.th}>
                                Classes Needed
                            </th>
                            <th style={S.th}>Date</th>
                            <th style={S.th}>Actions</th>

                        </tr>

                        </thead>

                        <tbody>

                        {
                            predictions.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        style={S.emptyState}
                                    >
                                        No Predictions Found
                                    </td>

                                </tr>

                            ) : (

                                predictions.map(
                                    (prediction) => (

                                    <tr
                                        key={prediction.id}
                                    >

                                        <td style={S.td}>
                                            {prediction.id}
                                        </td>

                                        <td style={S.td}>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                }}
                                            >

                                                <Avatar
                                                    name={
                                                        prediction.student?.name
                                                    }
                                                />

                                                {
                                                    prediction.student?.name
                                                }

                                            </div>

                                        </td>

                                        <td style={S.td}>
                                            {
                                                prediction.student?.rollNo
                                            }
                                        </td>

                                        <td style={S.td}>
                                            {
                                                prediction.predictedPercentage
                                            }%
                                        </td>

                                        <td style={S.td}>

                                            <span
                                                style={{
                                                    ...getRiskBadge(
                                                        prediction.riskLevel
                                                    ),
                                                    padding:
                                                        "5px 10px",
                                                    borderRadius:
                                                        "20px",
                                                    fontSize:
                                                        "11px",
                                                    fontWeight:
                                                        "600",
                                                }}
                                            >
                                                {
                                                    prediction.riskLevel
                                                }
                                            </span>

                                        </td>

                                        <td
                                            style={{
                                                ...S.td,
                                                fontWeight:
                                                    "bold",
                                            }}
                                        >

                                            {
                                                requiredClasses[
                                                prediction.student?.id
                                                ]
                                            }

                                        </td>

                                        <td style={S.td}>

                                            {
                                                new Date(
                                                    prediction.predictionDate
                                                ).toLocaleString()
                                            }

                                        </td>

                                        <td style={S.td}>

                                            <button
                                                style={
                                                    S.btnDanger
                                                }
                                                onClick={() =>
                                                    deletePrediction(
                                                        prediction.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>
                                ))
                            )
                        }

                        </tbody>

                    </table>

                </div>

            </main>

        </div>
    );
}

export default Prediction;