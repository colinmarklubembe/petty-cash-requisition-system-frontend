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
    <div className="bg-white p-5 rounded-lg shadow-md flex items-center">
      <Icon className={`text-2xl mr-2 ${iconColor}`} />
      <div>
        <h4 className="text-gray-500 text-sm">{label}</h4>
        <h3 className="text-lg font-semibold text-[#202046]">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
