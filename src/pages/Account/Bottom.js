import { makeStyles } from "@mui/styles";
import React from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { actionTypes } from "../../actionTypes/actionType";
import authMethods from "../../utils/authMethods";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  logout: {
    color: "red",
    backgroundColor: "white",
    fontWeight: "bold",
    fontSize: "0.9rem",
    padding: "10px",
    display: "flex",
    width: "30vw",
    "@media(max-width:1200px)": {
      width: "100vw",
    },
  },

  diffIcon: {
    padding: "10px",
  },

  menuItems: {
    paddingTop: "10px",
    cursor: "pointer",
  },
});

const Bottom = () => {
  const classes = useStyles();
  const { authDispatch } = useGlobalContext();
  const navigate = useNavigate();

  const logout = async () => {
    await authMethods.clearStorage();
    await authDispatch({
      type: actionTypes.SET_AUTHENTICATION,
      payload: false,
    });
    await authDispatch({ type: actionTypes.SET_ID, payload: null });
    await authDispatch({ type: actionTypes.SET_MOBILE, payload: null });
    await authDispatch({ type: actionTypes.SET_ROLE, payload: null });
    await authDispatch({ type: actionTypes.SET_TOKEN, payload: null });
    navigate("/login");
  };

  return (
    <>
      <div className={classes["logout"]}>
        <div className={classes["diffIcon"]}>
          <PowerSettingsNewIcon style={{ fontSize: "0.9rem" }} />
        </div>
        <div className={classes["menuItems"]} onClick={logout}>
          Logout
        </div>
      </div>
    </>
  );
};

export default Bottom;
