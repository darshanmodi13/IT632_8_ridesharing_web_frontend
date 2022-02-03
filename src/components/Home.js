import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
const Home = () => {
  const { authState } = useGlobalContext();
  console.log(authState);
  return (
    <div>
      <div>Home</div>
    </div>
  );
};

export default Home;
