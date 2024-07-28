import { Link } from "react-router-dom";
import icon1 from "../assets/logo-no-background.png";
import icon2 from "../assets/logo-no-background.png";
import icon3 from "../assets/logo-no-background.png";

const FeaturesSection = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold mb-10 text-blue-900">Features</h2>
      <p className="text-lg mb-12 text-blue-700 max-w-2xl mx-auto">
        Discover the powerful features of CashFusion designed to simplify your
        petty cash management and enhance your financial oversight.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-full md:w-1/3 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="mb-4 flex justify-center">
              <img
                src={icon1}
                alt="Easy Management Icon"
                className="w-16 h-16 text-blue-500"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-blue-900">
              Easy Management
            </h3>
            <p className="text-blue-700">
              Manage your petty cash requisitions with ease and efficiency.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/3 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="mb-4 flex justify-center">
              <img
                src={icon2}
                alt="Real-Time Tracking Icon"
                className="w-16 h-16 text-blue-500"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-blue-900">
              Real-Time Tracking
            </h3>
            <p className="text-blue-700">
              Track your requisitions in real-time and stay updated.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/3 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="mb-4 flex justify-center">
              <img
                src={icon3}
                alt="Secure and Reliable Icon"
                className="w-16 h-16 text-blue-500"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-blue-900">
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
          className="bg-blue-900 text-white py-3 px-6 rounded-full hover:bg-blue-800 transition-colors text-lg font-semibold"
        >
          Learn More
        </Link>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
