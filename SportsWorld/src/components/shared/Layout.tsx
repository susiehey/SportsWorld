import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="flex flex-col h-screen">
            <header className="p-4 mb-8 bg-blue-600 text-white flex flex-col justify-between items-center">
                <h1 className="text-3xl font-bold">SportsWorld</h1>
                <nav className="space-x-4 text-md">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/athletes">Athletes</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/register">Register</NavLink>
                </nav>
            </header>

            <main className="p-2 mb-auto">
                <Outlet />
            </main>

            <footer className="p-4 mt-8 bg-gray-200 text-center static bottom-0 w-full">
                <p className="">
                    © {new Date().getFullYear()} SportsWorld
                </p>
            </footer>
        </div>
    );
}