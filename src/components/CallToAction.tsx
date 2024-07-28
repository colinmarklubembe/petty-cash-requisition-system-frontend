import { Link } from "react-router-dom";

const CallToAction = () => (
  <section className="relative py-20 bg-blue-900">
    <div className="absolute inset-0 bg-cover bg-center" style={{ zIndex: -1 }}>
      <svg
        viewBox="0 0 1440 320"
        className="absolute bottom-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,224L48,202.7C96,181,192,139,288,144C384,149,480,203,576,213.3C672,224,768,192,864,165.3C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
    <div className="bg-white bg-opacity-75 py-20 container mx-auto text-center px-4 rounded-lg shadow-lg relative z-10">
      <h2 className="text-4xl font-bold mb-10 text-blue-900">
        Ready to Get Started?
      </h2>
      <Link
        to="/signup"
        className="bg-orange-500 text-white py-3 px-6 rounded-full hover:bg-orange-700 transition-colors text-lg font-semibold"
      >
        Sign Up Now
      </Link>
    </div>
  </section>
);

export default CallToAction;
