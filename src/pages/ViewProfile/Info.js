import React from "react";
import image from "../../assets/img/default_male.png";
import { makeStyles } from "@mui/styles";
import Dashboard from "./Dashboard";
import Contact from "./Contact";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  // "profile_pic":{
  //     padding: "20px",
  //     display: "block",
  //     marginLeft: "auto",
  //     marginRight: "auto"
  // },

  image: {
    padding: "10px",
    width: "80%",
    height: "330px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },

  name: {
    borderTop: "1px solid grey",
    borderRadius: "100px",
    fontWeight: "bold",
    fontSize: "20px",
    paddingTop: "10px",
    paddingLeft: "20px",
  },

  btn: {
    padding: "3px 20px",
    color: "blue",
    background: "white",
    border: "1px solid grey",
    borderRadius: "5px",
    position: "absolute",
    top: "1%",
    left: "23%",
    "@media(max-width:1200px)": {
      left: "80%",
    },
  },
});

const Info = ({ user }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes["info"]}>
        <div className={classes["profile_pic"]}>
          <img className={classes["image"]} src={image} alt="NULL" />
          <Link to="/update-profile" className={classes.btn}>
            Edit
          </Link>
        </div>
        <div className={classes["name"]}>{user.name.toUpperCase()}</div>
        <div>
          <Dashboard user={user}></Dashboard>
        </div>
        <div>
          <Contact user={user}></Contact>
        </div>
      </div>
    </>
  );
};

export default Info;
