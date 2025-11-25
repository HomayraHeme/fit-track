// src/components/PopularWorkouts.jsx
export default function PopularWorkouts() {
    const workouts = [
        {
            title: "Full Body Burn",
            desc: "A 30-minute workout targeting all muscle groups.",
            image: "https://img.freepik.com/premium-photo/young-man-jumping-clouds_311470-111.jpg",
        },
        {
            title: "Cardio Blast",
            desc: "Boost endurance and burn calories fast.",
            image: "https://img.freepik.com/free-photo/side-view-fit-woman-running-outdoors_23-2147600425.jpg",
        },
        {
            title: "Core Strength",
            desc: "Strengthen your abs and back muscles.",
            image: "https://img.freepik.com/free-photo/smiling-yogi-doing-side-crane-yoga-pose-gym_1262-16427.jpg?uid=R207992781&ga=GA1.1.1552930522.1751464339&semt=ais_hybrid&w=740&q=80",
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-teal-600 mb-8 text-center">
                    Popular Workouts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {workouts.map((w, i) => (
                        <div key={i} className="shadow-lg rounded-2xl overflow-hidden hover:scale-[1.02] transition hover:shadow-teal-200">
                            <img src={w.image} alt={w.title} className="h-48 w-full object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-1">{w.title}</h3>
                                <p className="text-gray-600 text-sm">{w.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
