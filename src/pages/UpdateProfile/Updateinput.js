import React, {useState} from "react";
import { makeStyles } from "@mui/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import image from "../../assets/img/default_male.png";
import CloseIcon from "@mui/icons-material/Close";
import { textAlign, width } from "@mui/system";
import { hover } from "@testing-library/user-event/dist/hover";

const useStyles = makeStyles({
    "updatecontainer": {
        background: "#fff",
        height: "100%",
        width: "100%",
        paddingTop: "2%",
        marginTop: "2%",
        "@media(max-width:1200px)": {
          width: "100%",
        },
      },
      header: {
        display: "flex",
        fontSize: "20px",
        fontWeight: "500",
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

      "profile_pic":{
        float:"initial",
        fontWeight:"bold",
        
    },

    "i":{
        maxHeight: "120px",
        maxWidth: "120px",
        position: "center",
        marginLeft:"35%"

    },
    "upload":{
      textAlign:"center",
      fontWeight:"bold",
      padding:"2%"
    },
    "Inputcontainer":{
      textAlign:"center",
      marginTop:"10px",
      display:"flex",
      borderTop:"2 px solid black"
    },
    input:{
       display:"flex",
       height:"7%",
       width:"70%",
       margin:"10px",
       padding:"10px",
       border:"2px solid black",
       textAlign:"justify",
       marginLeft:"10%",
       borderRadius:"4px",
       borderTop:"2 px solid black"
    },
    "Role":{
     marginLeft:"10%",
     padding:"10px",
    },
    "btn-container": {
      textAlign: "center",
      width: "100%",
      
      display:"-ms-inline-grid"
    },
    btn1:{
      display:"table-column-group",
      backgroundColor:"aliceblue",
      margin: "30px 20px",
      cursor:"pointer",      
      padding:"12px 28px",
      borderRadius:"4px",
      marginLeft:"10%",
      fontWeight:"bold"
     
    },
    btn2:{
      display:"table-column-group",
      margin: "30px 20px",
      cursor:"pointer",
      backgroundColor:"aliceblue",
      padding:"12px 28px",
      borderRadius:"4px",
      fontWeight:"bold"
    },
    btn3:{
      display:"table-column-group",
      margin: "30px 20px",
      cursor:"pointer",
      backgroundColor:"aliceblue",
      padding:"12px 28px",
      borderRadius:"4px",
      marginLeft:"30%",
      fontWeight:"bold",
    
    },
    
    btn4: {
      marginTop: "3%",
      width: "70%",
      fontSize: "16px",
      padding: "10px",
      border: "1px solid transparent",
      borderRadius: "10px",
      background: "var(--background)",
      color: "#fff",
      cursor: "pointer",
      marginLeft:"10%"
    },
  
    
});

const Updateinput = () =>{
const classes = useStyles();
 const navigate = useNavigate();
 const[input, setInput] = useState({
   name:"",
   mobilenumber:"",
   email:"",
   dateofbirth:"",
 });
 const [err, setErr] = useState("");
 

 const changeInput = (e) => {
    setInput((oldval) => {
      return {
        ...oldval,
        [e.target.name]: e.target.value,
      };
    });
  };

  const closeErr = () => {
    setErr("");
  };

  return(
      <>
        <div className={classes["updatecontainer"]}>
        <div className={classes.header}>
            <div className={classes["arrowcontainer"]}>
            <ArrowBackIosNewIcon
              className={classes.arrow}
              style={{ fontSize: "25px" }}
              onClick={() => {
                navigate(-1);
              }}
            />
            </div>
            <div className={classes["Header-text"]}>Update Profile</div>
        </div>
          
        {err ? (
          <div className={`${classes["error-container"]}`}>
            <div className={classes.err}>
              {err}
              <CloseIcon
                className={classes.close}
                style={{ fontSize: "0.8rem" }}
                onClick={closeErr}
              />
            </div>
          </div>
        ) : null}
         
        <div className={classes["profile_pic"]}>
                    <img className={classes["i"]}src={image} alt="NULL"/> <br></br>
                    <div className={classes["upload"]}>
                    <input type = "file" id = "img" style = {{display:"none"}}></input>
                    <label htmlFor="img">Upload Profile Image</label>
        </div>
                </div>
         
        <div className={["Inputcontainer"]}>
          <input 
          type="text"
          pattern="[A-Za-z]{15}"
          title="Your Name with maximum 15 alphabets"
          className={classes["input"]}
          placeholder="Name"
          value={input.name}
          name="name"
          onChange={changeInput}
            />
          </div>

          <div className={["Inputcontainer"]}>
          <input 
          type="text"
          pattern="[7-9]{1}[0-9]{9}"
          title="Contact Number begin with 7-9"
          className={classes["input"]}
          placeholder="Contact Number"
          value={input.mobilenumber}
          name="mobilenumber"
          onChange={changeInput}
            />
        </div>

        <div className={["Inputcontainer"]}>
          <input 
          type="text"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Email begin with any letters,numbers followed by @ and domain name"
          className={classes["input"]}
          placeholder="Email for Contact"
          value={input.email}
          name="email"
          onChange={changeInput}
            />
        </div>
           
        <div className={["Inputcontainer"]}>
          <input 
          type="date"
          title="Date of birth"
          className={classes["input"]}
          placeholder="DD/MM/YYYY"
          value={input.dateofbirth}
          name="dateofbirth"
          onChange={changeInput}
            />
        </div>

        <div className={["btn-container"]}>

        <div className={classes["Role"]}>
                   Role
                   </div>
                
          <button className={classes.btn1}  >
            Driver
          </button>

          <button className={classes.btn2}  >
            Passenger
          </button>

          <button className={classes.btn3} >
            Both
          </button> <br></br>

          <button className={classes.btn4} >
            Update Profile
          </button>
        </div>
       

        </div>
      </>
  );
};
export default Updateinput;
