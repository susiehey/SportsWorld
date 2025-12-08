import { Routes, Route } from "react-router-dom";
import Layout from "../components/shared/Layout";
import { AthletesPage, DashboardPage, RegisterPage, HomePage } from "../pages";

export default function AppRouting() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/athletes" element={<AthletesPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<HomePage />} />
            </Route>
        </Routes>
    );
}