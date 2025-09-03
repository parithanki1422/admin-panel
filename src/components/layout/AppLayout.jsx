import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../layout/SideNav";
import TopBar from "../layout/TopBar";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

export default function AppLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-auto p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

