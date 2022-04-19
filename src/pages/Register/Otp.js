import React, { useState } from "react";
import styles from "./Register.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import authApis from "../../apis/auth.api";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

const Otp = ({ setCurrent, current }) => {
  const [err, setErr] = useState("");
  const { authState } = useGlobalContext();
  const navigate = useNavigate();
  console.log(authState);
  const closeErr = () => {
    setErr("");
  };
  const [input, setInput] = useState(["", "", "", ""]);

  const handleInput = (e) => {
    let num = Number(e.target.value);
    if (Number.isNaN(num)) return;
    setInput((oldArr) => {
      let input = [...oldArr];
      input[e.target.id] = e.target.value;
      return input;
    });
  };

  const nextKey = (e) => {
    if (
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      (e.keyCode >= 96 && e.keyCode <= 105)
    ) {
      if (e.target.nextSibling) e.target.nextSibling.focus();
    }
  };

  const handleRegister = () => {
    let otp = Number(input.join(""));
    authApis.verify(
      otp,
      authState.mobile,
      (data = null) => {
        if (data) {
          console.log(data);
          navigate("/login");
        }
      },
      (err = null) => {
        if (err) {
          setErr(err);
        }
      }
    );
  };
  return (
    <div className={styles["register-container"]}>
      <div className={styles.header}>
        <div className={styles["arrow-container"]}>
          <ArrowBackIosNewIcon
            className={styles.arrow}
            onClick={() => {
              setCurrent(1);
            }}
          />
        </div>
        <h3 className={styles["header-text"]}> OTP </h3>
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

      <div style={{ width: "100%", textAlign: "center" }}>
        <div className={styles["otp-container"]}>
          <input
            type="text"
            id="0"
            value={input[0]}
            maxLength={1}
            className={styles.otp}
            onKeyUp={nextKey}
            onChange={handleInput}
          />
          <input
            type="text"
            id="1"
            value={input[1]}
            maxLength={1}
            className={styles.otp}
            onKeyUp={nextKey}
            onChange={handleInput}
          />
          <input
            type="text"
            id="2"
            value={input[2]}
            maxLength={1}
            className={styles.otp}
            onKeyUp={nextKey}
            onChange={handleInput}
          />
          <input
            type="text"
            id="3"
            value={input[3]}
            maxLength={1}
            className={styles.otp}
            onKeyUp={nextKey}
            onChange={handleInput}
          />
        </div>
      </div>
      <div>
        <div className={styles["btn-container"]} style={{ marginTop: "5%" }}>
          <button
            onClick={handleRegister}
            className={styles.button}
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
