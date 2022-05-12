import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  numbers: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "25px",
    fontWeight: "bold",
    paddingLeft: "35px",
    paddingRight: "110px",
  },

  role: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
  },
});

const Dashboard = ({ user }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes["data"]}>
        {/* <div className={classes["numbers"]}>
                    <div> 0 </div>
                    <div> 0 </div>
                    <div> 0 </div>
                </div>

                <div className={classes["role"]}>
                    <div> Total Rides </div>
                    <div> As Rider </div>
                    <div> As Passenger </div>
                </div> */}
      </div>
    </>
  );
};

export default Dashboard;
