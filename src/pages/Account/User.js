import React from "react";
import image from "../../assets/img/default_male.png";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  profile: {
    width: "100%",
    "@media(max-width:1200px)": {
      width: "100vw",
    },
    height: "90px",
    fontSize: "1rem",
    fontWeight: "700",
    padding: "13px 20px 17px 22px",
    borderBottom: "1px solid silver",
    marginBottom: "10px",
    backgroundColor: "white",
  },

  profile_pic: {
    float: "left",
  },

  i: {
    maxHeight: "60px",
    maxWidth: "60px",
    position: "center",
  },

  name: {
    fontWeight: "600",
    paddingTop: "15px",
    paddingLeft: "90px",
  },
});

const User = ({ name }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes["profile"]}>
        <Link to="view-profile">
          <div className={classes["profile_pic"]}>
            <img className={classes["i"]} src={image} alt="NULL" />
          </div>
          {name ? (
            <div className={classes["name"]}>{name.toUpperCase()}</div>
          ) : null}
        </Link>
      </div>
    </>
  );
};

export default User;
