import { Navigate } from "react-router-dom";
import Test from "./test";
import TransactionPage from "./pages/TransactionPage";
import LoginPage from "./pages/LoginPage";
import ListTransactionPage from "./pages/ListTransaction";

export const BaseLayoutRoutes = [
  {
    path: "/",
    component: ListTransactionPage,
    render: () => {
      return <Navigate to="/" />;
    },
  },
  {
    path: "/transaction",
    component: TransactionPage,
  },
];

export const AppRouter = [
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/",
    component: Test,
  },
];
