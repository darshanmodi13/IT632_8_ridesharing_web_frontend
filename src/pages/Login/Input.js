import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    "phone_no":{
      fontFamily:"Roboto",
      fontSize:"25px",
      fontWeight:"900",
      padding: "20px"
  },
  
    "num":{
      paddingLeft: "21px",
  },
  
    "hr":{
      padding:"7px 0 0 21px"
    },
  
    "br-gr":{
      borderBottom: "5px solid",
      borderImageSlice: "1",
      borderWidth: "7px",
      width: "50px"
    },
  
    "br-gr br-gr-green":{
      borderImageSource: "linear-gradient(to left, #00C853, #B2FF59)"
    },
  
    "col1":{
      height: "60px",
      width: "100%",
      paddingLeft:"30px"
  },
  
  "col2":{
      height: "60px",
      width: "100%",
      padding: "10px 0 0 30px"
  },
  
  "col3":{
      height: "60px",
      width: "100%",
      padding: "10px 0 0 100px"
  },
  
  "txt":{
    font: "Roboto",
    color: "#333", 
    fontSize: "20px",
    width: "250px", 
    height: "40px",
    letterSpacing:"1px",
    borderRadius: "10px"
  },
  
  "btn":{
    padding: "1.3em 3em",
    fontSize: "12px",
    textTransform:"uppercase",
    letterSpacing: "2.5px",
    fontWeight: "500",
    color: "#fff",
    backgroundColor: "#000",
    border: "none",
    borderRadius: "45px",
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease 0s",
    cursor: "pointer",
    outline: "none"
   },
   
   "btn:hover":{
    backgroundColor: "#029544",
    boxShadow: "0px 15px 20px rgba(46, 229, 157, 0.4)",
    color: "#fff",
    transform: "translateY(-7px)"
   },
   
   "btn:active":{
    transform: "translateY(-1px)",
   }
  
  });
  

const Input = () => {
    const classes = useStyles();
  return (
    <>
      <div className="container">
        <div className="item-1">
          <div className={classes["phone_no"]}>
              <b> ˂ </b>  Enter Phone <br/><span className={classes["num"]}>Number</span><br/>
              
              <div className={classes["hr"]}>
                <div className={classes["br-gr br-gr-green"]}></div>
              </div>
            </div>        
                <div className={classes["col1"]}>
                    <input type="text" pattern="[7-9]{1}[0-9]{9}" title="Phone number with 7-9 and remaing 9 digit with 0-9" className={classes["txt"]} placeholder="Mobile Number" />                
                </div>

                <div className={classes["col2"]}>
                  <input type="text" className={classes["txt"]} placeholder="Password" />
                </div>

                <div className={classes["col3"]}>
                  <button type="submit" className={classes["btn"]} onClick={() => this.onSubmit()} value="Sign In" >Sign In</button>               
                </div>
        </div>
      </div>
    </>
  );
};

export default Input;
