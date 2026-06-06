import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login               from "./pages/Login";
import Dashboard           from "./pages/Dashboard";
import Students            from "./pages/Students";
import Faculty             from "./pages/Faculty";
import Subjects            from "./pages/Subjects";
import Attendance          from "./pages/Attendance";
import AttendanceAnalytics from "./pages/AttendanceAnalytics";
import Prediction          from "./pages/Prediction";
import FaceRecognition     from "./pages/FaceRecognition";
import ProtectedRoute      from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"           element={<Login />} />

                <Route path="/dashboard"  element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/students"   element={<ProtectedRoute><Students /></ProtectedRoute>} />
                <Route path="/faculty"    element={<ProtectedRoute><Faculty /></ProtectedRoute>} />
                <Route path="/subjects"   element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
                <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
                <Route path="/analytics"  element={<ProtectedRoute><AttendanceAnalytics /></ProtectedRoute>} />
                <Route path="/prediction" element={<ProtectedRoute><Prediction /></ProtectedRoute>} />
                <Route path="/face"       element={<ProtectedRoute><FaceRecognition /></ProtectedRoute>} />

                {/* 404 fallback */}
                <Route path="*" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;