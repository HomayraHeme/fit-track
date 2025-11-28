import { connectToDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function WorkoutPage({ params }) {
    const resolvedParams = await params;
    const workoutId = resolvedParams.id;

    if (!workoutId) {
        return <p>Workout ID missing!</p>;
    }

    let workout;
    try {
        const db = await connectToDB();
        workout = await db.collection("workout").findOne({ _id: new ObjectId(workoutId) });
    } catch (err) {
        console.error(err);
        return <p>Failed to fetch workout details!</p>;
    }

    if (!workout) return <p>Workout not found!</p>;

    return (
        <div className="w-full">

            <div className="relative w-full h-[400px] md:h-[500px]">
                <img
                    src={workout.imageUrl || '/default-workout.jpg'}
                    alt={workout.title}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50"></div>

                <h1 className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-bold text-teal-400 drop-shadow-lg text-center px-4">
                    {workout.title}
                </h1>
            </div>


            <div className="max-w-4xl mx-auto px-6 py-10">
                <p className="text-lg text-gray-700 mb-4">{workout.shortDescription}</p>

                <div className="flex flex-wrap gap-6 mb-6 text-gray-800 font-medium">
                    <span>Duration: {workout.duration} min</span>
                    <span>Level: {workout.level}</span>
                    <span>Category: {workout.category}</span>
                </div>

                <h2 className="text-2xl font-semibold mb-4 text-teal-600">Workout Details</h2>
                <p className="text-gray-700 leading-relaxed">{workout.fullDescription}</p>
            </div>
        </div>
    );
}
