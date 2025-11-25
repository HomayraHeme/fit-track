import { connectToDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
    const { id } = params;

    if (!id || !ObjectId.isValid(id)) {
        return new Response(JSON.stringify({ error: "Invalid workout ID" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const db = await connectToDB();
        const workout = await db.collection("workout").findOne({ _id: new ObjectId(id) });

        if (!workout) {
            return new Response(JSON.stringify({ error: "Workout not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const formatted = {
            _id: workout._id.toString(),
            title: workout.title,
            shortDescription: workout.shortDescription,
            fullDescription: workout.fullDescription,
            duration: workout.duration,
            level: workout.level,
            category: workout.category,
            imageUrl: workout.imageUrl,
            steps: workout.steps || [],
        };

        return new Response(JSON.stringify(formatted), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error(`❌ Single Workout API Error for ID ${id}:`, err);
        return new Response(JSON.stringify({ error: "Failed to fetch workout details" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
