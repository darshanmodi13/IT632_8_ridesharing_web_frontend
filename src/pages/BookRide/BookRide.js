import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../../components/sidebar/Sidebar";
import { Map, Marker, Source, Layer } from "react-map-gl";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext";
//api
import mapApi from "../../apis/mapApis";

//hooks
import { useSearchParams } from "react-router-dom";

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

const BookRide = () => {
  const classes = useStyles();
  const [query] = useSearchParams();
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
  const { authState } = useGlobalContext();

  useEffect(() => {
    setViewState((oldData) => {
      return {
        ...oldData,
        latitude: startLocation.lat,
        longitude: startLocation.lng,
      };
    });
    let start = JSON.parse(query.get("start"));
    let end = JSON.parse(query.get("end"));
    // console.log(start, end);
    getDistance(start.lat, start.lng, end.lat, end.lng);
    setStartLocation(start);
    setEndLocation(end);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startLocation.location]);

  const openSidebar = () => {
    setDisplaySiderbar(true);
  };

  const getDistance = async (start_lat, start_lng, end_lat, end_lng) => {
    await mapApi.getDistance(
      start_lng,
      start_lat,
      end_lng,
      end_lat,
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
  const gotoFindRide = () => {
    return "abc";
  };
  return (
    <>
      <div classes={classes["map-container"]}>
        <Map
          {...viewState}
          style={{ height: "60vh" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={token}
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
          ></Marker>

          <Marker
            longitude={endLocation.lng}
            latitude={endLocation.lat}
            color="green"
          ></Marker>

          <Source data={geojson} type="geojson">
            <Layer {...layerStyle} />
          </Source>
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

        <DisplayDistance
          startLocation={startLocation.location}
          endLocation={endLocation.location}
          distance={distance}
          duration={duration}
          start={startLocation}
          end={endLocation}
        />
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

export default BookRide;

const DisplayDistance = ({
  startLocation,
  endLocation,
  distance,
  duration,
  changeComp,
  start,
  end,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
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
        <div className={classes["btn-container"]}>
          <button
            className={classes.btn}
            onClick={() => {
              navigate(
                `/find-ride?start=${JSON.stringify(start)}&end=${JSON.stringify(
                  end
                )}`
              );
            }}
          >
            Book Ride
          </button>
          <button
            onClick={() => {
              navigate(-1);
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
