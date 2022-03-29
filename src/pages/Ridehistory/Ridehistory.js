import { Block } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { border, fontWeight, width } from "@mui/system";
import React from "react";

import Image from "../../components/Image";



const useStyles = makeStyles({

list: {
     padding : "15px 30px 10px",
     border : "1px solid green",
     width : "380px",
     height : "550px",
     overflow : "scroll",
},

item: {
     padding : "15px",
},


});


const Ridehistory = () => {
     const classes = useStyles();
    return (
      <div className="container">
        <div className={classes["item"]}><b>Ride History</b>
          
            <ul className={classes["list"]}>
                <li>Date and time
                 <ul><li> Pickup : Any location 1 </li>
                      <li>Destination: Any location 2</li>
                 </ul>
                </li>
                <li>Date and time
                 <ul><li> Pickup : Any location 1 </li>
                      <li>Destination: Any location 2</li>
                 </ul>
                </li>
                <li>Date and time
                 <ul><li> Pickup : Any location 1 </li>
                      <li>Destination: Any location 2</li>
                 </ul>
                </li>
            

            </ul>
            </div>
            <Image />
        </div>
        
    );
  };

  
  
  export default Ridehistory;
  