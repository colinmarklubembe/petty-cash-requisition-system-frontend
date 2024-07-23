import { Link } from "react-router-dom";

const CallToAction = () => (
  <section className="py-20">
    <div className="container mx-auto text-center">
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
