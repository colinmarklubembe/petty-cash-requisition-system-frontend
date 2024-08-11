import { Bar } from "react-chartjs-2";
import { FiTrendingUp, FiClipboard, FiFile } from "react-icons/fi";
import { StatCard, ChartCard } from "../components";
import { UserDashboardData } from "../types/Dashboard";

const UserDashboard = ({ data }: { data: UserDashboardData | null }) => {
  if (!data) {
    return <p>Data is not available.</p>;
  }

  const {
    userMonthlyTransactions = 0,
    userMonthlyRequisitions = 0,
    userSpendingByFund = [],
    totalActiveFunds = 0,
  } = data;

  const userSpendingByFundData = {
    labels: userSpendingByFund.map((fund) => fund.fund),
    datasets: [
      {
        label: "Spending by Fund",
        data: userSpendingByFund.map((fund) => fund.totalSpent),
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    animation: {
      duration: 2000,
      easing: "easeInOutQuad" as const,
      animateRotate: true,
      animateScale: true,
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
        <StatCard
          icon={FiTrendingUp}
          label="Active Funds"
          value={totalActiveFunds}
          iconColor="text-[#FFFFFF]"
        />
        <StatCard
          icon={FiClipboard}
          label="Monthly Requisitions"
          value={userMonthlyRequisitions}
          iconColor="text-[#FFFFFF]"
        />
        <StatCard
          icon={FiFile}
          label="Monthly Transactions"
          value={userMonthlyTransactions}
          iconColor="text-[#FFFFFF]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <ChartCard
          icon={FiTrendingUp}
          title="User Spending by Fund"
          chartType={Bar}
          data={userSpendingByFundData}
          options={chartOptions}
          iconColor="text-[#FE633D]"
        />
      </div>
    </>
  );
};

export default UserDashboard;
