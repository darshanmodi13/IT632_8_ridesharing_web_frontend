import React from "react";
import { makeStyles } from "@mui/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  "login-container": {
    background: "#fff",
    height: "100%",
    width: "100%",
    paddingTop: "2%",
    marginTop: "2%",
    "@media(max-width:1200px)": {
      width: "100%",
    },
  },
  header: {
    display: "flex",
    fontSize: "20px",
    fontWeight: "500",
  },
  "arrow-container": {
    flexBasis: "15%",
    textAlign: "center",
  },
  arrow: {
    cursor: "pointer",
  },
  "header-text": {
    flexBasis: "85%",
  },
  "input-container": {
    textAlign: "center",
    marginTop: "4%",
  },
  input: {
    height: "20%",
    width: "90%",
    border: "2px solid black",
    padding: "10px",
  },
  "btn-container": {
    textAlign: "center",
    width: "100%",
  },
  btn: {
    marginTop: "3%",
    width: "90%",
    fontSize: "16px",
    padding: "10px",
    border: "1px solid transparent",
    borderRadius: "10px",
    background: "var(--background)",
    color: "#fff",
    cursor: "pointer",
  },

  "forgot-password": {
    marginTop: "2%",
    textAlign: "center",
  },
  register: {
    marginTop: "2%",
    textAlign: "center",
  },
});

const Input = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <>
      <div className={classes["login-container"]}>
        <div className={classes.header}>
          <div className={classes["arrow-container"]}>
            <ArrowBackIosNewIcon
              className={classes.arrow}
              style={{ fontSize: "25px" }}
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
          <div className={classes["header-text"]}>Signin</div>
        </div>
        <div className={classes["input-container"]}>
          <input
            type="text"
            pattern="[7-9]{1}[0-9]{9}"
            title="Phone number with 7-9 and remaing 9 digit with 0-9"
            className={classes["input"]}
            placeholder="Enter Mobile Number"
          />
        </div>
        <div className={classes["input-container"]}>
          <input
            type="password"
            className={classes["input"]}
            placeholder="Enter Password"
          />
        </div>
        <div className={classes["btn-container"]}>
          <button className={classes.btn}>Book Ride</button>
        </div>
        <div className={classes["register"]}>Don't Have Account ? Register</div>
        <div className={classes["forgot-password"]}>Forgot Password</div>
      </div>
    </>
  );
};

export default Input;
