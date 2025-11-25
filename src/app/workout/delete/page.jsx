"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import ManageWorkouts from "./manage";


export default function ProtectedManageWorkouts() {
    return (
        <ProtectedRoute>
            <ManageWorkouts />
        </ProtectedRoute>
    );
}
