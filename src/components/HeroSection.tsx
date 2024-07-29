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
    <div className="bg-white bg-opacity-75 py-20 container mx-auto flex flex-col items-center text-center px-4 rounded-lg shadow-lg max-w-screen-xl">
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
          className="bg-orange-500 text-white py-3 px-6 rounded-full hover:bg-orange-700 transition-colors text-lg font-semibold flex items-center"
        >
          <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
          Get Started
        </Link>
        <Link
          to="/login"
          className="bg-blue-900 text-white py-3 px-6 rounded-full hover:bg-blue-800 transition-colors text-lg font-semibold flex items-center"
        >
          <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
          Log In
        </Link>
      </div>
    </div>
  </section>
);

export default HeroSection;
