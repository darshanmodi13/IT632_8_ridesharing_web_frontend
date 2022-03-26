import React from "react";

import User from "./User";
import Image from "../../components/Image";
import Menu from "./Menu.js";
import Bottom from "./Bottom";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles({
  horizontal: {
    display: "flex",
  },

  heading: {
    width : '30vw',
    fontSize: ".9rem",
    fontWeight: "700",
    padding: "17px 20px 17px 20px",
    borderBottom: "1px solid silver",
    backgroundColor: "white",
  },

  container: {
    backgroundColor: "rgb(245, 244, 244)",
  },
  close: {
    float: "right",
  },
});

const Home = ({ closeSidebar }) => {
  const classes = useStyles();
  return (
    <>
      <div className="container">
        <div className="item-1" style={{ width: "100%" }}>
          <div className={classes["heading"]}>
            Account{" "}
            <div className={classes.close}>
              <CloseIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  closeSidebar(false);
                }}
              />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <User />
          </div>
          <div style={{ width: "100%" }}>
            <Menu />
          </div>
          <div>
            <Bottom />
          </div>
        </div>
        <Image />
      </div>
    </>
  );
};

export default Home;
