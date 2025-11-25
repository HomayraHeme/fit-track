"use client";


import ProtectedRoute from "@/components/ProtectedRoute";
import AddWorkoutPage from "./addWorkout";


export default function ProtectedAddWorkout() {
    return (
        <ProtectedRoute>
            <AddWorkoutPage></AddWorkoutPage>
        </ProtectedRoute>
    );
}
