// File: lib/auth.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Get the current session (server-side)
export async function getCurrentUser() {
    const session = await getServerSession(authOptions);
    return session?.user || null;
}

// Protect API routes or server actions
export async function requireUser() {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("Unauthorized"); // Or return a 401 response in API
    }

    return session.user;
}