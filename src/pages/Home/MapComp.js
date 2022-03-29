import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import Location from "./Location";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../../components/sidebar/Sidebar";
import { Map, Marker, Source, Layer } from "react-map-gl";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext";
//api
import mapApi from "../../apis/mapApis";

//styles
const useStyles = makeStyles({
  "map-container": {
    width: "100%",
    height: "60%",
    position: "relative",
  },
  map: {
    height: "60vh",
    width: "30vw",
    position: "absolute",
    top: 0,
    left: 0,
    "@media(max-width:1200px)": {
      width: "100vw",
    },
  },
  "login-container": {
    position: "relative",
  },
  login: {
    color: "white",
    position: "absolute",
    left: "75%",
    marginTop: "5%",
    fontSize: "1rem",
    background: "var(--background)",
    padding: "15px",
    border: "1px solid green",
    borderRadius: "20px",
    cursor: "pointer",
    "@media(max-width:1200px)": {
      left: "80%",
    },
  },
  "ride-container": {
    marginTop: "2%",
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    textAlign: "center",
  },
  "ride-style": {
    flexBasis: "45%",
    border: "1px solid black",
    paddingTop: "5px",
    paddingBottom: "5px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  "selected-ride": {
    color: "white",
    background: "black",
  },
  "notselected-ride": {
    color: "black",
    background: "#fff",
  },
  "input-container": {
    marginTop: "2%",
    padding: "5px",
  },
  input: {
    width: "95%",
    height: "25%",
    paddingLeft: "10px",
    paddingBottom: "5px",
    borderBottom: "1px dotted black",
    marginTop: "3%",
    fontSize: "0.8rem",
    display: "flex",
    cursor: "pointer",
  },
  "gps-container": {
    position: "relative",
    top: "80%",
  },
  gps: {
    position: "absolute",
    left: "90%",
    background: "#fff",
    cursor: "pointer",
  },
  "btn-container": {
    textAlign: "center",
    width: "100%",
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
  show: {
    display: "block",
  },
  hide: {
    display: "none",
  },
  "vehicle-logo": {
    width: "100%",
    textAlign: "center",
  },
  "vehicle-container": {
    width: "100%",
  },
  vehicle: {
    borderRadius: "10px",
    padding: "10px",
    display: "flex",
    justifyContent: "space-evenly",
    width: "90%",
    background: "#bebebe",
    marginTop: "2%",
    transition: "0.3s all",
    cursor: "pointer",
    marginLeft: "5%",
    "&:hover": {
      width: "100%",
      marginLeft: "0%",
    },
  },
  "vehicle-name": {
    flexBasis: "50%",
  },
  distance: {
    flexBasis: "30%",
  },
  "nav-container": {
    position: "absolute",
    width: "100%",
    background: "#fff",
    padding: "10px",
  },
  menu: {
    cursor: "pointer",
  },
});

//token
const token = process.env.REACT_APP_MAPBOX_TOKEN;

const layerStyle = {
  id: "route",
  type: "line",
  source: "route",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-width": 4,
    "line-color": "grey",
  },
};

