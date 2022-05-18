import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BaseLayout from "./pages/BaseLayout";
import ListStockPage from "./pages/ListStockPage";
import ListTransactionPage from "./pages/ListTransaction";
import LoginPage from "./pages/LoginPage";
import StockRegisterPage from "./pages/StockRegisterPage";
import TotalDatas from "./pages/TotalDatas";
import TransactionPage from "./pages/TransactionPage";
import UpdateStock from "./pages/UpdateStock";
import UserRegister from "./pages/UserRegister";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/baselayout" element={<BaseLayout />}>
              <Route
                path="transactionlists"
                element={<ListTransactionPage />}
              />
              <Route path="transactionregister" element={<TransactionPage />} />
              <Route path="stocklists" element={<ListStockPage />}>
                <Route path="updatestock" element={<UpdateStock />} />
              </Route>
              <Route path="stockregister" element={<StockRegisterPage />} />
              <Route path="totaldatas" element={<TotalDatas />} />
              <Route path="register" element={<UserRegister />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
