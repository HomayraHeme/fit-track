"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function WorkoutsPage() {
    const [workouts, setWorkouts] = useState([]);
    const [filteredWorkouts, setFilteredWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchWorkouts() {
            try {
                const res = await fetch("/api/workout");
                const data = await res.json();

                console.log("Fetched Workouts Data:", data);

                if (data.length > 0) {
                    console.log("First Workout ID:", data[0]._id);
                }

                if (!res.ok) throw new Error(data.error || "Failed to fetch workouts");
                setWorkouts(data);
                setFilteredWorkouts(data);



            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchWorkouts();
    }, []);



    useEffect(() => {
        if (search.trim() === "") {
            setFilteredWorkouts(workouts);
        } else {
            const filtered = workouts.filter((w) =>
                w.title.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredWorkouts(filtered);
        }
    }, [search, workouts]);

    if (loading) return <p className="text-center mt-20 text-teal-600 text-xl">Loading workouts...</p>;
    if (error) return <p className="text-center mt-20 text-red-600 text-xl">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold text-teal-600 mb-6 text-center">All Workouts</h1>

            <div className="flex justify-center mb-8 w-full">
                <input
                    type="text"
                    placeholder="Search workouts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-4 py-2 w-full max-w-md rounded shadow focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkouts.length > 0 ? (
                    filteredWorkouts.map((workout) => (
                        <div key={workout._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-[1.02] transition hover:shadow-teal-200
            
        ">
                            <img
                                src={workout.imageUrl || "/placeholder.png"}
                                alt={workout.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-bold text-teal-600 mb-2">{workout.title}</h2>
                                <p className="text-gray-700 mb-2">{workout.shortDescription}</p>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>⏱ {workout.duration} min</span>
                                    <span>🔥 {workout.level}</span>
                                </div>

                                <Link
                                    href={`/workout/${workout._id}`}
                                    className="mt-4 inline-block bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">No workouts found.</p>
                )}
            </div>
        </div>
    );
}