const MapComp = () => {
  const classes = useStyles();
  const [isSliderOpen, setSliderOpen] = useState(false);
  const [startLocation, setStartLocation] = useState({
    location: "",
    lat: 0,
    lng: 0,
  });
  const [endLocation, setEndLocation] = useState({
    location: "",
    lat: 0,
    lng: 0,
  });
  const [placeHolderText, setPlaceHolderText] = useState("");
  const [displaySidebar, setDisplaySiderbar] = useState(false);
  const [geojson, setGeojson] = useState({
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [],
    },
  });
  const [viewState, setViewState] = useState({
    latitude: 23.022505,
    longitude: 72.571365,
    zoom: 14,
    dragPan: true,
    bearing: 0,
  });
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentComp, setCurrentComp] = useState(1);
  const [location, setLocation] = useState({
    text: null,
    fn: null,
  });
  const { authState } = useGlobalContext();

  useEffect(() => {
    setViewState((oldData) => {
      return {
        ...oldData,
        latitude: startLocation.lat,
        longitude: startLocation.lng,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startLocation.location]);
  const changeRideType = (e) => {
    let previous = e.target.previousSibling;
    let next = e.target.nextSibling;
    e.target.classList.add(classes["selected-ride"]);
    if (e.target.classList.contains(classes["notselected-ride"])) {
      e.target.classList.remove(classes["notselected-ride"]);
    }
    if (previous) {
      if (previous.classList.contains(classes["selected-ride"])) {
        previous.classList.remove(classes["selected-ride"]);
      }
    } else {
      if (next.classList.contains(classes["selected-ride"])) {
        next.classList.remove(classes["selected-ride"]);
      }
    }
  };

  const openPopup = (text) => {
    setSliderOpen(true);
    setPlaceHolderText(text);
  };

  const openSidebar = () => {
    setDisplaySiderbar(true);
  };

  function getLocation() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }

  const onSuccess = (pos) => {
    setViewState((oldVal) => {
      return {
        ...oldVal,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };
    });
    mapApi.getReverseGeoLocation(
      {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      },
      (location) => {
        setStartLocation(() => {
          return {
            location: location.place_name,
            lng: pos.coords.longitude,
            lat: pos.coords.latitude,
          };
        });
      }
    );
  };

  const onError = (err) => {
    console.log(err);
  };

  const getDistance = () => {
    setCurrentComp(2);
    mapApi.getDistance(
      startLocation.lng,
      startLocation.lat,
      endLocation.lng,
      endLocation.lat,
      (res) => {
        setGeojson((oldData) => {
          return {
            ...oldData,
            geometry: {
              type: "LineString",
              coordinates: [...res.routes[0].geometry.coordinates],
            },
          };
        });
        setDistance(res.routes[0].distance);
        setDuration(res.routes[0].duration);
        setViewState((oldData) => {
          return {
            ...oldData,
            zoom: 11,
          };
        });
      },
      (err) => {}
    );
  };
  return (
    <>
      <div classes={classes["map-container"]}>
        <Map
          {...viewState}
          style={{ height: "60vh" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={token}
          onLoad={getLocation}
          onMove={(e) => {
            setViewState((oldVal) => {
              return {
                ...oldVal,
                latitude: e.viewState.latitude,
                longitude: e.viewState.longitude,
              };
            });
          }}
        >
          <Marker
            longitude={startLocation.lng}
            latitude={startLocation.lat}
            color="red"
          >
            {/* <img src="./pin.png" /> */}
          </Marker>
          {endLocation.location ? (
            <Marker
              longitude={endLocation.lng}
              latitude={endLocation.lat}
              color="green"
            >
              {/* <img src="./pin.png" /> */}
            </Marker>
          ) : null}
          <Source data={geojson} type="geojson">
            <Layer {...layerStyle} />
          </Source>
          {currentComp === 1 ? (
            <div className={classes["gps-container"]}>
              <GpsFixedIcon className={classes.gps} onClick={getLocation} />
            </div>
          ) : null}
          {authState.authenticated ? (
            <Navbar openSidebar={openSidebar} />
          ) : (
            <div className={classes["login-container"]}>
              <Link to="/login" className={classes.login}>
                Login
              </Link>
            </div>
          )}
        </Map>

        {currentComp === 1 ? (
          <div>
            <div className={classes["ride-container"]}>
              <div
                className={`${classes["selected-ride"]} ${classes["ride-style"]}`}
                onClick={changeRideType}
              >
                Find Ride
              </div>
              <div
                className={`${classes["notselected-ride"]} ${classes["ride-style"]}`}
                onClick={changeRideType}
              >
                Offer Ride
              </div>
            </div>
            <div className={classes["input-container"]}>
              <div
                className={classes.input}
                onClick={() => {
                  openPopup("Enter Pickup Location");
                  setLocation(() => {
                    return {
                      text: startLocation.location || "",
                      fn: setStartLocation,
                    };
                  });
                }}
              >
                {" "}
                <FiberManualRecordIcon
                  style={{
                    color: "red",
                    fontSize: "0.8rem",
                    marginRight: "10px",
                  }}
                />{" "}
                {startLocation.location
                  ? startLocation.location
                  : "Enter Pickup Location"}
              </div>
              <div
                className={classes.input}
                onClick={() => {
                  openPopup("Enter Destination Location");
                  setLocation(() => {
                    return {
                      text: endLocation.location || "",
                      fn: setEndLocation,
                    };
                  });
                }}
              >
                <FiberManualRecordIcon
                  style={{
                    color: "green",
                    fontSize: "0.8rem",
                    marginRight: "10px",
                  }}
                />{" "}
                {endLocation.location
                  ? endLocation.location
                  : "Enter Destination Location"}
              </div>
              <Location
                isOpen={isSliderOpen}
                openCloseSlider={setSliderOpen}
                text={placeHolderText}
                data={location}
                setData={setLocation}
              />
            </div>
            <div className={classes["btn-container"]}>
              {startLocation.location && endLocation.location ? (
                <button className={classes.btn} onClick={getDistance}>
                  Next
                </button>
              ) : (
                <button className={classes.btn}>Next</button>
              )}
            </div>
          </div>
        ) : (
          <DisplayDistance
            startLocation={startLocation.location}
            endLocation={endLocation.location}
            distance={distance}
            duration={duration}
            changeComp={setCurrentComp}
          />
        )}
      </div>

      {displaySidebar ? (
        <div
          style={{
            position: "absolute",
            top: "0%",
            left: "0%",
            zIndex: "9999",
            width: "30%",
            height: "100%",
            background: "#fff",
          }}
        >
          <Sidebar closeSidebar={setDisplaySiderbar} display={displaySidebar} />
        </div>
      ) : null}
    </>
  );
};

export default MapComp;

const DisplayDistance = ({
  startLocation,
  endLocation,
  distance,
  duration,
  changeComp,
}) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes["input-container"]}>
        <div className={classes.input}>
          <FiberManualRecordIcon
            style={{
              color: "red",
              fontSize: "0.8rem",
              marginRight: "10px",
            }}
          />
          {startLocation}
        </div>
        <div className={classes.input}>
          <FiberManualRecordIcon
            style={{
              color: "green",
              fontSize: "0.8rem",
              marginRight: "10px",
            }}
          />
          {endLocation}
        </div>
      </div>
      <div className={classes["vehicle-container"]}>
        <div className={classes.vehicle}>
          <TwoWheelerIcon className={classes["vehicle-logo"]} />
          <span className={classes["vehicle-name"]}>Bike</span>
          <span className={classes.distance}>
            {(distance / 1000).toFixed(1)}km
          </span>
        </div>
        <div className={classes.vehicle}>
          <DirectionsCarIcon className={classes["vehicle-logo"]} />
          <span className={classes["vehicle-name"]}>Car</span>
          <span className={classes.distance}>
            {(distance / 1000).toFixed(1)}km
          </span>
        </div>
        <div className={classes["btn-container"]}>
          <button className={classes.btn}>Book Ride</button>
          <button
            onClick={() => {
              changeComp(1);
            }}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};
const Navbar = ({ openSidebar }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes["nav-container"]}>
        <MenuIcon
          className={classes.menu}
          onClick={() => {
            openSidebar(true);
          }}
        />
      </div>
    </>
  );
};
