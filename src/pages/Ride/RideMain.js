import React from "react";

import Image from "../../components/Image";
import Ride from "./Ride";

const RideMain = () => {
  return (
    <>
      <div className="container">
        <div className="item-1">
          <Ride />
        </div>
        <Image />
      </div>
    </>
  );
};

export default RideMain;
