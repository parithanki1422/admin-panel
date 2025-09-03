import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
    estimates: [
        {
            id: 1,
            version: "V1",
            project: "Website Redesign",
            client: "ABC Corp",
            createdDate: dayjs().format("YYYY-MM-DD"),
            lastModified: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
            status: "Create",
            sections: [
                {
                    id: 1001,
                    title: "Development Phase",
                    items: [
                        {
                            id: 10001,
                            title: "Frontend Development",
                            description: "React.js development",
                            unit: "Hours",
                            quantity: 40,
                            price: 50,
                            margin: 10,
                            total: 2200
                        }
                    ]
                }
            ],
            subTotal: 2200,
            totalMargin: 200,
            totalAmount: 2200
        },
        {
            id: 2,
            version: "V2",
            project: "Mobile App",
            client: "XYZ Ltd",
            createdDate: dayjs().subtract(2, "day").format("YYYY-MM-DD"),
            lastModified: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
            status: "Processing",
            sections: [
                {
                    id: 2001,
                    title: "Mobile Development",
                    items: [
                        {
                            id: 20001,
                            title: "iOS Development",
                            description: "Native iOS app",
                            unit: "Hours",
                            quantity: 60,
                            price: 75,
                            margin: 15,
                            total: 5175
                        }
                    ]
                }
            ],
            subTotal: 5175,
            totalMargin: 675,
            totalAmount: 5175
        },
        {
            id: 3,
            version: "V1",
            project: "E-commerce",
            client: "LMN Inc",
            createdDate: dayjs().subtract(5, "day").format("YYYY-MM-DD"),
            lastModified: dayjs().subtract(2, "day").format("YYYY-MM-DD"),
            status: "Rejected",
            sections: [
                {
                    id: 3001,
                    title: "E-commerce Platform",
                    items: [
                        {
                            id: 30001,
                            title: "Backend Development",
                            description: "API development",
                            unit: "Hours",
                            quantity: 80,
                            price: 60,
                            margin: 12,
                            total: 5376
                        }
                    ]
                }
            ],
            subTotal: 5376,
            totalMargin: 576,
            totalAmount: 5376
        },
        {
            id: 4,
            version: "V3",
            project: "CRM Platform",
            client: "OPQ Solutions",
            createdDate: dayjs().subtract(3, "day").format("YYYY-MM-DD"),
            lastModified: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
            status: "On Hold",
            sections: [
                {
                    id: 4001,
                    title: "CRM Development",
                    items: [
                        {
                            id: 40001,
                            title: "Full Stack Development",
                            description: "Complete CRM solution",
                            unit: "Hours",
                            quantity: 120,
                            price: 65,
                            margin: 20,
                            total: 9360
                        }
                    ]
                }
            ],
            subTotal: 9360,
            totalMargin: 1560,
            totalAmount: 9360
        },
        {
            id: 5,
            version: "V2",
            project: "Inventory System",
            client: "RST Traders",
            createdDate: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
            lastModified: dayjs().subtract(3, "day").format("YYYY-MM-DD"),
            status: "In Transit",
            sections: [
                {
                    id: 5001,
                    title: "Inventory Management",
                    items: [
                        {
                            id: 50001,
                            title: "System Development",
                            description: "Inventory tracking system",
                            unit: "Hours",
                            quantity: 100,
                            price: 55,
                            margin: 8,
                            total: 5940
                        }
                    ]
                }
            ],
            subTotal: 5940,
            totalMargin: 440,
            totalAmount: 5940
        },
        {
            id: 6,
            version: "V1",
            project: "Marketing Website",
            client: "UVW Media",
            createdDate: dayjs().subtract(4, "day").format("YYYY-MM-DD"),
            lastModified: dayjs().subtract(2, "day").format("YYYY-MM-DD"),
            status: "Create",
            sections: [
                {
                    id: 6001,
                    title: "Website Development",
                    items: [
                        {
                            id: 60001,
                            title: "Landing Page",
                            description: "Marketing landing page",
                            unit: "Hours",
                            quantity: 30,
                            price: 45,
                            margin: 15,
                            total: 1552.5
                        }
                    ]
                }
            ],
            subTotal: 1552.5,
            totalMargin: 202.5,
            totalAmount: 1552.5
        }
    ],
};

const estimatesSlice = createSlice({
    name: "estimates",
    initialState,
    reducers: {
        addEstimate: (state, action) => {
            state.estimates.push(action.payload);
        },
        updateEstimate: (state, action) => {
            const index = state.estimates.findIndex((e) => e.id === action.payload.id);
            if (index !== -1) {
                state.estimates[index] = {
                    ...state.estimates[index],
                    ...action.payload,
                    lastModified: dayjs().format("YYYY-MM-DD")
                };
            }
        },
        deleteEstimate: (state, action) => {
            state.estimates = state.estimates.filter((e) => e.id !== action.payload);
        },
    },
});

export const { addEstimate, updateEstimate, deleteEstimate } = estimatesSlice.actions;
export default estimatesSlice.reducer;