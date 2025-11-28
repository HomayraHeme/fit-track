import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-14 pb-6 mt-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 md:place-items-center">

                <div>

                    <div className="flex items-center gap-2">
                        <img className=" h-10 w-10" src="/fintrack-removebg-preview.png" alt="" />
                        <Link href="/" className="text-2xl font-bold text-teal-600">
                            FitTrack
                        </Link>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                        FitTrack is your personal fitness companion. Track workouts, monitor your progress,
                        and stay motivated with personalized plans designed for your body and goals.
                    </p>
                </div>



                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-teal-400 transition">Help Center</a></li>
                        <li><a href="#" className="hover:text-teal-400 transition">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:text-teal-400 transition">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-teal-400 transition">FAQs</a></li>
                    </ul>
                </div>


                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                    <p className="text-gray-400 mb-3">Stay connected for daily fitness tips and updates:</p>
                    <div className="flex space-x-4 text-gray-400 text-sm">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-teal-400 transition"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-teal-400 transition"
                        >
                            Instagram
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-teal-400 transition"
                        >
                            Twitter
                        </a>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-teal-400 transition"
                        >
                            YouTube
                        </a>
                    </div>
                </div>
            </div>


            <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-sm">
                <p>
                    © {new Date().getFullYear()} <span className="text-teal-400 font-semibold">FitTrack</span>.
                    All rights reserved. | Designed with ❤️ for fitness lovers.
                </p>
            </div>
        </footer>
    );
}
