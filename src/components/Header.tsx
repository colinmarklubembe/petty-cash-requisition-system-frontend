import { Link } from "react-router-dom";
import logo from "../assets/logo-no-background.png";

const Header = () => (
  <header className="bg-white p-4 shadow-md sticky top-0 z-50">
    <nav className="container mx-auto flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="CashFusion Logo" className="h-12 mr-3" />
      </div>
      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="px-4 py-2 border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white rounded-full transition-colors text-lg font-medium"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 bg-orange-500 text-white hover:bg-orange-700 rounded-full transition-colors text-lg font-medium"
        >
          Signup
        </Link>
      </div>
    </nav>
  </header>
);

export default Header;
