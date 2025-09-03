// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      dashboard: "Dashboard",
      estimates: "Estimates",
      totalUsers: "Total Users",
      totalOrders: "Total Orders",
      totalSales: "Total Sales",
      totalPending: "Total Pending",
      salesChart: "Sales Chart",
      products: "Products",
      location: "Location",
      dateTime: "Date-Time",
      place: "Place",
      amount: "Amount",
      status: "Status",
      logout: "Logout",
      projects: "Projects",
      table: "Table",
      upFromYesterday: "Up From Yesterday",
      downFromYesterday: "Down From Yesterday",
    },
  },
  fr: {
    translation: {
      projects: "Projects",
      estimates: "Estimations",
      dashboard: "Tableau de bord",
      totalUsers: "Total des utilisateurs",
      totalOrders: "Total des commandes",
      totalSales: "Ventes totales",
      totalPending: "En attente",
      salesChart: "Graphique des ventes",
      products: "Produits",
      location: "Emplacement",
      dateTime: "Date-Heure",
      place: "Lieu",
      amount: "Montant",
      status: "Statut",
      logout: "Déconnexion",
      table: "Tableau",
      upFromYesterday: "Depuis hier",
      downFromYesterday: "Depuis hier",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
