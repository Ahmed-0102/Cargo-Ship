import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider,Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Customer from "./components/Customer/Customer.jsx";
import Revenue from "./components/Revenue/Revenue.jsx";
import Transaction from "./components/Transaction/Transaction.jsx";
import Global from "./components/Global/Global.jsx";
import MainLayout from "./components/Main Layout/MainLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Dashboard /> }, // Default route
      { path: "dashboard", element: <Dashboard /> },
      { path: "customer", element: <Customer /> },
      { path: "revenue", element: <Revenue /> },
      { path: "transaction", element: <Transaction /> },
      { path: "globals", element: <Global /> },

    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
