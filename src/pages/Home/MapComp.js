import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { makeStyles } from "@mui/styles";
import RedIcon from "./CustomIcon";

//img
import location from "../../assets/img/location.jpg";

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
    left: "25%",
    cursor: "pointer",
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
});

const MapComp = () => {
  const [position, setPosition] = useState([23.022505, 72.571365]);
  const classes = useStyles();

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getLocation() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }

  const onSuccess = (pos) => {
    setPosition(() => {
      return [pos.coords.latitude, pos.coords.longitude];
    });
  };

  const onError = (err) => {
    console.log(err);
  };
  return (
    <div className="classes['map-container']">
      <div>
        <img
          src={location}
          alt="location"
          className={classes.img}
          onClick={getLocation}
        />
      </div>
      <MapContainer center={position} zoom={17} className={classes.map}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMaker position={position} />
      </MapContainer>
      <div className={classes["input-container"]}>
        <div className={classes["ride-type"]}>
          <span
            className={`${classes["book-ride"]} ${classes["selected-type"]}`}
          >
            Book Ride
          </span>
          <span className={`${classes["offer-ride"]}`}>Offer Ride</span>
        </div>
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
    let coords = {
      lat: position[0],
      lng: position[1],
    };
    map.flyTo(coords, map.getZoom());
  }
  return (
    <>
      <Marker position={position} icon={RedIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </>
  );
};
