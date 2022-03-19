import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  "sidebar-container": {
    height: "100%",
    width: "30%",
    background: "#fff",
    "@media(max-width:1200px)": {
      width: "100%",
    },
  },
  "display-sidebar": {
    position: "absolute",
    left: "25%",
    zIndex: 9999,
  },
  "hide-slider": {
    left: "-25%",
  },
});

const Sidebar = ({ display }) => {
  const classes = useStyles();
  return (
    <div className={classes["sidebar-container"]}>
      <div
        className={
          display ? classes["display-sidebar"] : classes["hide-sidebar"]
        }
      >
        sidebar
      </div>
    </div>
  );
};

export default Sidebar;
