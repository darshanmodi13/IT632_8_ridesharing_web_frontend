import { useState, useEffect } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    coords: { lat: "23.022505", lng: "72.571365" },
    loaded: false,
  });

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getLocation() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }

  const onSuccess = (pos) => {
    setLocation(() => {
      return {
        coords: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        },
        loaded: true,
      };
    });
  };

  const onError = (err) => {
    console.log(err);
  };
  return [location, getLocation];
};

export default useGeoLocation;
