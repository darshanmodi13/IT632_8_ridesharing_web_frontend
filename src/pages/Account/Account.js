import React from "react";

import Image from "../../components/Image";
import User from "./User"
import Menu from "./Menu.js";
import Bottom from "./Bottom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  "horizontal":{
    display: "flex"
},

"heading":{
    fontSize: "18px",
    fontWeight: "700",
    padding: "17px 20px 17px 20px",
    borderBottom: "1px solid silver",
    backgroundColor: "white"
},

"container":{
    backgroundColor: "rgb(245, 244, 244)"
}
});


const Home = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes["container"]}>
        <div className={classes["item-1"]}>
            <div className={classes["heading"]}>
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
