import axios from "axios";
const token = process.env.REACT_APP_MAPBOX_TOKEN;
const mapApi = {
  getGeoLocation: async (location, onSuccess, onError) => {
    let res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?country=in&proximity=ip&types=place%2Cpostcode%2Caddress%2Cdistrict%2Clocality%2Ccountry&language=en&access_token=${token}`
    );
    if (res) {
      onSuccess(res.data.features);
      return;
    }
    onError("Error");
  },
  getReverseGeoLocation: async (location, onSuccess, onError) => {
    let res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.lng},${location.lat}.json?country=in&limit=1&types=place%2Cpostcode%2Caddress%2Cdistrict%2Cregion&language=en&access_token=${token}`
    );
    if (res) {
      onSuccess(res.data.features[0]);
      return;
    }
    onError("error");
  },
  getDistance: async (
    startLng,
    startLat,
    endLng,
    endLat,
    onSucess,
    onError
  ) => {
    let res = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${startLng}%2C${startLat}%3B${endLng}%2C${endLat}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${token}`
    );
    if (res) {
      onSucess(res.data);
      return;
    }
    onError("Error");
  },
};

export default mapApi;
