import { useState, useEffect } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  PointElement,
} from "chart.js";
import styleFocalDashboard from "./focalDashboard.module.css";
import useGetRequest from "../../../../utils/Hooks/RequestHooks/useGetRequest";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  PointElement
);

export function FocalDashboard() {
  const { requests, getLoading, error, refetch } = useGetRequest();
  const [data, setData] = useState({
    totalRequest: 0,
    totalPendingRequest: 0,
    totalAcceptedRequest: 0,
    totalRejectedRequest: 0,
    totalCompletedRequest: 0,
    requestsPerMonth: Array.from({ length: 12 }, (_, i) => ({
      month: new Date(Date.UTC(2025, i, 1)).toLocaleString("default", {
        month: "long",
      }),
      requests: 0,
    })),
  });

  useEffect(() => {
    if (requests) {
      const totalRequest = requests.length;
      const totalPendingRequest = requests.filter(
        (req) => req.status === "pending"
      ).length;
      const totalAcceptedRequest = requests.filter(
        (req) => req.status === "accepted"
      ).length;
      const totalRejectedRequest = requests.filter(
        (req) => req.status === "rejected"
      ).length;
      const totalCompletedRequest = requests.filter(
        (req) => req.status === "done"
      ).length;

      let updatedRequestsPerMonth = data.requestsPerMonth.map((item) => ({
        ...item,
        requests: 0,
      }));

      requests.forEach((req) => {
        if (req.status === "done" && req.date_and_time) {
          req.date_and_time.forEach((dt) => {
            const date = new Date(dt.date);
            const month = date.getUTCMonth();
            updatedRequestsPerMonth[month].requests++;
          });
        }
      });

      setData({
        totalRequest,
        totalPendingRequest,
        totalAcceptedRequest,
        totalRejectedRequest,
        totalCompletedRequest,
        requestsPerMonth: updatedRequestsPerMonth,
      });
    }
  }, [requests]);

  const chartData = {
    labels: ["Completed Requests", "Pending Requests", "Rejected Requests"],
    datasets: [
      {
        data: [
          data.totalCompletedRequest,
          data.totalPendingRequest,
          data.totalRejectedRequest,
        ],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: data.requestsPerMonth.map((item) => item.month),
    datasets: [
      {
        label: "Completed Requests per Month",
        data: data.requestsPerMonth.map((item) => item.requests),
        fill: false,
        borderColor: "#42a5f5",
        backgroundColor: "#42a5f5",
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6" style={{ marginTop: "16px" }} >📊 Analytics Dashboard</h1>
      <div className={`grid ${styleFocalDashboard.grid}`}>
        <div className={`card ${styleFocalDashboard.card}`}>
          <h2 className="text-xl font-semibold">Request Summary</h2>
          <Doughnut data={chartData} options={{ responsive: true }} />
        </div>
        <div className={`card ${styleFocalDashboard.card}`}>
          <h2 className="text-xl font-semibold">Completed Requests Per Month</h2>
          <Line data={lineChartData} options={{ responsive: true }} />
        </div>
      </div>
      <div className={`grid ${styleFocalDashboard.cardGrid}`}>
        <div className={`card ${styleFocalDashboard.card}`}>
          <h2 className="text-xl font-semibold">Total Requests</h2>
          <p className="text-2xl font-bold">{data.totalRequest}</p>
        </div>
        <div className={`card ${styleFocalDashboard.card}`}>
          <h2 className="text-xl font-semibold">Total Pending Requests</h2>
          <p className="text-2xl font-bold">{data.totalPendingRequest}</p>
        </div>
        <div className={`card ${styleFocalDashboard.card}`}>
          <h2 className="text-xl font-semibold">Total Accepted Requests</h2>
          <p className="text-2xl font-bold">{data.totalAcceptedRequest}</p>
        </div>
        <div className={`card ${styleFocalDashboard.card}`}>
          <h2 className="text-xl font-semibold">Total Rejected Requests</h2>
          <p className="text-2xl font-bold">{data.totalRejectedRequest}</p>
        </div>
        <div className={`card ${styleFocalDashboard.card}`}>
          <h2 className="text-xl font-semibold">Total Completed Requests</h2>
          <p className="text-2xl font-bold">{data.totalCompletedRequest}</p>
        </div>
      </div>
    </div>
  );
}
