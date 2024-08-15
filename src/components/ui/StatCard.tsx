import React from "react";
import { IconType } from "react-icons";

interface StatCardProps {
  icon: IconType;
  label: string;
  value: number;
  trend?: number;
  iconColor: string; 
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  trend,
  iconColor,
}) => {
  return (
    <div className="bg-gradient-to-r from-white via-gray-100 to-stone-400 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-4 rounded-full ${iconColor} bg-orange-500 shadow-md`}>
          <Icon className="text-3xl text-white" />
        </div>
        {trend !== undefined && (
          <div
            className={`text-sm font-semibold ${trend >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}
          >
            {trend > 0 ? (
              <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7M5 19h14" />
              </svg>
            ) : (
              <svg className="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7M19 5H5m14 14H5" />
              </svg>
            )}
            {trend > 0 && '+'}{trend}%
          </div>
        )}
      </div>
      <div>
        <h3 className="text-4xl font-extrabold text-gray-800 mb-1">{value.toLocaleString()}</h3>
        <p className="text-sm text-gray-600 uppercase tracking-wide">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
