import { Link } from "react-router-dom";
import logo from "../assets/logo-no-background.png";

const Header = () => (
  <header className="bg-white p-4 shadow-lg sticky top-0 z-50 transition-all duration-300 ease-in-out">
    <nav className="container mx-auto flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="CashFusion Logo" className="h-12 mr-3 animate-fade-in-left" />
      </div>
      <div className="flex items-center space-x-6">
        <Link
          to="/login"
          className="px-5 py-2 border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white rounded-full transition-all duration-200 text-lg font-semibold transform hover:scale-105"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-5 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-700 hover:to-yellow-700 rounded-full transition-all duration-200 text-lg font-semibold transform hover:scale-105 shadow-md"
        >
          Signup
        </Link>
      </div>
    </nav>
  </header>
);

export default Header;

