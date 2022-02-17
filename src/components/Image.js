import React from "react";
import { makeStyles } from "@mui/styles";

//icons
import PeopleIcon from "@mui/icons-material/People";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";

const useStyles = makeStyles({
  "data-container": {
    height: "100vh",
  },
  header: {
    fontSize: "45px",
    marginTop: "15%",
    marginLeft: "18%",
    fontWeight: "bold",
  },
  "icon-container": {
    width: "60%",
    marginTop:'5%',
    marginLeft: "18%",
    display: "flex",
    justifyContent: "space-between",
    textAlign: "center",
  },
});

const Image = () => {
  const classes = useStyles();
  return (
    <>
      <div className={`item-2 ${classes["data-container"]}`}>
        <div className={classes.header}>
          Ride Share is India's <br /> Largest Ride Sharing Network
        </div>
        <div className={classes["icon-container"]}>
          <div>
            <PeopleIcon style={{ fontSize: "65px", marginTop: "3%" }} />
            <br />
            1000+ <br />
            Users
          </div>
          <div>
            <DirectionsCarFilledIcon
              style={{ fontSize: "65px", marginTop: "3%" }}
            />
            <br />
            1000+ <br />
            Users
          </div>
          <div>
            <PeopleIcon style={{ fontSize: "65px", marginTop: "3%" }} />
            <br />
            1000+ <br />
            Users
          </div>
        </div>
      </div>
    </>
  );
};

export default Image;
