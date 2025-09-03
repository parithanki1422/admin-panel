import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from '@mui/icons-material/Menu';

export default function TopBar() {
  const { user } = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-white shadow flex justify-between items-center px-6 py-3">
      <MenuIcon />

      <div className="flex-1 mx-6">
        <input
          type="text"
          placeholder="Search"
          className="w-[50%] border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative">
          <NotificationsNoneIcon fontSize="large" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            6
          </span>
        </button>

        <select
          value={i18n.language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="border rounded p-1"
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>

        {/* User Info */}
        {user && (
          <div className="flex items-center space-x-2">
            <span className="font-medium">{user.username}</span>
            <img
              src={`https://ui-avatars.com/api/?name=${user.username}`}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        )}
      </div>
    </header>
  );
}
