import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  contact_details: {
    marginTop: "50px",
  },

  mobile: {
    height: "80px",
  },

  number: {
    marginTop: "10px",
    marginLeft: "20px",
    display: "flex",
  },
});

const Contact = ({ user }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes["contact_details"]}>
        <div className={classes["mobile"]}>
          <div>
            <div className={classes["number"]}> Contact Number </div>
            <div className={classes["number"]}> {user.mobile_no} </div>
          </div>
        </div>

        <div className={classes["mobile"]}>
          <div>
            <div className={classes["number"]}> Email </div>
            <div className={classes["number"]}> {user.email} </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
