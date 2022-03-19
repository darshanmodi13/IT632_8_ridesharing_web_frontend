import { makeStyles } from "@mui/styles";
import React from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const useStyles = makeStyles({
  logout: {
    color: "red",
    backgroundColor: "white",
    fontWeight: "bold",
    fontSize: "0.9rem",
    padding: "10px",
    bottom: "0px",
    position: "absolute",
    display: "flex",
  },

  diffIcon: {
    padding: "10px",
  },

  menuItems: {
    paddingTop: "10px",
  },
});

const Bottom = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes["logout"]}>
        <div className={classes["diffIcon"]}>
          <PowerSettingsNewIcon style={{ fontSize: "0.9rem" }} />
        </div>
        <div className={classes["menuItems"]}>Logout</div>
      </div>
    </>
  );
};

export default Bottom;
