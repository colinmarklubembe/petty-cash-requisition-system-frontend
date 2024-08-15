import { Link } from "react-router-dom";
import icon1 from "../assets/logo-no-background.png";
import icon2 from "../assets/logo-no-background.png";
import icon3 from "../assets/logo-no-background.png";
import AppleImage from "../assets/image/Apple.webp"; 
import { FaArrowRight } from "react-icons/fa";

const FeaturesSection = () => (
  <section className="py-20 bg-gradient-to-r from-blue-100 to-blue-50">
    {/* New Section */}
    <div className="container mx-auto py-20 flex flex-col md:flex-row items-center rounded-lg p-8 mb-16">
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <img
          src={AppleImage}
          alt="Apple Feature"
          className="w-full h-auto rounded-lg  transform transition-transform hover:scale-105"
        />
      </div>
      <div className="w-full md:w-1/2 md:pl-8">
        <h3 className="text-3xl font-extrabold mb-6 text-blue-900 animate-fade-in-right">
          Innovative Solutions
        </h3>
        <p className="text-lg text-blue-700 mb-6 animate-fade-in-left">
          Our latest features bring you innovative solutions for better management. 
          Experience a streamlined process with enhanced usability and modern technology.
        </p>
        <Link
          to="/solutions"
          className="bg-blue-900 text-white py-3 px-6 rounded-full hover:bg-blue-800 transition-colors text-lg font-semibold inline-flex items-center gap-2"
        >
          Discover More <FaArrowRight />
        </Link>
      </div>
    </div>

    {/* Features Section */}
    <div className="container mx-auto text-center">
      <h2 className="text-5xl font-extrabold mb-10 text-blue-900 animate-fade-in-down">
        Features
      </h2>
      <p className="text-xl mb-12 text-blue-700 max-w-3xl mx-auto animate-fade-in-up">
        Discover the powerful features of CashFusion designed to simplify your
        petty cash management and enhance your financial oversight.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-full md:w-1/3 p-4 transform transition-transform hover:scale-105">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow animate-fade-in">
            <div className="mb-6 flex justify-center">
              <img
                src={icon1}
                alt="Easy Management Icon"
                className="w-20 h-20"
              />
            </div>
            <h3 className="text-2xl font-extrabold mb-4 text-blue-900">
              Easy Management
            </h3>
            <p className="text-blue-700">
              Manage your petty cash requisitions with ease and efficiency.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/3 p-4 transform transition-transform hover:scale-105">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow animate-fade-in">
            <div className="mb-6 flex justify-center">
              <img
                src={icon2}
                alt="Real-Time Tracking Icon"
                className="w-20 h-20"
              />
            </div>
            <h3 className="text-2xl font-extrabold mb-4 text-blue-900">
              Real-Time Tracking
            </h3>
            <p className="text-blue-700">
              Track your requisitions in real-time and stay updated.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/3 p-4 transform transition-transform hover:scale-105">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow animate-fade-in">
            <div className="mb-6 flex justify-center">
              <img
                src={icon3}
                alt="Secure and Reliable Icon"
                className="w-20 h-20"
              />
            </div>
            <h3 className="text-2xl font-extrabold mb-4 text-blue-900">
              Secure and Reliable
            </h3>
            <p className="text-blue-700">
              Experience secure and reliable management of your cash flow.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Link
          to="/features"
          className="bg-blue-900 text-white py-3 px-8 rounded-full hover:bg-blue-800 transition-colors text-lg font-semibold inline-flex items-center gap-2 animate-bounce"
        >
          Learn More <FaArrowRight />
        </Link>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
