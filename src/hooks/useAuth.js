import { useContext } from "react";
import { Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  // const user = { loggedIn: true };
  // return user && user.loggedIn;
  return useContext(AuthContext);
};

// const ProtectedRoutes = () => {
//   const isAuth = useAuth();
//   return isAuth ? <Outlet /> : <LoginPage />;
// };

export default useAuth;
