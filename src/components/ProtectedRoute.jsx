"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login"); // redirect to login if not logged in
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-screen text-teal-600">
                Checking authentication...
            </div>
        );
    }

    if (status === "authenticated") {
        return children; // show the page content if logged in
    }

    return null;
}
