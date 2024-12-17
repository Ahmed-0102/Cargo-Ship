import React, { useEffect, useRef } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { customerData } from "../../constants";
import "./Dashboard.css";

// Register required components with ChartJS
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

function Dashboard() {
  // Refs to hold chart instances
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  // Calculate total number of customers
  const totalCustomers = new Set(customerData.map((transaction) => transaction.name)).size;

  // Calculate total number of shipments
  const totalShipments = customerData.length;

  // Calculate total revenue generated and convert to millions
  const totalRevenue = customerData.reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalRevenueInMillions = (totalRevenue / 1_000_000).toFixed(2);

  // Calculate shipment types for pie chart
  const shipmentCounts = customerData.reduce(
    (counts, transaction) => {
      if (transaction.shipmentType === "Domestic") {
        counts.domestic += 1;
      } else if (transaction.shipmentType === "International") {
        counts.international += 1;
      }
      return counts;
    },
    { domestic: 0, international: 0 }
  );

  // Pie chart data
  const pieData = {
    labels: ["Domestic", "International"],
    datasets: [
      {
        data: [shipmentCounts.domestic, shipmentCounts.international],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  // Pie chart options
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            return `${tooltipItem.label}: ${value}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  // Calculate revenue per branch as an array of objects
  const branchRevenue = customerData.reduce((acc, transaction) => {
    let branch = acc.find((b) => b.branch === transaction.branch);
    if (!branch) {
      branch = { branch: transaction.branch, revenue: 0 };
      acc.push(branch);
    }
    branch.revenue += transaction.amount;
    return acc;
  }, []);

  const branches = branchRevenue.map((item) => item.branch);
  const revenues = branchRevenue.map((item) => item.revenue);

  // Define colors for each branch
  const colors = ["#42A5F5", "#66BB6A", "#FFA726", "#FF6384", "#8E24AA", "#B0BEC5", "#FFB74D"];

  // Bar chart data
  const barData = {
    labels: branches,
    datasets: [
      {
        label: 'Revenue by Branch',
        data: revenues,
        backgroundColor: colors.slice(0, branches.length),
      },
    ],
  };

  // Bar chart options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            return `Revenue: $${value.toLocaleString()}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 40,
      },
    },
  };

  // Cleanup function to remove charts
  useEffect(() => {
    return () => {
      if (pieChartRef.current && pieChartRef.current.chart) {
        pieChartRef.current.chart.destroy();
      }
      if (barChartRef.current && barChartRef.current.chart) {
        barChartRef.current.chart.destroy();
      }
    };
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-stats">
        <div className="stat-item">
          <h3>Total Customers</h3>
          <p>{totalCustomers}</p>
        </div>
        <div className="stat-item">
          <h3>Total Shipments</h3>
          <p>{totalShipments}</p>
        </div>
        <div className="stat-item">
          <h3>Total Revenue</h3>
          <p>${totalRevenueInMillions} M</p>
        </div>
      </div>
      <div className="charts">
        <div className="chart-container">
          <h3>Shipment Type Distribution</h3>
          <div style={{ position: 'relative', width: '300px', height: '300px' }}>
            <Pie data={pieData} options={pieOptions} ref={pieChartRef} />
          </div>
        </div>
        <div className="chart-container">
          <h3>Branch Wise Revenue</h3>
          <div style={{ position: 'relative', width: '500px', height: '300px' }}>
            <Bar data={barData} options={barOptions} ref={barChartRef} />
            {/* <div style={{ textAlign: 'center', marginTop: '10px' }}>
              Revenue by Branch
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
