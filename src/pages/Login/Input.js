import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalContext } from "../../contexts/GlobalContext";
import authApis from "../../apis/auth.api";
import authMethods from "../../utils/authMethods";

const useStyles = makeStyles({
  "login-container": {
    background: "#fff",
    height: "100%",
    width: "100%",
    paddingTop: "3%",
    "@media(max-width:1200px)": {
      width: "100%",
    },
  },
  header: {
    display: "flex",
    fontSize: "20px",
    fontWeight: "bolder",
    paddingBottom: "28%",
  },

  subheader: {
    fontSize: "1.5rem",
    fontWeight: "bolder",
    width: "100%",
    textAlign: "center",
  },
  subheader2: {
    fontSize: "12px",
    fontWeight: "500",
    width: "100%",
    textAlign: "center",
    color: "grey",
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
    fontWeight: "bold",
  },
  "input-container": {
    textAlign: "center",
    marginTop: "5%",
  },
  input: {
    height: "20%",
    width: "90%",
    border: "2px solid black",
    padding: "12px",
    outline: "none",
    color: "black",
    borderRadius: "10px",
  },
  "btn-container": {
    textAlign: "center",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    marginTop: "3%",
    width: "60%",
    fontSize: "16px",
    padding: "12px",
    border: "1px solid transparent",
    borderRadius: "16px",
    background: "black",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },

  "forgot-password": {
    marginTop: "3%",
    marginBottom: "1%",
    float: "right",
    paddingRight: "6%",
  },
  register: {
    marginTop: "2%",
    textAlign: "center",
    width: "100%",
  },
  "error-container": {
    marginTop: "2%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  err: {
    width: "90%",
    background: "rgba(255, 0, 0, 0.747)",
    color: "#fff",
    padding: "10px 10px",
    fontSize: "0.8rem",
    fontWeight: "500",
  },
  close: {
    float: "right",
    cursor: "pointer",
  },
  hide: {
    display: "none",
  },
  show: {
    display: "block",
  },
});

const Input = () => {
  const classes = useStyles();
  const { authDispatch } = useGlobalContext();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    mobile_no: "",
    password: "",
  });
  const [err, setErr] = useState("");

  const changeInput = (e) => {
    if (e.target.name === "mobile_no") {
      let num = Number(e.target.value);
      if (Number.isNaN(num)) {
        return;
      }
    }
    setInput((oldval) => {
      return {
        ...oldval,
        [e.target.name]: e.target.value,
      };
    });
  };
  const submitForm = () => {
    if (!input.mobile_no || input.mobile_no.length !== 10) {
      setErr("Enter Valid Mobile Number");
      return;
    } else if (!input.password) {
      setErr("Enter Password");
      return;
    }
    authApis.signin(
      input,
      authDispatch,
      async (data) => {
        console.log(data);
        authMethods.setIdToken(
          data._id,
          data.token,
          1,
          data.mobile_no,
          data.can_drive
        );
      },
      (err = "") => {
        console.log();
        setErr(err.message);
      }
    );
  };
  const closeErr = () => {
    setErr("");
  };
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

        <div className={classes.subheader}>Welcome Back!</div>
        <div className={classes.subheader2}>Please enter your details.</div>

        {err ? (
          <div className={`${classes["error-container"]}`}>
            <div className={classes.err}>
              {err}
              <CloseIcon
                className={classes.close}
                style={{ fontSize: "0.8rem" }}
                onClick={closeErr}
              />
            </div>
          </div>
        ) : null}
        <div className={classes["input-container"]}>
          <input
            type="text"
            pattern="[7-9]{1}[0-9]{9}"
            title="Phone number with 7-9 and remaing 9 digit with 0-9"
            className={classes["input"]}
            placeholder="Enter Mobile Number"
            value={input.mobile_no}
            name="mobile_no"
            maxLength="10"
            onChange={changeInput}
          />
        </div>
        <div className={classes["input-container"]}>
          <input
            type="password"
            className={classes["input"]}
            placeholder="Enter Password"
            value={input.password}
            name="password"
            onChange={changeInput}
          />
        </div>

        <div className={classes["forgot-password"]}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <div className={classes["btn-container"]}>
          <button className={classes.btn} onClick={submitForm}>
            Sign In
          </button>
        </div>
        <div className={classes["register"]}>
          Don't Have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </>
  );
};

export default Input;
