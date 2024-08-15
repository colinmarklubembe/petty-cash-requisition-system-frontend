import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import icon from "../assets/icon.png";
import background from "../assets/image/herobackground1.jpg";

const HeroSection = () => (
  <section
    className="bg-cover bg-center py-20"
    style={{ backgroundImage: `url(${background})` }}
  >
    <div className="bg-white bg-opacity-80 py-20 container mx-auto flex flex-col items-center text-center px-6 rounded-lg shadow-xl max-w-screen-xl transform transition-transform hover:scale-105 duration-300 ease-in-out">
      <img
        src={icon}
        alt="CashFusion Hero Img"
        className="w-64 max-w-xs mx-auto animate-fade-in-up"
      />
      <h1 className="text-6xl font-extrabold mb-6 text-blue-900 leading-tight animate-fade-in-left">
        Welcome to CashFusion
      </h1>
      <p className="text-xl mb-6 text-blue-700 max-w-3xl animate-fade-in-right">
        Manage and streamline your petty cash requisitions effortlessly. With
        CashFusion, simplify your financial processes and keep everything
        organized with ease.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
        <Link
          to="/signup"
          className="bg-gradient-to-r from-orange-500 to-orange-700 text-white py-3 px-6 rounded-full hover:from-orange-700 hover:to-orange-900 transition-all duration-300 text-lg font-semibold flex items-center transform hover:scale-105 shadow-md"
        >
          <FontAwesomeIcon icon={faUserPlus} className="mr-3 text-xl" />
          Get Started
        </Link>
        <Link
          to="/login"
          className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-3 px-6 rounded-full hover:from-blue-800 hover:to-blue-900 transition-all duration-300 text-lg font-semibold flex items-center transform hover:scale-105 shadow-md"
        >
          <FontAwesomeIcon icon={faSignInAlt} className="mr-3 text-xl" />
          Log In
        </Link>
      </div>
    </div>
  </section>
);

export default HeroSection;
