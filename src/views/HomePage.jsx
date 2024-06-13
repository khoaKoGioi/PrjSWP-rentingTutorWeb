import { MegaMenuWithHover } from "../components/MegaMenuWithHover.jsx";
import HeroSection from "../components/Hero.jsx";
import Pricing from "../components/Pricing.jsx";
import FeatureSection from "../components/FeatureSection.jsx";
import Testimonials from "../components/Testimonials.jsx";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <MegaMenuWithHover />
      <HeroSection />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <FeatureSection />
        <Pricing />
        <Testimonials />
      </div>

      <section className="container mx-auto text-center py-6 mb-12">
        <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">
          Call to Action
        </h2>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <h3 className="my-4 text-3xl leading-tight">
          Main Hero Message to sell yourself!
        </h3>
        <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
          Action!
        </button>
      </section>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Tutor Renting Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
