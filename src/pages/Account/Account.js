import React from "react";

import User from "./User";
import Menu from "./Menu.js";
import Bottom from "./Bottom";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles({
  horizontal: {
    display: "flex",
  },

  heading: {
    fontSize: "18px",
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
        <div style={{ width: "100%" }}>
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
          <div>
            <User />
          </div>
          <div>
            <Menu />
          </div>
          <div>
            <Bottom />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
