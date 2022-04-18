import React from "react";

//Components
import Image from "../../components/Image";
import DriverDistance from "./DriverDistance";

const DriverDistanceMain = () => {
  return (
    <>
      <div className="container">
        <div className="item-1">
          <DriverDistance />
        </div>
        <Image />
      </div>
    </>
  );
};

export default DriverDistanceMain;
