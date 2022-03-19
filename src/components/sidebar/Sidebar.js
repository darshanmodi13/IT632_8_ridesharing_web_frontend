import React from "react";
import { makeStyles } from "@mui/styles";
import Account from "../../pages/Account/Account";

const useStyles = makeStyles({
  "sidebar-container": {
    width: "95%",
    background: "#fff",
    zIndex: 9999,
    "@media(max-width:1200px)": {
      width: "100%",
    },
  },
});

const Sidebar = ({ display, closeSidebar }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes["sidebar-container"]}>
        <Account closeSidebar={closeSidebar} />
      </div>
    </>
  );
};

export default Sidebar;
