import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <header className="p-4 bg-blue-600 text-white flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-3xl font-bold">SportsWorld</h1>
                <nav className="space-x-4 text-md font-medium">
                    <NavLink to="/">Home</NavLink> |{" "}
                    <NavLink to="/athletes">Athletes</NavLink> |{" "}
                    <NavLink to="/dashboard">Dashboard</NavLink> |{" "}
                    <NavLink to="/register">Register</NavLink>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

            <footer className="p-4 bg-gray-200 text-center mt-8">
                <p className="">
                    © {new Date().getFullYear()} SportsWorld
                </p>
            </footer>
        </>
    );
}