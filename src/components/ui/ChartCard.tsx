import React from "react";
import { IconType } from "react-icons";
import { ChartData, ChartOptions } from "chart.js";

interface ChartCardProps {
  icon: IconType;
  title: string;
  chartType: React.ElementType;
  data: ChartData;
  options: ChartOptions;
  iconColor: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  icon: Icon,
  title,
  chartType: Chart,
  data,
  options,
  iconColor,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold mb-4 text-[#202046] flex items-center">
        <Icon className={`mr-2 ${iconColor}`} /> {title}
      </h3>
      <Chart data={data} options={options} />
    </div>
  );
};

export default ChartCard;
