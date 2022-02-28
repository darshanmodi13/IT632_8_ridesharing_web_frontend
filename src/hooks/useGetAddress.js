import { useState } from "react";
import * as ELG from "esri-leaflet-geocoder";
import L from "leaflet";
import axios from "axios";
import Geocode from "react-geocode";
import config from "../utils/apis";

const apikey = config.get_google_api;

const useGetAddress = () => {
  const [address, setAddress] = useState("");
  function getAddress() {}
  //   console.log(ELG.reverseGeocode({ apikey }));
  // const reverse_geocode = new ELG.reverseGeocode({ apikey });
  // Geocode.setApiKey(apikey);
  // Geocode.enableDebug();

  // // Get address from latitude & longitude.
  // Geocode.fromLatLng("48.8583701", "2.2922926").then(
  //   (response) => {
  //     const address = response.results[0].formatted_address;
  //     console.log(address);
  //   },
  //   (error) => {
  //     console.error(error);
  //   }
  // );
  // async function getAddress(coords) {
  //   reverse_geocode.latlng(coords).run((err, result, response) => {
  //     console.log(err, result, response);
  //   });
  //   console.log(coords);
  //   let res = await axios.get(
  //     `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=PointAddress&preferredLabelValues=localCity&location=-93.13726%2C44.803809`
  //   );
  //   console.log(res);
  // L.esri.Geocoding.reverseGeocode()
  //   .latlng(coords)
  //   .run((err, result, response) => {
  //     console.log(err, result, response);
  //   });
  // geocoder
  //   .reverse()
  //   .latlng(coords)
  //   .run((err, result) => {
  //     if (!err) {
  //       onSuccess(result);
  //     } else {
  //       onError(err);
  //     }
  //   });
  // }

  const onSuccess = (data) => {
    console.log(data);
  };
  const onError = (err) => {
    console.log(err);
  };

  return [address, getAddress];
};

export default useGetAddress;
