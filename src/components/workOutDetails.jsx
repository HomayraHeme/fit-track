// File: src/components/WorkoutDetails.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WorkoutDetails({ id }) {
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!id) {
            setError("Workout ID missing!");
            setLoading(false);
            return;
        }

        const fetchWorkout = async () => {
            try {
                const res = await fetch(`/api/workout/${id}`);
                const data = await res.json();

                if (!res.ok) throw new Error(data.error || "Failed to fetch workout");
                setWorkout(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkout();
    }, [id]);

    if (loading) return <p className="text-teal-600 text-center mt-20 text-xl">Loading workout...</p>;
    if (error) return (
        <p className="text-red-600 text-center mt-20 text-xl">{error}</p>
    );

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <button
                onClick={() => router.back()}
                className="text-teal-600 mb-6 hover:text-teal-800 transition"
            >
                ← Back
            </button>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                    src={workout.imageUrl || "/placeholder.png"}
                    alt={workout.title}
                    className="w-full h-80 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-teal-700 mb-4">{workout.title}</h1>
                    <p className="text-gray-700 mb-4">{workout.fullDescription || workout.shortDescription}</p>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm font-medium">
                        <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full">⏱ {workout.duration} min</span>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full capitalize">🔥 {workout.level}</span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full capitalize">🎯 {workout.category}</span>
                    </div>

                    {workout.steps && workout.steps.length > 0 && (
                        <>
                            <h2 className="text-2xl font-semibold mb-3 text-gray-800 border-b pb-2">Steps</h2>
                            <ol className="list-decimal list-inside space-y-3">
                                {workout.steps.map((step, idx) => (
                                    <li key={idx} className="text-gray-700">
                                        <strong className="text-teal-600">{step.title || `Step ${idx + 1}`}:</strong> {step.description}
                                    </li>
                                ))}
                            </ol>
                        </>
                    )}

                    <div className="mt-6 text-center">
                        <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition font-bold">
                            Start Workout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
