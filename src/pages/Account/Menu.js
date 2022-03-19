import React from "react";
import { makeStyles } from "@mui/styles";
import { borderBottom } from "@mui/system";
import { BorderTop } from "@mui/icons-material";

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PaymentsIcon from '@mui/icons-material/Payments';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SettingsIcon from '@mui/icons-material/Settings';

const useStyles = makeStyles({

    
    "functions":{
        backgroundColor: "white"
    },

    "diffIcon":{
        padding: "17px 30px 17px 20px",
        color:"green"
    },

    "tabs":{
        display:"flex",
        borderBottom: "1px solid silver",
        padding: "12px 20px 12px 20px",
    },

    "tab1":{
        display:"flex",
        border: "1px solid silver",
        padding: "12px 20px 12px 20px",
        BorderTop: "1px solid silver"
    },

    "menuItems":{
        paddingTop:"20px"
    }
});

const Menu = () => {
    const classes = useStyles();
    return(
        <>
            <div className={classes["functions"]}>
                
                {/* tab of specific feature */}
                <div className={classes["tab1"]}>
                    {/*Icons related to feature */}
                    <div className={classes["diffIcon"]}>
                        <AdminPanelSettingsIcon/>
                    </div>
                    {/* feature name */}
                    <div className={classes["menuItems"]}>
                        Profile Verification
                    </div>

                </div>

                <div className={classes["tabs"]}>
                    <div className={classes["diffIcon"]}>
                        <PaymentsIcon/>
                    </div>
                    <div className={classes["menuItems"]}>
                        Payments
                    </div>
                </div>

                <div className={classes["tabs"]}>
                    <div className={classes["diffIcon"]}>
                        <DirectionsCarIcon/>
                    </div>
                    <div className={classes["menuItems"]}>
                        My Vehicles
                    </div>
                </div>

                <div className={classes["tabs"]}>
                    <div className={classes["diffIcon"]}>
                        <SettingsIcon/>
                    </div>
                    <div className={classes["menuItems"]}>
                        Settings
                    </div>
                </div>
            </div>
        </>
    );
}

export default Menu;