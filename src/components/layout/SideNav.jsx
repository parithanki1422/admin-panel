import React from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useTranslation } from "react-i18next";

export default function Sidebar({ onLogout }) {
  const { t } = useTranslation(); // initialize translation

  const links = [
    { name: t("dashboard"), path: "/dashboard", icon: <DashboardIcon /> },
    { name: t("projects"), path: "/dashboard/projects", icon: <WorkOutlineIcon /> },
    { name: t("estimates"), path: "/dashboard/estimates", icon: <ReceiptIcon /> },
  ];

  return (
    <aside className="w-64 bg-white min-h-screen p-4 flex flex-col justify-between border-r border-gray-200">
      <div>
        <h1 className="text-xl font-bold mb-8 text-center">
          LO<span style={{ color: "#4880FF" }}>GO</span>
        </h1>
        <nav className="flex flex-col space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/dashboard"}
              className={({ isActive }) =>
                `relative flex items-center p-2 rounded hover:bg-blue-400 hover:text-white transition-colors duration-200 ${
                  isActive ? "bg-blue-400 text-white" : "text-gray-700"
                }`
              }
            >
              {({ isActive }) =>
                isActive ? <span className="absolute left-0 top-0 h-full w-1 bg-blue-700 rounded-r"></span> : null
              }
              <span className="mr-2">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        className="flex items-center p-2 mt-4 hover:bg-blue-400 hover:text-white rounded text-gray-700 transition-colors duration-200"
        onClick={onLogout}
      >
        <ExitToAppIcon className="mr-2" /> {t("logout")}
      </button>
    </aside>
  );
}
