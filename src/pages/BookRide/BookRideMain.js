import React from "react";

//Components
import Image from "../../components/Image";
import BookRide from "./BookRide";

const BookRideMain = () => {
  return (
    <>
      <div className="container">
        <div className="item-1">
          <BookRide />
        </div>
        <Image />
      </div>
      ;
    </>
  );
};

export default BookRideMain;
