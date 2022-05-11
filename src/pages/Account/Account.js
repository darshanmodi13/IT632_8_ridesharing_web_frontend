import React, { useEffect, useState } from "react";

import User from "./User";
import Image from "../../components/Image";
import Menu from "./Menu.js";
import Bottom from "./Bottom";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalContext } from "../../contexts/GlobalContext";
import userApi from "../../apis/user.api";

const useStyles = makeStyles({
  horizontal: {
    display: "flex",
  },

  heading: {
    width: "30vw",
    "@media(max-width:1200px)": {
      width: "100vw",
    },
    fontSize: ".9rem",
    fontWeight: "700",
    padding: "17px 20px 17px 20px",
    borderBottom: "1px solid silver",
    backgroundColor: "white",
  },

  container: {
    backgroundColor: "rgb(245, 244, 244)",
  },
  close: {
    float: "right",
  },
});

const Home = ({ closeSidebar }) => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const { authState } = useGlobalContext();

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.id]);
  let getUser = async () => {
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
          <div className="item-1" style={{ width: "100%" }}>
            <div className={classes["heading"]}>
              Account{" "}
              <div className={classes.close}>
                <CloseIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    closeSidebar(false);
                  }}
                />
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <User name={user.name} />
            </div>
            <div style={{ width: "100%" }}>
              <Menu />
            </div>
            <div style={{ width: "100%" }}>
              <Bottom />
            </div>
          </div>
          {/* <Image /> */}
        </div>
      ) : null}
    </>
  );
};

export default Home;
