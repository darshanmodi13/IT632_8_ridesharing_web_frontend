import React, { useState } from "react";
import Register from "./Register";
import Otp from "./Otp";
import Image from "../../components/Image";

const cur_comp = {
  1: Register,
  2: Otp,
};
const Registermain = () => {
  const [cur, setCur] = useState(1);
  const Component = cur_comp[cur];
  return (
    <>
      <div className="container">
        <div className="item-1">
          <Component setCurrent={setCur} current={cur} />
        </div>
        <Image />
      </div>
    </>
  );
};

export default Registermain;
