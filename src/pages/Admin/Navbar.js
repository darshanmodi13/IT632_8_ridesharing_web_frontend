import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { actionTypes } from "../../actionTypes/actionType";
import { useGlobalContext } from "../../contexts/GlobalContext";
import authMethods from "../../utils/authMethods";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
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
      <nav className={styles["main-nav"]}>
        {/* 1st logo part  */}
        <div className={styles.logo}>
          <h2>
            <span>A</span>dmin
            <span>P</span>anel
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons
              ? styles["menu-link mobile-menu-link"]
              : styles["menu-link"]
          }
        ></div>

        {/* 3rd social media links */}
        <div className={styles["social-media"]}>
          {/* hamburget menu start  */}
          <button className={styles.logout} onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
