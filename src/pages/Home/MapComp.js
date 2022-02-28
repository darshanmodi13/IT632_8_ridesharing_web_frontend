import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { makeStyles } from "@mui/styles";
import RedIcon from "./CustomIcon";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import Location from "./Location";

//custom hooks
import useGeoLocation from "../../hooks/useGeoLocation";
import useGetAddress from "../../hooks/useGetAddress";

//styles
const useStyles = makeStyles({
  "map-container": {
    width: "100%",
    height: "60%",
    position: "relative",
  },
  map: {
    height: "60%",
    width: "30%",
    position: "absolute",
    top: 0,
    left: 0,
    "@media(max-width:1200px)": {
      width: "100%",
    },
  },
  img: {
    height: "40px",
    width: "40px",
    zIndex: 9999,
    position: "absolute",
    top: "50%",
    left: "26%",
    cursor: "pointer",
    background: "#fff",
    color: "blue",
    padding: "5px",

    "@media(max-width:1200px)": {
      left: "90%",
    },
  },
  "input-container": {
    position: "absolute",
    top: "60%",
    width: "30%",
    height: "25%",
    textAlign: "center",
    background: "#fff",
    "@media (max-width:1200px)": {
      width: "100%",
    },
  },
  "ride-type": {
    marginTop: "2%",
    width: "100%",
    fontSize: "1rem",
  },
  "book-ride": {
    float: "left",
    marginLeft: "1%",
    width: "47%",
    textAlign: "center",
    border: "1px solid black",
    borderRadius: "20px",
    paddingTop: "5px",
    paddingBottom: "5px",
    cursor: "pointer",
  },
  "offer-ride": {
    float: "right",
    marginRight: "1%",
    width: "47%",
    textAlign: "center",
    border: "1px solid black",
    borderRadius: "20px",
    paddingTop: "5px",
    paddingBottom: "5px",
    cursor: "pointer",
  },
  "selected-type": {
    background: "black",
    color: "#fff",
  },
  input: {
    width: "95%",
    height: "25%",
    paddingLeft: "10px",
    borderRadius: "20px",
  },
  "start-location": {
    marginTop: "15%",
    display: "flex",
    justifyContent: "space-evenly",
    borderBottom: "1px dotted black",
    width: "90%",
    margin: "auto",
  },
  "start-input": {
    flexBasis: "85%",
    border: "none",
    outline: "none",
  },
  "red-marker-img": {
    flexBasis: "10%",
    width: "3px",
    height: "10px",
    color: "red",
  },
  "green-marker-img": {
    flexBasis: "10%",
    width: "3px",
    height: "10px",
    color: "green",
  },
  "end-location": {
    marginTop: "5%",
    display: "flex",
    justifyContent: "space-evenly",
    borderBottom: "1px dotted black",
    width: "90%",
    margin: "auto",
  },
  "display-slider": {
    display: "block",
  },
  "hide-slider": {
    display: "none",
  },
  "btn-container": {
    position: "absolute",
    top: "80%",
    textAlign: "center",
    width: "30%",
    "@media(max-width:1200px)": {
      width: "100%",
    },
  },
  btn: {
    marginTop: "2%",
    width: "90%",
    fontSize: "16px",
    padding: "10px",
    border: "1px solid transparent",
    borderRadius: "20px",
    background: "var(--background)",
    color: "#fff",
    cursor: "pointer",
  },
});

const MapComp = () => {
  const classes = useStyles();
  const [location, getLocation] = useGeoLocation();
  const [address, getAddress] = useGetAddress();
  const [isSliderOpen, setSliderOpen] = useState(false);
  const [startLocation, setStartLocation] = useState("Khadia");
  const [endLocation, setEndLocation] = useState("Khadia");
  const [placeHolderText, setPlaceHolderText] = useState("");
  useEffect(() => {
    getAddress(location.coords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeRideType = (e) => {
    e.target.classList.add(classes["selected-type"]);
    let previous = e.target.previousSibling;
    let next = e.target.nextSibling;

    if (previous) {
      if (previous.classList[1] === classes["selected-type"]) {
        previous.classList.remove(classes["selected-type"]);
      }
    } else {
      if (next.classList[1] === classes["selected-type"]) {
        next.classList.remove(classes["selected-type"]);
      }
    }
  };

  const openPopup = (text) => {
    setSliderOpen(true);
    setPlaceHolderText(text);
  };
  return (
    <div className="classes['map-container']">
      <div>
        <GpsFixedIcon
          className={classes.img}
          onClick={getLocation}
          style={{ fontSize: "35px" }}
        />
        {/* <img src={locationImg} alt="location" className={classes.img} /> */}
      </div>
      <MapContainer center={location.coords} zoom={17} className={classes.map}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMaker position={location.coords} />
      </MapContainer>
      <div className={classes["input-container"]}>
        <div className={classes["ride-type"]}>
          <span
            className={`${classes["book-ride"]} ${classes["selected-type"]}`}
            onClick={changeRideType}
          >
            Book Ride
          </span>
          <span className={`${classes["offer-ride"]}`} onClick={changeRideType}>
            Offer Ride
          </span>
        </div>
        <div className={classes["start-location"]}>
          <LocationOnIcon className={classes["green-marker-img"]} />
          <input
            type="text"
            className={classes["start-input"]}
            onClick={() => {
              openPopup("Enter Pickup Location");
            }}
            value={startLocation}
            readOnly
          />
        </div>
        <div className={classes["end-location"]}>
          <LocationOnIcon className={classes["red-marker-img"]} />
          <input
            type="text"
            className={classes["start-input"]}
            onClick={() => {
              openPopup("Enter Drop Location");
            }}
            value={endLocation}
            readOnly
          />
        </div>
      </div>
      <div className={classes["btn-container"]}>
        <button className={classes.btn}>Next</button>
      </div>
      <div
        className={
          isSliderOpen ? classes["display-slider"] : classes["hide-slider"]
        }
      >
        <Location
          isOpen={isSliderOpen}
          openCloseSlider={setSliderOpen}
          text={placeHolderText}
        />
      </div>
    </div>
  );
};

export default MapComp;

const LocationMaker = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    setLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);
  function setLocation() {
    map.flyTo(position, map.getZoom());
  }
  return (
    <>
      <Marker position={position} icon={RedIcon}>
        <Popup>Hello World</Popup>
      </Marker>
    </>
  );
};
