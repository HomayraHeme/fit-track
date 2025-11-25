import CallToAction from "@/components/CallToAction";
import FeaturesSection from "@/components/FeaturesSection";
import Hero from "@/components/hero";
import PopularWorkouts from "@/components/PopularWorkouts";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <FeaturesSection />
      <PopularWorkouts />
      <Testimonials />
      <CallToAction />

    </>
  );
}
