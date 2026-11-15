
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import SpecialOffers from "../components/SpecialOffers";

function Home() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#292D28]">
      <Navbar />

      <main className="mt-10">
  <Hero />
</main>

      <Services />

      <SpecialOffers />

      <WhyChooseUs />

      <About />

      <Testimonials />
    </div>
  );
}

export default Home;
