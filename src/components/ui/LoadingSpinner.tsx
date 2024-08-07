import React from "react";
import { RingLoader } from "react-spinners";

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center flex-grow">
    <RingLoader color="#FE633D" size={60} />
  </div>
);

export default LoadingSpinner;
