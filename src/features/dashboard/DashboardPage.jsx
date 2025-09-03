import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Icons
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { Chip } from "@mui/material";

export default function DashboardPage() {
  const { t } = useTranslation();
  const stats = useSelector((state) => state.dashboard.stats);
  const salesData = useSelector((state) => state.dashboard.salesData);
  const products = useSelector((state) => state.dashboard.products);

  const iconMap = {
    totalUsers: (
      <div className="p-3 rounded-xl" style={{ backgroundColor: '#E0CFFB' }}>
        <PeopleIcon fontSize="large" style={{ color: '#6A1B9A' }} />
      </div>
    ),
    totalOrders: (
      <div className="p-3 rounded-xl" style={{ backgroundColor: '#FFF3CD' }}>
        <ShoppingCartIcon fontSize="large" style={{ color: '#FFB800' }} />
      </div>
    ),
    totalSales: (
      <div className="p-3 rounded-xl" style={{ backgroundColor: '#D0F2EB' }}>
        <AttachMoneyIcon fontSize="large" style={{ color: '#00B69B' }} />
      </div>
    ),
    totalPending: (
      <div className="p-3 rounded-xl" style={{ backgroundColor: '#F8D7DA' }}>
        <PendingActionsIcon fontSize="large" style={{ color: '#C82333' }} />
      </div>
    ),
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => {
          const isPositive = item.change >= 0;
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-gray-500 font-medium">{t(item.iconKey)}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-2xl font-bold">{item.value}</p>
                {iconMap[item.iconKey]}
              </div>
              <div className="flex items-center mt-3">
                {isPositive ? (
                  <span className="flex items-center font-medium" style={{ color: "#00B69B" }}>
                    <TrendingUpIcon /> {item.change}% {t("upFromYesterday")}
                  </span>
                ) : (
                  <span className="flex items-center font-medium" style={{ color: "#F93C65" }}>
                    <TrendingDownIcon /> {Math.abs(item.change)}%  {t("downFromYesterday")}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{t("salesChart")}</h3>
          <select className="border rounded px-2 py-1">
            <option>October</option>
          </select>
        </div>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{t("table")}</h3>
          <select className="border rounded px-2 py-1">
            <option>October</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Product Name</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Date - Time</th>
                <th className="p-3 text-left">Piece</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.location}</td>
                  <td className="p-3">{p.date}</td>
                  <td className="p-3">{p.piece}</td>
                  <td className="p-3">{p.amount}</td>
                  <td
                  >
                    <Chip
                      label={p.status}
                      sx={{
                        bgcolor: p.status === "Delivered" ? "#d1fae5" :
                          p.status === "Pending" ? "#fee2e2" :
                            "#fef3c7",
                        color: p.status === "Delivered" ? "#065f46" :
                          p.status === "Pending" ? "#b91c1c" :
                            "#78350f",
                        fontWeight: 500,
                        padding: "4px 8px",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
