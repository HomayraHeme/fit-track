"use client";

import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Hero() {
    const images = [
        "https://img.freepik.com/premium-vector/man-character-running-treadmill_773186-1187.jpg",
        "https://img.freepik.com/premium-vector/fitness-lifestyle-design_24877-46082.jpg",
        "https://img.freepik.com/free-vector/flat-fitness-trackers-concept_23-2148545029.jpg",
        "https://img.freepik.com/premium-vector/fitness-concept-fitness-training-running-shoes-outline-style-illustration-with-run-sport-icons-fitness-training-design-elements-vector-illustration_6280-924.jpg"
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000
    };

    return (
        <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-gray-50">

            {/* 🏋️ Left Text */}
            <div className="max-w-xl space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-teal-600 leading-tight">
                    Track Your Fitness <br /> Stay Motivated 💪
                </h1>

                <p className="text-gray-600 text-lg">
                    Plan, record, and monitor your daily workouts — all in one place.
                    Stay consistent and crush your fitness goals with <span className="font-semibold text-teal-500">FitTrack</span>.
                </p>

                <div className="flex space-x-4">
                    <Link
                        href="/workout"
                        className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 transition font-medium"
                    >
                        Explore Workouts
                    </Link>

                    <Link
                        href="/workout/add"
                        className="border border-teal-500 text-teal-600 px-6 py-3 rounded-md hover:bg-teal-100 transition font-medium"
                    >
                        Add Workout
                    </Link>
                </div>
            </div>

            {/* 🖼️ Right Carousel */}
            <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
                <Slider {...settings} className="w-full max-w-md">
                    {images.map((img, index) => (
                        <div key={index}>
                            <img
                                src={img}
                                alt={`slide-${index}`}
                                className="w-full object-contain rounded-lg"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}