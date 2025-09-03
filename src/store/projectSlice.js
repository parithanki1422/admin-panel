// src/features/projects/projectSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [
    { id: 1, customerName: "Olivia Martin", refNumber: "89PQR56789T1U2V3", projectName: "Sarah Williams", projectNumber: "PQRST9012R", projectLocation: "Telangana", address: "Mumbai, Maharashtra", dueDate: "2025-09-15", contact: "9876543210", status: "Completed" },
    { id: 2, customerName: "Michael Jones", refNumber: "67KLMN2345PQ67R8", projectName: "Robert Johnson", projectNumber: "ABCDE1234F", projectLocation: "Uttar Pradesh", address: "Bhiwani, Haryana", dueDate: "2025-08-25", contact: "9123456780", status: "In Transit" },
    { id: 3, customerName: "John Doe", refNumber: "23PQR54657T8U9V1", projectName: "Isabella Anderson", projectNumber: "XYZAB6789C", projectLocation: "Delhi", address: "Avadi, Tamil Nadu", dueDate: "2025-08-30", contact: "9988776655", status: "Processing" },
    { id: 4, customerName: "Ella Lewis", refNumber: "78STUV2345W6X7Y8", projectName: "Christopher White", projectNumber: "PQRST9012R", projectLocation: "Karnataka", address: "North Dum Dum, West Bengal", dueDate: "2025-08-20", contact: "9871234560", status: "Rejected" },
    { id: 5, customerName: "James Rodriguez", refNumber: "45KLMN8901P2Q3R4", projectName: "Jane Smith", projectNumber: "RSTUV9012B", projectLocation: "Andhra Pradesh", address: "Anantapur, Andhra Pradesh", dueDate: "2025-08-15", contact: "9876543212", status: "On Hold" },
    { id: 6, customerName: "Isabella Anderson", refNumber: "56LMNO234PQRS789", projectName: "Olivia Martin", projectNumber: "ABCDE6789Y", projectLocation: "Odisha", address: "Farrukhabad, Uttar Pradesh", dueDate: "2025-08-05", contact: "9988771122", status: "Completed" },
    { id: 7, customerName: "Sarah Williams", refNumber: "89KLMN6789P1Q2R3", projectName: "John Doe", projectNumber: "VWXYZ2345X", projectLocation: "West Bengal", address: "Vadodara, Gujarat", dueDate: "2025-08-02", contact: "9876541230", status: "In Transit" },
    { id: 8, customerName: "Sophia Hernandez", refNumber: "34FGHI5678J9KL12", projectName: "Mia Taylor", projectNumber: "RSTUV2345W", projectLocation: "Uttar Pradesh", address: "Loni, Uttar Pradesh", dueDate: "2025-07-30", contact: "9123456700", status: "Processing" },
    { id: 9, customerName: "Daniel Lee", refNumber: "12MNOP345QR67STU", projectName: "Ethan Clark", projectNumber: "LMNOP5678V", projectLocation: "Madhya Pradesh", address: "Raichur, Karnataka", dueDate: "2025-07-25", contact: "9988112233", status: "Rejected" },
    { id: 10, customerName: "Amelia Brown", refNumber: "98XYZ1234LMNO567", projectName: "Noah Johnson", projectNumber: "QRSTU9012B", projectLocation: "Punjab", address: "Amritsar, Punjab", dueDate: "2025-07-20", contact: "9876501234", status: "On Hold" },
    { id: 11, customerName: "William Davis", refNumber: "56ABCD7890EFGH12", projectName: "Sophia Lee", projectNumber: "ABCDE3456K", projectLocation: "Haryana", address: "Panipat, Haryana", dueDate: "2025-06-30", contact: "9988774455", status: "Completed" },
    { id: 12, customerName: "Emma Wilson", refNumber: "34LMNO5678PQRS90", projectName: "Lucas Miller", projectNumber: "XYZAB9012T", projectLocation: "Kerala", address: "Kochi, Kerala", dueDate: "2025-06-28", contact: "9876541122", status: "In Transit" },
    { id: 13, customerName: "Benjamin Clark", refNumber: "78QRST1234UVWX56", projectName: "Ava Garcia", projectNumber: "LMNOP2345U", projectLocation: "Tamil Nadu", address: "Chennai, Tamil Nadu", dueDate: "2025-06-25", contact: "9988779900", status: "Processing" },
    { id: 14, customerName: "Charlotte Martinez", refNumber: "23WXYZ4567LMNO89", projectName: "Elijah Harris", projectNumber: "PQRST3456R", projectLocation: "Gujarat", address: "Ahmedabad, Gujarat", dueDate: "2025-06-22", contact: "9876504455", status: "Rejected" },
    { id: 15, customerName: "Henry Thompson", refNumber: "90ABCDE1234FGHI5", projectName: "Emily Johnson", projectNumber: "RSTUV6789P", projectLocation: "Rajasthan", address: "Jaipur, Rajasthan", dueDate: "2025-06-18", contact: "9988115566", status: "On Hold" },
  ],
};


const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projects.push({ id: Date.now(), ...action.payload });
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
  },
});

export const { addProject, updateProject } = projectSlice.actions;
export default projectSlice.reducer;
