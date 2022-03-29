import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
    "contact_details":{
        marginTop: "50px"
    },

    "mobile":{
        height: "80px"
    },

    "number":{
        marginTop:"10px",
        marginLeft: "20px",
        display: "flex"
    }

});

const Contact = () => {
    const classes = useStyles();
    return(
        <>
            <div className={classes['contact_details']}>
                <div className={classes['mobile']}>
                    <div>
                        <div className={classes["number"]}> Contact Number </div>
                        <div className={classes["number"]}> 6355657697 </div>
                    </div>
                </div>

                <div className={classes['mobile']}>
                    <div>
                        <div className={classes["number"]}> Email </div>
                        <div className={classes["number"]}> 202112069@daiict.ac.in </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Contact;