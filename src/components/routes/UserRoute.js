import { useGlobalContext } from "../../contexts/GlobalContext";

const UserRoutes = ({ children }) => {
  const { authState } = useGlobalContext();
  return authState.authenticated && authState.role === 1 ? (
    children
  ) : (
    <>
      <div>Error 404</div>
    </>
  );
};

export default UserRoutes;
