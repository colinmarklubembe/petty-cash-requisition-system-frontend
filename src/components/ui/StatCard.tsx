import React from "react";
import { IconType } from "react-icons";

interface StatCardProps {
  icon: IconType;
  label: string;
  value: number;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  iconColor,
}) => {
  return (
    <div className="bg-white p-6 h-36 rounded-lg shadow-md flex items-center justify-center relative">
      <div className="flex flex-col items-center">
        <h3 className="text-4xl font-bold text-[#202046]">{value}</h3>
        <h4 className="text-gray-500 text-lg mt-2">{label}</h4>
      </div>
      <div className="absolute top-2 right-2 bg-orange-500 text-white p-3 rounded-full">
        <Icon className={`text-xl ${iconColor}`} />
      </div>
    </div>
  );
};

export default StatCard;
