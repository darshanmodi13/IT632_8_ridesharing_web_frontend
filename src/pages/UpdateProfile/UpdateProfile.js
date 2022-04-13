import React from "react";
import Image from "../../components/Image";
import Input from "./Updateinput";

const UpdateProfile = () => {
  return (
    <>
      <div className="container">
        <div className="item-1">
          <Input />
        </div>
        <Image />
      </div>
    </>
  );
};

export default UpdateProfile;