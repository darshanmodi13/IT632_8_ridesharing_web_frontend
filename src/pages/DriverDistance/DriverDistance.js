import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Map, Marker, Source, Layer } from "react-map-gl";
import { useNavigate, useSearchParams } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
//api
import mapApi from "../../apis/mapApis";

//images
import Avatar from "../../assets/img/avatar.jpg";
//io connection
import { socket } from "../../utils/socket.connection";
import { useGlobalContext } from "../../contexts/GlobalContext";
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
  "details-container": {
    width: "100%",
    marginTop: "2%",
    maxHeight: "30vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  "img-container": {
    marginTop: "2%",
    paddigTop: "2%",
    display: "flex",
    alignItems: "center",
    flexBasis: "70%",
    paddingLeft: "2%",
  },
  img: {
    height: "15%",
    width: "15%",
    borderRadius: "50%",
  },
  name: {
    fontSize: "1rem",
    width: "70%",
  },
  vehicle: {
    width: "100%",
    textAlign: "right",
    marginTop: "2%",
    paddingRight: "2%",
  },
  "ride-details": {
    marginTop: "3%",
    flexBasis: "100%",
  },
  from: {
    width: "100%",
    fontSize: ".8rem",
    textAlign: "left",
    paddingTop: "2%",
    paddingLeft: "4%",
  },
  otp: {
    fontSize: "0.9rem",
    marginTop: "2%",
    width: "100%",
    textAlign: "left",
    paddingLeft: "4%",
  },
  payment: {
    fontSize: "0.9rem",
    textAlign: "left",
    paddingLeft: "4%",
    marginTop: "2%",
  },
  "btn-container": {
    fontSize: "0.9rem",
    textAlign: "left",
    paddingLeft: "4%",
    marginTop: "2%",
    marginBottom: "2%",
  },
  btn: {
    padding: "10px",
    border: "1px solid red",
    boackground: "none",
    color: "red",
    borderRadius: "15px",
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

const DriverDistance = () => {
  const [query] = useSearchParams();
  const classes = useStyles();
  const { authState } = useGlobalContext();
  const navigate = useNavigate();
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
  const [startLocation, setStartLocation] = useState({
    location: "",
    lat: 0,
    lng: 0,
  });
  const [driverLocation, setDriverLocation] = useState({
    location: "",
    lat: 0,
    lng: 0,
  });
  const [endLocation, setEndLocation] = useState({
    location: "",
    lat: 0,
    lng: 0,
  });
  useEffect(() => {
    let start = JSON.parse(query.get("start"));
    let end = JSON.parse(query.get("end"));
    let driver = JSON.parse(query.get("driver"));
    setStartLocation(start);
    setDriverLocation(driver);
    setEndLocation(end);
    setViewState((oldVal) => {
      return {
        ...oldVal,
        latitude: start.lat,
        longitude: start.lng,
      };
    });
    getDistance(start.lat, start.lng, end.lat, end.lng);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let id = authState.id;
    let start = JSON.parse(query.get("start"));
    let end = JSON.parse(query.get("end"));
    let fare = null;
    if (id) {
      socket.emit("send-passenger-location", { start, end, id: id });
    }
    socket.on("ride-ended", async (data) => {
      console.log(data);
      await mapApi.getDistance(
        data.start.lng,
        data.start.lat,
        data.end.lng,
        data.end.lat,
        (res) => {
          fare = Math.floor((res.routes[0].distance / 1000) * 5);
        },
        (err) => {
          console.log(err);
        }
      );
      await socket.disconnect();
      await window.alert("Amount Payable:" + fare);
      navigate("/");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.id]);

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
        setViewState((oldData) => {
          return {
            ...oldData,
            zoom: 15,
          };
        });
      },
      (err) => {}
    );
  };
  return (
    <>
      <div className={classes["map-container"]}>
        <Map
          {...viewState}
          style={{ height: "70vh" }}
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
            color="blue"
          ></Marker>
          <Marker
            longitude={driverLocation.lng}
            latitude={driverLocation.lat}
            color="red"
          ></Marker>
          <Source data={geojson} type="geojson">
            <Layer {...layerStyle} />
          </Source>
        </Map>
        <div className={classes["details-container"]}>
          <div className={classes["img-container"]}>
            <img src={Avatar} alt="avatar" className={classes.img} />
            <div className={classes.name}>Darshan Modi</div>
            <div className={classes.vehicle}>
              GJ01 AB 1234
              <br />
              Honda Shine
            </div>
          </div>
          <div className={classes["ride-details"]}>
            <div className={classes.from}>
              {" "}
              <FiberManualRecordIcon
                style={{ color: "red", fontSize: ".8rem" }}
              />{" "}
              {driverLocation.location}
            </div>
            <div className={classes.from}>
              {" "}
              <FiberManualRecordIcon
                style={{ color: "green", fontSize: ".8rem" }}
              />{" "}
              {startLocation.location}
            </div>
          </div>
          <div className={classes.payment}>Payment Method : Cash</div>
          <div className={classes["btn-container"]}>
            <button className={classes.btn}>Cancel Ride</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverDistance;
