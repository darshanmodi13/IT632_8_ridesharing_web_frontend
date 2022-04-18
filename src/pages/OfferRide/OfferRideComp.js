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
  "ride-container": {
    width: "100%",
    textAlign: "left",
    marginLeft: "3%",
    borderBottom: "1px solid grey",
    paddingBottom: "5px",
  },
  ride: {
    marginTop: "2%",
    fontSize: "0.8rem",
  },
  btn: {
    borderRadius: "15px",
    border: "1px solid transparent",
    color: "#fff",
    background: "var(--background)",
    marginTop: "2%",
    padding: "7px",
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

const OfferRideComp = () => {
  const [query] = useSearchParams();
  const classes = useStyles();
  const { authState } = useGlobalContext();
  let [btnTxt, setBtnTxt] = useState("Select");
  const [geojson, setGeojson] = useState({
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [],
    },
  });
  const navigate = useNavigate();
  const [availableRides, setAvailableRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState([]);
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
  const [passenger, setPassengerLocation] = useState({});
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
    socket.emit("join", { start: start, end: end, type: "driver" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("res", (data) => {
      console.log(data);
    });
    socket.on("select-ride", (data) => {
      // console.log(data);
      setAvailableRides((oldVal) => {
        return [...oldVal, data];
      });
      console.log(availableRides);
    });
    socket.on("ride-cancelled", (data) => {
      let arr = availableRides.filter((ride) => ride.id !== data.user_id);
      setAvailableRides(arr);
    });
    socket.on("driver-selected", (data) => {
      console.log(data, startLocation);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const cancelRide = () => {};
  const rideSelect = (id) => {
    socket.emit("ride-selected", {
      ...startLocation,
      id: authState.id,
      user_id: id,
    });
    socket.on("receive-passenger-location", (data) => {
      setPassengerLocation(data);
      setBtnTxt("Arrived");
    });
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
            color="red"
          ></Marker>

          <Source data={geojson} type="geojson">
            <Layer {...layerStyle} />
          </Source>
        </Map>
        <div className={classes["loader-container"]}>
          {availableRides && availableRides.length !== 0
            ? availableRides.map((rides, index) => {
                return (
                  <Rides
                    current={startLocation}
                    start={rides.start}
                    end={rides.end}
                    key={index}
                    id={rides.id}
                    rideSelect={rideSelect}
                    btn={btnTxt}
                    setBtn={setBtnTxt}
                  />
                );
              })
            : null}
          {/* {rideSelect && rideSelect.length !== 0 ? (
            <Rides
              current={startLocation}
              start={rides.start}
              end={rides.end}
              key={index}
              id={rides.id}
              rideSelect={rideSelect}
              btn={btnTxt}
              setBtn={setBtnTxt}
            />
          ) : null} */}
        </div>
      </div>
    </>
  );
};

export default OfferRideComp;

const Rides = ({ current, start, end, id, rideSelect, btn, setBtn }) => {
  const classes = useStyles();
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    getDistance(current.lat, current.lng, start.lat, start.lng);
  }, []);

  const getDistance = async (start_lat, start_lng, end_lat, end_lng) => {
    await mapApi.getDistance(
      start_lng,
      start_lat,
      end_lng,
      end_lat,
      (res) => {
        setDistance((res.routes[0].distance / 1000).toFixed(2));
      },
      (err) => {}
    );
  };
  return (
    <>
      <div className={classes["ride-container"]} id={id}>
        <div className={classes.ride}>{start.location}</div>
        <div className={classes.ride}>{end.location}</div>
        <div className={classes.ride}>
          Distance From Location to current location :{distance}{" "}
        </div>
        {btn ? (
          <button
            className={classes.btn}
            onClick={() => {
              rideSelect(id);
            }}
          >
            {btn}
          </button>
        ) : null}
        <button
          className={classes.btn}
          style={{
            color: "red",
            background: "transparent",
            border: "1px solid red",
            marginLeft: "5%",
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
};
