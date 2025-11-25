"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react"; // <-- import session

export default function AddWorkoutPage() {
    const router = useRouter();
    const { data: session } = useSession(); // get logged-in user
    const [form, setForm] = useState({
        title: "",
        shortDescription: "",
        fullDescription: "",
        duration: "",
        level: "",
        category: "",
        imageUrl: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!session) return toast.error("You must be logged in to add a workout");

        setLoading(true);

        try {
            const res = await fetch("/api/workout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, userEmail: session.user.email }), // attach user email
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Failed to add workout");
            }

            toast.success("Workout added successfully!");

            setForm({
                title: "",
                shortDescription: "",
                fullDescription: "",
                duration: "",
                level: "",
                category: "",
                imageUrl: "",
            });

            router.push("/workout/manage"); // redirect to manage workouts
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-6 text-teal-600">Add Workout</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                {[
                    { label: "Title", name: "title" },
                    { label: "Short Description", name: "shortDescription" },
                    { label: "Full Description", name: "fullDescription", textarea: true },
                    { label: "Duration (min)", name: "duration" },
                    { label: "Level", name: "level" },
                    { label: "Category", name: "category" },
                    { label: "Image URL", name: "imageUrl" },
                ].map((field) => (
                    <div key={field.name}>
                        <label className="block font-medium mb-1">{field.label}</label>
                        {field.textarea ? (
                            <textarea
                                name={field.name}
                                value={form[field.name]}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                                required
                            />
                        ) : (
                            <input
                                type={field.name === "duration" ? "number" : "text"}
                                name={field.name}
                                value={form[field.name]}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                                required
                            />
                        )}
                    </div>
                ))}
                <button
                    type="submit"
                    className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Workout"}
                </button>
            </form>
        </div>
    );
}
