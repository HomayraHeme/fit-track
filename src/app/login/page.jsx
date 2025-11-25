"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", { redirect: false, email, password });
        if (result?.ok) router.push("/");
        else alert(result?.error || "Login failed!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-teal-600">Login to FitTrack</h2>

                <div className="mb-6">
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="flex items-center justify-center border py-2 rounded-md hover:bg-gray-100 w-full"
                    >
                        <img src="https://img.icons8.com/color/16/google-logo.png" alt="Google" className="mr-2" />
                        Sign in with Google
                    </button>
                </div>

                <div className="border-t border-gray-200 mb-6"></div>

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-teal-500" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-teal-500" />
                    <button type="submit" className="bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600">Login</button>
                </form>

                <p className="text-sm text-gray-500 mt-6 text-center">
                    Don’t have an account? <Link href="/register" className="text-teal-500 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
}