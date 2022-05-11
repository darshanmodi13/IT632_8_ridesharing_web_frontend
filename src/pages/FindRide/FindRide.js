import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Map, Marker, Source, Layer } from "react-map-gl";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { useGlobalContext } from "../../contexts/GlobalContext";
//api
import mapApi from "../../apis/mapApis";

//io connection
import { socket } from "../../utils/socket.connection";
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
  "loader-container": {
    width: "100%",
    maxHeight: "30vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "5%",
    textAlign: "center",
  },
  loader: {
    textAlign: "center",
  },
  text: {
    fontSize: "1rem",
    marginTop: "5%",
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

const FindRide = () => {
  const [query] = useSearchParams();
  const classes = useStyles();
  const { authState } = useGlobalContext();
  const [geojson, setGeojson] = useState({
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [],
    },
  });
  let [err, setErr] = useState(null);
  const navigate = useNavigate();
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
  useEffect(() => {
    let start = JSON.parse(query.get("start"));
    let end = JSON.parse(query.get("end"));
    setStartLocation(start);
    setViewState((oldVal) => {
      return {
        ...oldVal,
        latitude: start.lat,
        longitude: start.lng,
      };
    });

    socket.on("driver-selected", (data) => {
      if (data.status === "200") {
        let { id, user_id, status, ...driver } = data;
        navigate(
          `/wait-for-driver?start=${JSON.stringify(start)}&end=${JSON.stringify(
            end
          )}&driver=${JSON.stringify(driver)}`
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let start = JSON.parse(query.get("start"));
    let end = JSON.parse(query.get("end"));
    let id = authState.id;
    if (id) {
      socket.emit("join", { city: start.location.split(",")[0], id: id });
      socket.emit("find-ride", {
        start,
        end,
        id,
        city: start.location.split(",")[0],
      });
      socket.on("no-ride", (msg) => {
        setErr(msg);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.id]);
  // function test() {
  //   let end = JSON.parse(query.get("end"));
  //   navigate(
  //     `/wait-for-driver?start=${JSON.stringify(end)}&end=${JSON.stringify(
  //       startLocation
  //     )}`
  //   );
  // }
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
            color="red"
          ></Marker>

          <Source data={geojson} type="geojson">
            <Layer {...layerStyle} />
          </Source>
        </Map>
        <div className={classes["loader-container"]}>
          {err ? (
            <p>No captains avalable..</p>
          ) : (
            <>
              <ReactLoading
                type={"spin"}
                color={"black"}
                height="10%"
                width="10%"
                className={classes.loader}
              />
              <p className={classes.text}>
                Waiting For Captain to accept ride...
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FindRide;
