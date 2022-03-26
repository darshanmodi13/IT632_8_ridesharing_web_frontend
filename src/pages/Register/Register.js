import React from "react";
import { useState } from "react";
import styles from "./Register.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

export default function Register() {
  const [input, setInput] = useState({
    name: "",
    mobile: "",
    email: "",
    gender: "male",
    password: "",
    "re-password": "",
  });
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleInput = (e) => {
    if (e.target.name === "mobile") {
      let num = Number(e.target.value);
      if (Number.isNaN(num)) {
        return;
      }
    }
    setInput((oldVal) => {
      return {
        ...oldVal,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (!input.name) {
      setErr("Please fill name field");
      return;
    } else if (!input.mobile || input.mobile.length !== 10) {
      setErr("Please provide mobile no with 10 digits");
      return;
    } else if (!input.email || !validateEmail(input.email)) {
      setErr("Please provide valid email id");
      return;
    } else if (!input.password || input.password.length < 6) {
      setErr("Please enter valid password");
      return;
    } else if (
      !input["re-password"] ||
      input.password !== input["re-password"]
    ) {
      setErr("Please enter valid password");
      return;
    }
  };
  const closeErr = () => {
    setErr("");
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  return (
    <div className={styles["register-container"]}>
      <div className={styles.header}>
        <div className={styles["arrow-container"]}>
          <ArrowBackIosNewIcon
            className={styles.arrow}
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        <h3 className={styles["header-text"]}> Register </h3>
      </div>
      {err ? (
        <div className={`${styles["error-container"]}`}>
          <div className={styles.err}>
            {err}
            <CloseIcon
              className={styles.close}
              style={{ fontSize: "0.8rem" }}
              onClick={closeErr}
            />
          </div>
        </div>
      ) : null}
      <form>
        <div className={styles["input-container"]}>
          <input
            onChange={handleInput}
            className={styles.input}
            value={input.name}
            type="text"
            placeholder="Enter Name"
            name="name"
          />
          <input
            onChange={handleInput}
            className={styles.input}
            value={input.mobile}
            pattern="[7-9]{1}[0-9]{9}"
            type="text"
            placeholder="Enter Contact Number"
            name="mobile"
            maxLength="10"
          />
          <input
            onChange={handleInput}
            className={styles.input}
            value={input.email}
            type="text"
            placeholder="Email For Communication"
            name="email"
          />
          <select
            className={styles.input}
            defaultValue="male"
            name="gender"
            onChange={handleInput}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            onChange={handleInput}
            className={styles.input}
            value={input.password}
            type="password"
            placeholder="Enter at least 6 letter Password"
            name="password"
          />
          <input
            onChange={handleInput}
            className={styles.input}
            value={input["re-password"]}
            type="password"
            placeholder="ReEnter Password"
            name="re-password"
          />
        </div>
        <div>
          <div className={styles["btn-container"]}>
            <button
              onClick={handleRegister}
              className={styles.button}
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
