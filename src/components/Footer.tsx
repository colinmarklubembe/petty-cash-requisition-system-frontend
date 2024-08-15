import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => (
  <footer className="bg-gradient-to-r from-blue-900 to-blue-700 p-8 text-white text-center">
    <div className="container mx-auto">
      <div className="flex flex-col items-center space-y-4 mb-8">
        <h2 className="text-3xl font-bold">Connect With Us</h2>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
            <FontAwesomeIcon icon={faFacebookF} className="w-8 h-8" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
            <FontAwesomeIcon icon={faTwitter} className="w-8 h-8" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
            <FontAwesomeIcon icon={faLinkedinIn} className="w-8 h-8" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
            <FontAwesomeIcon icon={faInstagram} className="w-8 h-8" />
          </a>
        </div>
        <div className="text-lg">
          &copy; 2024 CashFusion. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
