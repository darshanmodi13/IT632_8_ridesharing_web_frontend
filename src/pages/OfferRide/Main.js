import React from "react";

import Image from "../../components/Image";
import OfferRideComp from "./OfferRideComp";
const OfferRide = () => {
  return (
    <>
      <div className="container">
        <div className="item-1">
          <OfferRideComp />
        </div>
        <Image />
      </div>
    </>
  );
};

export default OfferRide;
