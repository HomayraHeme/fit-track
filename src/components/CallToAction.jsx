
import Link from "next/link";

export default function CallToAction() {
    return (
        <section className="bg-teal-600 py-16 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Start Your Fitness Journey Today!</h2>
            <p className="mb-6 text-lg">Join FitTrack and take control of your health and workouts.</p>
            <Link
                href="/register"
                className="bg-white text-teal-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
            >
                Get Started
            </Link>
        </section>
    );
}
