// src/store/dashboardSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: [
    {
      id: 1,
      title: "Total Users",
      value: 120,
      change: 5,
      type: "increase",
      iconKey: "totalUsers"
    },
    {
      id: 2,
      title: "Total Orders",
      value: 80,
      change: -3,
      type: "decrease",
      iconKey: "totalOrders"
    },
    {
      id: 3,
      title: "Total Sales",
      value: 1500,
      change: 8,
      type: "increase",
      iconKey: "totalSales"
    },
    {
      id: 4,
      title: "Total Pending",
      value: 25,
      change: -2,
      type: "decrease",
      iconKey: "totalPending"
    },
  ],
  salesData: [
    { month: "Jan", sales: 400, salesK: 0.4, salesPercent: 10 },
    { month: "Feb", sales: 700, salesK: 0.7, salesPercent: 17.5 },
    { month: "Mar", sales: 200, salesK: 0.2, salesPercent: 5 },
    { month: "Apr", sales: 1000, salesK: 1, salesPercent: 25 },
    { month: "May", sales: 800, salesK: 0.8, salesPercent: 20 },
    { month: "Jun", sales: 600, salesK: 0.6, salesPercent: 15 },
    { month: "Jul", sales: 900, salesK: 0.9, salesPercent: 22.5 },
    { month: "Aug", sales: 1100, salesK: 1.1, salesPercent: 27.5 },
    { month: "Sep", sales: 750, salesK: 0.75, salesPercent: 18.75 },
    { month: "Oct", sales: 500, salesK: 0.5, salesPercent: 12.5 },
    { month: "Nov", sales: 650, salesK: 0.65, salesPercent: 16.25 },
    { month: "Dec", sales: 1200, salesK: 1.2, salesPercent: 30 },
    { month: "Jan-Next", sales: 950, salesK: 0.95, salesPercent: 23.75 },
    { month: "Feb-Next", sales: 1050, salesK: 1.05, salesPercent: 26.25 },
    { month: "Mar-Next", sales: 800, salesK: 0.8, salesPercent: 20 },
    { month: "Apr-Next", sales: 700, salesK: 0.7, salesPercent: 17.5 },
    { month: "May-Next", sales: 1150, salesK: 1.15, salesPercent: 28.75 },
    { month: "Jun-Next", sales: 1000, salesK: 1, salesPercent: 25 },
    { month: "Jul-Next", sales: 850, salesK: 0.85, salesPercent: 21.25 },
    { month: "Aug-Next", sales: 900, salesK: 0.9, salesPercent: 22.5 },
  ],
  products: [
    {
      id: 1,
      name: "Product A",
      location: "New York",
      date: "2025-09-01 10:00",
      place: "Warehouse 1",
      amount: 100,
      status: "Delivered",
    },
    {
      id: 2,
      name: "Product B",
      location: "London",
      date: "2025-09-02 12:30",
      place: "Warehouse 2",
      amount: 200,
      status: "Pending",
    },
    {
      id: 3,
      name: "Product C",
      location: "Paris",
      date: "2025-09-03 14:00",
      place: "Warehouse 1",
      amount: 150,
      status: "Shipped",
    },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
});

export default dashboardSlice.reducer;
