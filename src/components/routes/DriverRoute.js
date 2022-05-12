import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useEffect } from "react";
const DriverRoute = ({ children }) => {
  const { authState } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authState || !authState.can_drive) {
      window.alert("You Must need to upload Docs..");
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.can_drive]);
  return children;
};

export default DriverRoute;
// return authState.id && authState.token && authState.can_drive
//     ? children
//     : window.alert("You must need to upload docs.", navigate(-1));
