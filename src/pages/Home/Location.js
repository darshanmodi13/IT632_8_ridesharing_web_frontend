import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

//api
import mapApi from "../../apis/mapApis";

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
  ul: {
    listStyle: "none",
    width: "100%",
    marginLeft: "-21px",
    textAlign: "left",
    "@media(max-width:1200px)": {
      marginLeft: "0",
    },
  },
  li: {
    width: "100%",
    cursor: "pointer",
    padding: "10px 20px",
    border: "1px solid grey",
    "@media(max-width:1200px)": {
      width: "95%",
    },
  },
});

const Location = ({ openCloseSlider, isOpen, text, data, setData }) => {
  const classes = useStyles();
  const [Locations, setLocations] = useState([]);

  const locationClicked = (location) => {
    data.fn(() => {
      return {
        location: location.place_name,
        lng: parseFloat(location.center[0]),
        lat: parseFloat(location.center[1]),
      };
    });
    openCloseSlider(false);
  };
  return (
    <>
      {isOpen ? (
        <div
          className={`${
            isOpen ? classes["slider-up"] : classes["slider-down"]
          } ${classes["location-container"]}`}
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
            <input
              type="text"
              className={classes.input}
              placeholder={text}
              value={data.text || ""}
              onChange={(e) => {
                data.fn((oldData) => {
                  return {
                    ...oldData,
                    location: e.target.value,
                  };
                });
                setData((oldData) => {
                  return {
                    ...oldData,
                    text: e.target.value,
                  };
                });
                mapApi.getGeoLocation(
                  e.target.value,
                  (res) => {
                    setLocations(res);
                  },
                  () => {
                    console.log("-- Error in getting places --");
                  }
                );
              }}
            />
            <ul className={classes.ul}>
              {Locations.map((location, index) => {
                return (
                  <li
                    key={index}
                    className={classes.li}
                    onClick={() => {
                      locationClicked(location);
                    }}
                  >
                    {location.place_name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Location;
