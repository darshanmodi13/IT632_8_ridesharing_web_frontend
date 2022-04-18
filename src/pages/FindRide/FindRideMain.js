import React from "react";

import Image from "../../components/Image";
import FindRide from "./FindRide";

const FindRideMain = () => {
  return (
    <>
      <div className="container">
        <div className="item-1">
          <FindRide />
        </div>
        <Image />
      </div>
    </>
  );
};

export default FindRideMain;
