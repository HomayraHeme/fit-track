export default function ContactPage() {
    return (
        <section className="bg-white py-20 min-h-screen">
            <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
                <h2 className="text-4xl font-bold text-teal-600 mb-4">Contact Us</h2>
                <p className="text-gray-700 text-lg mb-6">
                    Have questions or need support? Reach out to the FitTrack team. We're here to help you achieve your fitness goals!
                </p>

                <form className="max-w-xl mx-auto space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Name</label>
                        <input type="text" placeholder="Your Name" className="w-full border px-3 py-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input type="email" placeholder="Your Email" className="w-full border px-3 py-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Message</label>
                        <textarea placeholder="Your Message" className="w-full border px-3 py-2 rounded h-32" />
                    </div>
                    <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700">
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}
