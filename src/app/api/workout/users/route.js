import { connectToDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const db = await connectToDB();
        const workouts = await db
            .collection("workout")
            .find({ userEmail: session.user.email })
            .toArray();

        return new Response(JSON.stringify(workouts), { status: 200 });
    } catch (err) {
        console.error("Error fetching user workouts:", err);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
