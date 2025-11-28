export default function FeaturesSection() {
    const features = [
        {
            title: "Track Your Progress",
            desc: "Monitor your workouts and track your performance with real-time stats.",
            icon: "📈",
        },
        {
            title: "Personalized Workouts",
            desc: "Get customized workout plans based on your fitness level and goals.",
            icon: "💪",
        },
        {
            title: "Nutrition Tips",
            desc: "Access expert advice on meal plans and daily nutrition tracking.",
            icon: "🥗",
        },
        {
            title: "Community Support",
            desc: "Stay motivated by connecting with other fitness enthusiasts.",
            icon: "🤝",
        },
    ];

    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-teal-600 mb-8">
                    Why Choose FitTrack?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-teal-200 transition">
                            <div className="text-4xl mb-3">{f.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                            <p className="text-gray-600 text-sm">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
