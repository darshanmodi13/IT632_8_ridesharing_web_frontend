import { makeStyles } from "@mui/styles";
import React from "react";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';


const useStyles = makeStyles({
    "logout":{
        height:"70px",
        color:"red",
        backgroundColor:"white",
        fontWeight:"bold",
        fontSize:"18px",
        padding:"10px 10px 10px 10px",
        bottom: "0px",  
        position: "relative",
        display:"flex",
        borderBottom: "1px solid silver",
        //marginTop:"50px"
    }, 

    "diffIcon":{
        padding: "10px 30px 17px 30px"
    }, 

    "menuItems":{
        paddingTop:"10px"
    }
});

const Bottom = () => {
    const classes = useStyles();
    return(
        <>
            <div className={classes["logout"]}>
                    <div className={classes["diffIcon"]}>
                        <PowerSettingsNewIcon/>
                    </div>
                    <div className={classes["menuItems"]}>
                        Logout
                    </div>
            </div>
        </>
    );
}

export default Bottom;