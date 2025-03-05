import React from "react";
import Layout from "@/layouts/Layout";
import HomePage from "./pages/HomePage";

import AgentStockPage from "./pages/AgentStockPage";
import { useRoutes } from "react-router";

import AgentSalesPage from "./pages/AgentSalesPage";
import SalesRecapPage from "./pages/SalesRecapPage";
import IncomeReportPage from "./pages/IncomeReportPage";
import TransactionPage from "./pages/TransactionPage";
import VoucherManagamentPage from "./pages/VoucherManagementPage";
import IncomeDetailPage from "./pages/IncomeDetailPage";

function App() {
  const routes = useRoutes([
    { index: true, element: <HomePage /> },
    { path: "transactions", element: <TransactionPage /> },
    { path: "voucher-management", element: <VoucherManagamentPage /> },
    { path: "agent-stocks", element: <AgentStockPage /> },
    { path: "agent-sales", element: <AgentSalesPage /> },
    { path: "sales-recap", element: <SalesRecapPage /> },
    { path: "income-report", element: <IncomeReportPage /> },
    { path: "income-report/:id", element: <IncomeDetailPage /> },
  ]);
  return <Layout>{routes}</Layout>;
}

export default App;
