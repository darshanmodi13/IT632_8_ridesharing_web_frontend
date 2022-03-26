import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext";

const AuthRoutes = ({ children }) => {
  const { authState } = useGlobalContext();
  return authState.id && authState.token ? children : <Navigate to="/login" />;
};

export default AuthRoutes;
