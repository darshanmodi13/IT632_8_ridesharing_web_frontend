import L from "leaflet";

import marker from "../../assets/svg/marker.svg";

const RedIcon = L.icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  iconSize: [35, 35],
  iconAnchor: [32, 64],
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});

export default RedIcon;
