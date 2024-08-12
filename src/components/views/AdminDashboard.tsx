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
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
        borderColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  const spendingByFundData = {
    labels: spendingByFund.map((fund) => fund.fund),
    datasets: [
      {
        label: "Spending by Fund",
        data: spendingByFund.map((fund) => fund.totalSpent),
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
          icon={FiUsers}
          label="Total Users"
          value={totalUsers}
          iconColor="text-[#FFFFFF]"
        />
        <StatCard
          icon={FiFolder}
          label="Total Funds"
          value={totalFunds}
          iconColor="text-[#FFFFFF]"
        />
        <StatCard
          icon={FiTrendingUp}
          label="Active Funds"
          value={totalActiveFunds}
          iconColor="text-[#FFFFFF]"
        />
        <StatCard
          icon={FiClipboard}
          label="Monthly Requisitions"
          value={monthlyRequisitions}
          iconColor="text-[#FFFFFF]"
        />
        <StatCard
          icon={FiFile}
          label="Monthly Transactions"
          value={monthlyTransactions}
          iconColor="text-[#FFFFFF]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
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
    </>
  );
};

export default AdminDashboard;
