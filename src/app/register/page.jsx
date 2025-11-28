"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Registration failed");


            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.ok) router.push("/");
            else alert("Registered successfully! Please login.");

        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-teal-600">
                    Register for FitTrack
                </h2>

                <button
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="flex items-center justify-center border py-2 rounded-md hover:bg-gray-100 w-full mb-6"
                >
                    <img
                        src="https://img.icons8.com/color/16/google-logo.png"
                        alt="Google"
                        className="mr-2"
                    />
                    Sign up with Google
                </button>

                <div className="border-t border-gray-200 mb-6"></div>

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                        type="password"
                        placeholder="Password (min 6 chars)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                        type="submit"
                        className="bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600"
                    >
                        Register
                    </button>
                </form>

                <p className="text-sm text-gray-500 mt-6 text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="text-teal-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}