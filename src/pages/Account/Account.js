import React from "react";

import Image from "../../components/Image";
//import MapComp from "./MapComp";
import "./Accounts.css"
import User from "./User"
import Menu from "./Menu.js";
import { Logout } from "@mui/icons-material";
import Bottom from "./Bottom";
import { makeStyles } from "@mui/styles";


const Home = () => {
  return (
    <>
      <div className="container">
        <div className="item-1">
            <div id="heading">
                Account
            </div>
            <div>
                <User/>
            </div>  
            <div>
              <Menu/>
            </div>
            <div>
              <Bottom/>
            </div>
        </div>
        <Image />
      </div>
    </>
  );
};

export default Home;
