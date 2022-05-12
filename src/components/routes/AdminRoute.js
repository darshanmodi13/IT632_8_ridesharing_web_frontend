import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext";

const Admin = ({ children }) => {
  const { authState } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.id || authState.id !== 1234) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.id]);

  return authState.id === 1234 && children;
};

export default Admin;
