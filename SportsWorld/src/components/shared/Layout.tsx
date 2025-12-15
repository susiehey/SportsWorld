import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="flex flex-col h-screen">
            <header className="flex flex-col p-4 mb-8 bg-blue-600 text-white w-full justify-between items-center">
                <p className="text-3xl font-bold">SportsWorld</p>
                <nav className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
                    <NavLink className="hover:font-bold hover:scale-105 transition-transform" to="/">Home</NavLink>
                    <NavLink className="hover:font-bold hover:scale-105 transition-transform" to="/athletes">Athletes</NavLink>
                    <NavLink className="hover:font-bold hover:scale-105 transition-transform" to="/register">Register Athletes</NavLink>
                    <NavLink className="hover:font-bold hover:scale-105 transition-transform" to="/dashboard">Dashboard</NavLink>
                </nav>
            </header>

            <main className="p-2 grow">
                <Outlet />
            </main>

            <footer className="p-4 mt-8 flex justify-center bg-gray-200 text-center w-full">
                <p className="font-medium text-sm">
                    © 2025 SportsWorld
                </p>
            </footer>
        </div>
    );
}