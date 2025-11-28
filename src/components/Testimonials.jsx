export default function Testimonials() {
    const testimonials = [
        {
            name: "Sarah Khan",
            text: "FitTrack helped me stay consistent and finally see real results!",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            name: "Arif Hossain",
            text: "I love how easy it is to track my workouts and progress every day.",
            image: "https://randomuser.me/api/portraits/men/44.jpg",
        },
        {
            name: "Mina Rahman",
            text: "A great platform for anyone serious about fitness!",
            image: "https://randomuser.me/api/portraits/women/46.jpg",
        },
    ];

    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-teal-600 mb-10">What Users Say</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
                            <img
                                src={t.image}
                                alt={t.name}
                                className="w-16 h-16 mx-auto rounded-full mb-4 object-cover"
                            />
                            <p className="italic text-gray-700 mb-3">“{t.text}”</p>
                            <h4 className="font-semibold text-teal-600">{t.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
