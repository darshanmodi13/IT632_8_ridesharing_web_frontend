import React from "react";
import Image from "../../components/Image";
import Info from "./Info";

const ViewProfile = () => {
    return(
        <>
            <div className="container">
                <div className="item-1">
                    <Info></Info>
                </div>
                <div className="item-2">
                    <Image></Image>
                </div>
            </div>
        </>
    );
}

export default ViewProfile;