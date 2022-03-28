import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Select from 'react-select'


const useStyles = makeStyles({
  "upload-container": {
    background: "#fff",
    height: "100%",
    width: "100%",
    paddingTop: "3%",
    "@media(max-width:1200px)": {
      width: "100%",
    },
  },
  header: {
    display: "flex",
    fontSize: "20px",
    fontWeight: "bolder",
    paddingBottom:"1%"
  },

  "arrow-container": {
    flexBasis: "15%",
    textAlign: "center",
  },
  arrow: {
    cursor: "pointer",
  },
  "header-text": {
    flexBasis: "85%",
  },
  "input-container": {
    textAlign: "center",
    marginTop: "5%",
  },

  input: {
    height: "20%",
    width: "90%",
    border: "2px solid black",
    padding: "12px",
    color:"black",
    borderRadius:"10px",
  },

  "lic-container":{
    marginTop: "5%",
    marginLeft:"5%",
    height: "14%",
    width: "90%",
    border: "2px solid black",
    padding: "12px",
    color:"black",
    borderRadius:"10px",
  },

  "lic":{
    padding:"4px",
  },

  "select-container": {
    marginTop: "4%",
    paddingLeft:"5%",
    paddingRight:"5%"
  },

  
  "select": {
    fontSize:"14px",
    height:"20%",
    width:"100%",
    color:"black",
    borderRadius:"10px",
    border:"2px solid black"
  },


  "btn-container": {
    textAlign: "center",
    width: "100%",
  },
  btn: {
    marginTop: "5%",
    width: "90%",
    letterSpacing:"2px",
    fontSize: "16px",
    padding: "12px",
    marginBottom:"10px",
    border: "1px solid transparent",
    borderRadius: "16px",
    background: "black",
    color: "#fff",
    cursor: "pointer",
    fontWeight:"bold"
  },

});

const vehicle = [
    { value: 'Moped', label: 'Moped' },
    { value: 'Bike', label: 'Bike' },
    { value: 'Car', label: 'Car' }
  ]


const Info = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes["upload-container"]}>
        <div className={classes.header}>
          <div className={classes["arrow-container"]}>
            <ArrowBackIosNewIcon

            />
          </div>
          <div className={classes["header-text"]}>Upload</div>
        </div>
        
        

        <div className={classes["select-container"]}>
             <Select options={vehicle} className={classes["select"]} placeholder="Vehicle Type" />
        </div>

        <div className={classes["input-container"]}>
        <input
            type="text"
            className={classes["input"]}
            placeholder="Model Name (i.e. Grand i20, Access)"
            name="model"
          />
        </div>

        <div className={classes["input-container"]}>
        <input
            type="text"
            className={classes["input"]}
            placeholder="Registration Number(GJ 01 AA 7777)"
            name="reg"
          />
        </div>

        <div className={classes["lic-container"]}>
            <div className={classes["lic"]}>Upload License Image</div>
            <input
                type="file"
                accept="image/*"
                className={classes["lic"]}
                id="contained-button-file"
            />
        </div>

        <div className={classes["input-container"]}>
        <input
            type="text"
            className={classes["input"]}
            placeholder="Drivers License Number (GJ01 20220012345)"
            name="licno"
          />
        </div>

        <div className={classes["input-container"]}>
        <input
            type="text"
            className={classes["input"]}
            placeholder="RC Book Number"
            name="rc"
          />
        </div>

        <div className={classes["btn-container"]}>
          <button className={classes.btn}>
            Update Profile
          </button>
        </div>
       
      </div>
    </>
  );
};

export default Info;
