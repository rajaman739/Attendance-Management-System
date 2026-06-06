import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading]   = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [error, setError]       = useState("");

    const navigate = useNavigate();

    const login = async () => {
        setError("");
        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }
        setLoading(true);
        try {
            const response = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") login();
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "#f0f2f7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
            padding: "20px",
        }}>
            {/* Left decorative panel */}
            <div style={{
                width: "420px",
                minHeight: "520px",
                background: "#0f172a",
                borderRadius: "20px 0 0 20px",
                padding: "48px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
            }}>
                {/* blobs */}
                <div style={{
                    position: "absolute", top: "-50px", right: "-50px",
                    width: "200px", height: "200px", borderRadius: "50%",
                    background: "rgba(99,102,241,0.15)",
                }} />
                <div style={{
                    position: "absolute", bottom: "-60px", left: "-30px",
                    width: "220px", height: "220px", borderRadius: "50%",
                    background: "rgba(59,130,246,0.1)",
                }} />

                {/* Logo */}
                <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{
                        width: "44px", height: "44px", borderRadius: "12px",
                        background: "linear-gradient(135deg,#6366f1,#3b82f6)",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: "22px",
                        marginBottom: "20px",
                    }}>
                        🎓
                    </div>
                    <div style={{ fontSize: "24px", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>
                        Attendance<br />Management<br />System
                    </div>
                    <p style={{ fontSize: "13px", color: "#475569", marginTop: "14px", lineHeight: 1.7 }}>
                        Smart attendance tracking with face recognition, analytics and real-time insights.
                    </p>
                </div>

                {/* Feature pills */}
                <div style={{ position: "relative", zIndex: 1 }}>
                    {["🎯 Face Recognition", "📊 Analytics Dashboard", "🤖 AI Prediction", "📄 Report Export"].map((f) => (
                        <div key={f} style={{
                            display: "flex", alignItems: "center", gap: "10px",
                            padding: "9px 14px", borderRadius: "8px",
                            background: "rgba(255,255,255,0.05)",
                            border: "0.5px solid rgba(255,255,255,0.08)",
                            marginBottom: "8px", fontSize: "13px", color: "#94a3b8",
                        }}>
                            {f}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right form panel */}
            <div style={{
                width: "380px",
                minHeight: "520px",
                background: "#ffffff",
                borderRadius: "0 20px 20px 0",
                padding: "48px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                border: "0.5px solid #e2e8f0",
                borderLeft: "none",
            }}>
                <div style={{ marginBottom: "32px" }}>
                    <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                        Welcome back 👋
                    </h2>
                    <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "6px" }}>
                        Sign in to your admin account
                    </p>
                </div>

                {/* Error message */}
                {error && (
                    <div style={{
                        background: "#fef2f2", border: "0.5px solid #fecaca",
                        borderRadius: "8px", padding: "10px 14px",
                        fontSize: "13px", color: "#ef4444", marginBottom: "16px",
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                {/* Email */}
                <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "6px" }}>
                        Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{
                            width: "100%", padding: "10px 14px",
                            borderRadius: "8px", border: "0.5px solid #cbd5e1",
                            background: "#f8fafc", fontSize: "13px", color: "#0f172a",
                            outline: "none", boxSizing: "border-box",
                            transition: "border-color 0.15s",
                        }}
                        onFocus={e => e.target.style.borderColor = "#6366f1"}
                        onBlur={e  => e.target.style.borderColor = "#cbd5e1"}
                    />
                </div>

                {/* Password */}
                <div style={{ marginBottom: "24px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "6px" }}>
                        Password
                    </label>
                    <div style={{ position: "relative" }}>
                        <input
                            type={showPass ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={{
                                width: "100%", padding: "10px 40px 10px 14px",
                                borderRadius: "8px", border: "0.5px solid #cbd5e1",
                                background: "#f8fafc", fontSize: "13px", color: "#0f172a",
                                outline: "none", boxSizing: "border-box",
                                transition: "border-color 0.15s",
                            }}
                            onFocus={e => e.target.style.borderColor = "#6366f1"}
                            onBlur={e  => e.target.style.borderColor = "#cbd5e1"}
                        />
                        <button
                            onClick={() => setShowPass(!showPass)}
                            style={{
                                position: "absolute", right: "12px", top: "50%",
                                transform: "translateY(-50%)", background: "none",
                                border: "none", cursor: "pointer", fontSize: "14px",
                                color: "#94a3b8", padding: 0,
                            }}
                        >
                            {showPass ? "🙈" : "👁️"}
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <button
                    onClick={login}
                    disabled={loading}
                    style={{
                        width: "100%", padding: "11px",
                        borderRadius: "8px", border: "none",
                        background: loading ? "#a5b4fc" : "linear-gradient(135deg,#6366f1,#4f46e5)",
                        color: "#ffffff", fontSize: "14px", fontWeight: 600,
                        cursor: loading ? "not-allowed" : "pointer",
                        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
                        transition: "opacity 0.15s",
                        letterSpacing: "0.3px",
                    }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.9"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                >
                    {loading ? "Signing in…" : "Sign In →"}
                </button>

                <p style={{ fontSize: "11px", color: "#cbd5e1", textAlign: "center", marginTop: "24px" }}>
                    © {new Date().getFullYear()} AMS · Attendance Management System
                </p>
            </div>
        </div>
    );
}

export default Login;