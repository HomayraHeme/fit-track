"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-2">
                        <img className=" h-10 w-10" src="/fintrack-removebg-preview.png" alt="" />
                        <Link href="/" className="text-2xl font-bold text-teal-600">
                            FitTrack
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link href="/" className="hover:text-teal-500">Home</Link>
                        <Link href="/workout" className="hover:text-teal-500">Workouts</Link>
                        <Link href="/about" className="hover:text-teal-500">About</Link>
                        <Link href="/contact" className="hover:text-teal-500">Contact</Link>

                        {/* Auth Buttons */}
                        {!session ? (
                            <Link href='/login'><button

                                className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
                            >
                                Login
                            </button></Link>
                        ) : (
                            <div className="relative group">
                                <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition">
                                    {session.user.name}
                                </button>
                                {/* Dropdown */}
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition duration-200 invisible group-hover:visible">
                                    <Link
                                        href="/workout/add"
                                        className="block px-4 py-2 hover:bg-teal-100"
                                    >
                                        Add Workout
                                    </Link>
                                    <Link
                                        href="/workout/delete"
                                        className="block px-4 py-2 hover:bg-teal-100"
                                    >
                                        Manage Workouts
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full text-left px-4 py-2 hover:bg-teal-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu}>
                            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-2">
                    <Link href="/" className="block hover:text-teal-500">Home</Link>
                    <Link href="/workouts" className="block hover:text-teal-500">Workouts</Link>
                    <Link href="/about" className="block hover:text-teal-500">About</Link>
                    <Link href="/contact" className="block hover:text-teal-500">Contact</Link>

                    {!session ? (
                        <button
                            onClick={() => signIn("google")}
                            className="w-full bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
                        >
                            Login
                        </button>
                    ) : (
                        <>
                            <Link
                                href="/workout/add"
                                className="block px-4 py-2 hover:bg-teal-100"
                            >
                                Add Workout
                            </Link>
                            <Link
                                href="/workout/delete"
                                className="block px-4 py-2 hover:bg-teal-100"
                            >
                                Manage Workouts
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="w-full text-left px-4 py-2 hover:bg-teal-100"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}