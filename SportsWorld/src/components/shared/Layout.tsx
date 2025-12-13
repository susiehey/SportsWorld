import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="flex flex-col h-screen">
            <header className="p-4 mb-8 bg-blue-600 text-white w-full flex flex-col top-0 justify-between items-center shadow-md">
                <p className="text-3xl font-black text-shadow-2xl">SportsWorld</p>
                <nav className="space-x-4 mt-2 text-md">
                    <NavLink className="hover:font-bold" to="/">Home</NavLink>
                    <NavLink className="hover:font-bold" to="/athletes">Athletes</NavLink>
                    <NavLink className="hover:font-bold" to="/register">Register Athletes</NavLink>
                    <NavLink className="hover:font-bold" to="/dashboard">Dashboard</NavLink>
                </nav>
            </header>

            <main className="p-2 grow">
                <Outlet />
            </main>

            <footer className="p-4 mt-8 bg-gray-200 text-center bottom-0 w-full flex justify-center">
                <p className="font-medium text-sm">
                    © 2025 SportsWorld
                </p>
            </footer>
        </div>
    );
}