import React from "react";
import { makeStyles } from "@mui/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const useStyles = makeStyles({
  "location-container": {
    background: "#fff",
    height: "100%",
    width: "30%",
    paddingTop: "2%",
    "@media(max-width:1200px)": {
      width: "100%",
    },
  },
  "slider-up": {
    position: "absolute",
    top: "0%",
    left: "0%",
    transition: "all 0.3s",
    zIndex: "9999",
  },
  "slider-down": {
    position: "absolute",
    top: "100%",
    transition: "all 0.3s",
  },
  header: {
    display: "flex",
    fontSize: "20px",
    fontWeight: "500",
  },
  "arrow-container": {
    flexBasis: "10%",
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
});
const Location = ({ openCloseSlider, isOpen, text }) => {
  const classes = useStyles();

  return (
    <div
      className={`${isOpen ? classes["slider-up"] : classes["slider-down"]} ${
        classes["location-container"]
      }`}
    >
      <div className={classes.header}>
        <div
          className={classes["arrow-container"]}
          onClick={() => {
            openCloseSlider(false);
          }}
        >
          <ArrowBackIosNewIcon
            className={classes.arrow}
            style={{ fontSize: "25px" }}
          />
        </div>
        <div className={classes["header-text"]}>{text}</div>
      </div>
      <div className={classes["input-container"]}>
        <input type="text" className={classes.input} placeholder={text} />
      </div>
    </div>
  );
};

export default Location;
