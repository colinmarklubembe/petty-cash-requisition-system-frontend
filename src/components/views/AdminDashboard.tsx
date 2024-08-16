import { Bar, Doughnut } from "react-chartjs-2";
import {
  FiDollarSign,
  FiTrendingUp,
  FiClipboard,
  FiUsers,
  FiFolder,
  FiFile,
} from "react-icons/fi";
import { StatCard, ChartCard } from "..";
import { AdminDashboardData } from "../../types/Dashboard";

const AdminDashboard = ({ data }: { data: AdminDashboardData | null }) => {
  if (!data) {
    return <p>Data is not available.</p>;
  }

  const {
    totalUsers,
    totalFunds,
    monthlyRequisitions,
    monthlyTransactions,
    companyFunds,
    spendingByFund,
    totalActiveFunds,
  } = data;

  const fundBalanceData = {
    labels: companyFunds.map((fund) => fund.name),
    datasets: [
      {
        data: companyFunds.map((fund) => fund.currentBalance),
        backgroundColor: ["#4F9D9D", "#FF7F50", "#FF6347", "#1E90FF"],
        borderColor: ["#4F9D9D", "#FF7F50", "#FF6347", "#1E90FF"],
        borderWidth: 2,
      },
    ],
  };

  const spendingByFundData = {
    labels: spendingByFund.map((fund) => fund.fund),
    datasets: [
      {
        label: "Spending by Fund",
        data: spendingByFund.map((fund) => fund.totalSpent),
        backgroundColor: "#FF6347",
        borderColor: "#FF6347",
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
        labels: {
          color: "#333",
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#333",
        bodyColor: "#333",
        borderColor: "#ddd",
        borderWidth: 1,
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <StatCard
          icon={FiUsers}
          label="Total Users"
          value={totalUsers}
          iconColor=""
        />
        <StatCard
          icon={FiFolder}
          label="Total Funds"
          value={totalFunds}
          iconColor=""
        />
        <StatCard
          icon={FiTrendingUp}
          label="Active Funds"
          value={totalActiveFunds}
          iconColor=""
        />
        <StatCard
          icon={FiClipboard}
          label="Monthly Requisitions"
          value={monthlyRequisitions}
          iconColor=""
        />
        <StatCard
          icon={FiFile}
          label="Monthly Transactions"
          value={monthlyTransactions}
          iconColor=""
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          icon={FiDollarSign}
          title="Fund Balance"
          chartType={Doughnut}
          data={fundBalanceData}
          options={chartOptions}
          iconColor="text-[#FE633D]"
        />
        <ChartCard
          icon={FiTrendingUp}
          title="Spending by Fund"
          chartType={Bar}
          data={spendingByFundData}
          options={chartOptions}
          iconColor="text-[#FE633D]"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
