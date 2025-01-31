import { useState } from "react";
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, Title, PointElement } from 'chart.js';
import styleFocalDashboard from './focalDashboard.module.css'; // Assuming this is for custom styles

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, Title, PointElement);

export function FocalDashboard() {
  const [data, setData] = useState({
    totalRequest: 150,
    totalPendingRequest: 30,
    totalAcceptedRequest: 100,
    totalRejectedRequest: 10,
    totalCompletedRequest: 120,
    totalActivitiesPerMonth: 15,
    requestsPerMonth: [
      { month: 'January', requests: 20 },
      { month: 'February', requests: 18 },
      { month: 'March', requests: 22 },
      { month: 'April', requests: 25 },
      { month: 'May', requests: 30 },
      { month: 'June', requests: 28 },
      { month: 'July', requests: 35 },
      { month: 'August', requests: 40 },
      { month: 'September', requests: 38 },
      { month: 'October', requests: 45 },
      { month: 'November', requests: 50 },
      { month: 'December', requests: 55 },
    ],
  });

  // Doughnut chart data for summary
  const chartData = {
    labels: ['Completed Requests', 'Pending Requests', 'Rejected Requests'],
    datasets: [
      {
        data: [
          data.totalCompletedRequest,
          data.totalPendingRequest,
          data.totalRejectedRequest
        ],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
        borderWidth: 1,
      },
    ],
  };

  // Line chart data for requests per month
  const lineChartData = {
    labels: data.requestsPerMonth.map(item => item.month), // months
    datasets: [
      {
        label: 'Requests per Month',
        data: data.requestsPerMonth.map(item => item.requests), // number of requests
        fill: false,
        borderColor: '#42a5f5',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Analytics Dashboard</h1>

      <div className={`grid ${styleFocalDashboard.grid}`}>
        {/* Request Summary Chart */}
        <div className={`card ${styleFocalDashboard.card} w-full h-full`}>
          <h2 className="text-xl font-semibold">Request Summary</h2>
          <Doughnut data={chartData} options={{ responsive: true }} />
        </div>

        {/* Line Chart Card for Requests Per Month */}
        <div className={`card ${styleFocalDashboard.card} w-full h-full`}>
          <h2 className="text-xl font-semibold">Requests Per Month</h2>
          <Line data={lineChartData} options={{ responsive: true }} />
        </div>

        {/* Total Requests Card */}
        <div className={`card ${styleFocalDashboard.card} w-full h-full`}>
          <h2 className="text-xl font-semibold">Total Requests</h2>
          <p className="text-2xl font-bold">{data.totalRequest}</p>
        </div>

        {/* Total Pending Requests Card */}
        <div className={`card ${styleFocalDashboard.card} w-full h-full`}>
          <h2 className="text-xl font-semibold">Total Pending Requests</h2>
          <p className="text-2xl font-bold">{data.totalPendingRequest}</p>
        </div>

        {/* Total Accepted Requests Card */}
        <div className={`card ${styleFocalDashboard.card} w-full h-full`}>
          <h2 className="text-xl font-semibold">Total Accepted Requests</h2>
          <p className="text-2xl font-bold">{data.totalAcceptedRequest}</p>
        </div>

        {/* Total Rejected Requests Card */}
        <div className={`card ${styleFocalDashboard.card} w-full h-full`}>
          <h2 className="text-xl font-semibold">Total Rejected Requests</h2>
          <p className="text-2xl font-bold">{data.totalRejectedRequest}</p>
        </div>

        {/* Total Completed Requests Card */}
        <div className={`card ${styleFocalDashboard.card} w-full h-full`}>
          <h2 className="text-xl font-semibold">Total Completed Requests</h2>
          <p className="text-2xl font-bold">{data.totalCompletedRequest}</p>
        </div>

        {/* Total Activities Per Month Card */}
        <div className={`card ${styleFocalDashboard.card} w-full h-full`}>
          <h2 className="text-xl font-semibold">Total Activities Per Month</h2>
          <p className="text-2xl font-bold">{data.totalActivitiesPerMonth}</p>
        </div>
      </div>
    </div>
  );
}
