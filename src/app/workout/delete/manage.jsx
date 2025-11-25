"use client";

import { useEffect, useState } from "react";

export default function ManageWorkouts() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWorkouts = async () => {
        try {
            const res = await fetch("/api/workout/users"); // backend route
            const data = await res.json();
            setWorkouts(Array.isArray(data) ? data : []); // ensure it's always an array
        } catch (err) {
            console.error(err);
            setWorkouts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`/api/workout?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                alert("Deleted successfully!");
                setWorkouts(workouts.filter(w => w._id !== id));
            } else {
                const data = await res.json();
                alert(data.error || "Failed to delete workout");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading workouts...</p>;

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-teal-600 mb-6">Manage Workouts</h1>
            {Array.isArray(workouts) && workouts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workouts.map(workout => (
                        <div key={workout._id} className="border rounded shadow p-4 flex flex-col">
                            <img
                                src={workout.imageUrl || "/default-workout.jpg"}
                                alt={workout.title}
                                className="w-full h-40 object-cover rounded mb-2"
                            />
                            <h2 className="text-xl font-semibold">{workout.title}</h2>
                            <p className="text-gray-700 text-sm mb-2">{workout.shortDescription}</p>
                            <p className="text-gray-600 text-sm mb-2">Duration: {workout.duration} min</p>
                            <div className="mt-auto flex gap-2">
                                <button
                                    onClick={() => handleDelete(workout._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No workouts found.</p>
            )}
        </div>
    );
}
