import { Link } from "react-router-dom";
import icon from "../assets/icon.png";

const HeroSection = () => (
  <section className="bg-white py-20">
    <div className="container mx-auto flex flex-col items-center text-center px-4">
      <img
        src={icon}
        alt="CashFusion Hero Img"
        className="w-64 max-w-xs mx-auto"
      />
      <h1 className="text-6xl font-bold mb-8 text-blue-900 leading-tight">
        Welcome to CashFusion
      </h1>
      <p className="text-xl mb-8 text-blue-700 max-w-2xl">
        Manage and streamline your petty cash requisitions effortlessly. With
        CashFusion, simplify your financial processes and keep everything
        organized with ease.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <Link
          to="/signup"
          className="bg-orange-500 text-white py-3 px-6 rounded-full hover:bg-orange-700 transition-colors text-lg font-semibold"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="bg-blue-900 text-white py-3 px-6 rounded-full hover:bg-blue-800 transition-colors text-lg font-semibold"
        >
          Log In
        </Link>
      </div>
    </div>
  </section>
);

export default HeroSection;
