import React from "react";
import image from "../../assets/img/default_male.png";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    "profile":{
        height: "90px",
        fontSize: "1rem",
        fontWeight: "700",
        padding: "13px 20px 17px 22px",
        borderBottom: "1px solid silver",
        marginBottom: "10px",
        backgroundColor: "white"
    },

    "profile_pic":{
        float:"left",
    },

    "i":{
        maxHeight: "60px",
        maxWidth: "60px",
        position: "center"
    },

    "name":{
        fontWeight: "600",
        paddingTop: "15px",
        paddingLeft: "90px"
    }

});

const User = () => {
    const classes = useStyles();
    return(
        <>
            <div className={classes["profile"]}>
                <div className={classes["profile_pic"]}>
                    <img className={classes["i"]}src={image} alt="NULL"/>
                </div>
                <div className={classes["name"]}>
                        Jyot Maheshwari
                </div>
                
            </div>
        </>
    );
}

export default User;