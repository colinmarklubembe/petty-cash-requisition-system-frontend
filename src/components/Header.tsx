import { Link } from "react-router-dom";
import logo from "../assets/logo-no-background.png";

const Header = () => (
  <header className="bg-blue-100 p-4 text-blue-900">
    <nav className="container mx-auto flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="CashFusion Logo" className="h-10 mr-3" />
      </div>
      <div>
        <Link
          to="/login"
          className="mr-4 px-4 py-2 border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white rounded-lg transition-colors"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 bg-blue-900 text-white hover:bg-blue-800 rounded-lg transition-colors"
        >
          Signup
        </Link>
      </div>
    </nav>
  </header>
);

export default Header;
