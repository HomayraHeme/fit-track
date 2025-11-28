import { connectToDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function GET() {
    try {
        const db = await connectToDB();
        const workouts = await db.collection("workout").find({}).toArray();

        const formatted = workouts.map(w => ({
            ...w,
            _id: w._id.toString(),
        }));

        return new Response(JSON.stringify(formatted), { status: 200 });
    } catch (err) {
        console.error("Error fetching workouts:", err);
        return new Response(JSON.stringify({ error: "Failed to fetch workouts" }), { status: 500 });
    }
}


export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session)
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

        const db = await connectToDB();
        const workoutData = await req.json();

        if (!workoutData.title || !workoutData.shortDescription) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        }

        workoutData.userEmail = session.user.email;

        const result = await db.collection("workout").insertOne(workoutData);

        return new Response(
            JSON.stringify({
                message: "Workout added successfully",
                id: result.insertedId.toString(),
            }),
            { status: 201 }
        );
    } catch (err) {
        console.error("Error adding workout:", err);
        return new Response(JSON.stringify({ error: "Failed to add workout" }), { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session)
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id)
            return new Response(JSON.stringify({ error: "Workout ID missing" }), { status: 400 });

        const db = await connectToDB();

        const result = await db.collection("workout").deleteOne({
            _id: new ObjectId(id),
            userEmail: session.user.email,
        });

        if (result.deletedCount === 0) {
            return new Response(
                JSON.stringify({ error: "Workout not found or unauthorized" }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ message: "Workout deleted successfully" }),
            { status: 200 }
        );
    } catch (err) {
        console.error("Error deleting workout:", err);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
