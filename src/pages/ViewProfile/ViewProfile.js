import React, { useEffect, useState } from "react";
import userApi from "../../apis/user.api";
import Image from "../../components/Image";
import { useGlobalContext } from "../../contexts/GlobalContext";
import Info from "./Info";

const ViewProfile = () => {
  const [user, setUser] = useState(null);
  const { authState } = useGlobalContext();

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.id]);
  const getUser = async () => {
    let id = authState.id;
    await userApi.getUser(
      id,
      (res) => {
        setUser(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <>
      {user ? (
        <div className="container">
          <div className="item-1">
            <Info user={user}></Info>
          </div>
          <div className="item-2">
            <Image></Image>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ViewProfile;
