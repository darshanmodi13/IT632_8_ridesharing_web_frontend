
import React from 'react'
import { useState } from 'react'
import styles from "./Register.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
export default function Register() {

const [name, setname] = useState('');
const [contact, setcontact] = useState('');
const [email, setemail] = useState('');
const [pass, setpass] = useState('');
const [gender, setgender] = useState('');
 
const [registered, setregistered] = useState(false);
const [error, seterror] = useState(false);

const handlename = (e) => {setname(e.target.value);
                           setregistered(false);
                          };

const handlecontact = (e) =>{setcontact(e.target.value);
                             setregistered(false);
                            };

const handlemail = (e) =>{setemail(e.target.value);
                            setregistered(false);
                               };

const handlepass = (e) =>{setpass(e.target.value);
                          setregistered(false);
          
};
const handlegender = (e) =>{setgender(e.target.value);
                            setregistered(false);
                               };

const handleRegister = (e) =>{
                               e.preventDefault();
                               if(name === '' || contact === '' || email === '' || gender === '' || pass === '')
                               {
                                   seterror(true);
                               }
                               else{
                                   seterror(false);
                               }
                            };
const successMessage = () => {
    return (
        <div classname = "success"
        style={{display: registered ? '': 'none',}}>
        
        <h1> User {name} successfully Registered</h1>
        </div>
    );
};

const errorMessage = () => {
    return (
        <div classname = {styles.error}
        style={{display: error ? '': 'none',}}>
        
        <h4> Please Enter all the details </h4>
        </div>
    );
};

return(
         <div className = {styles.form}>
                
            <div> <ArrowBackIosNewIcon/> <h3 className={styles.h3} >  User Registeration Form  </h3></div>

            <div className="messages">
                {errorMessage()}
                 {successMessage()}
            </div>

           <form>
           
           
               <label className = {styles.label}></label>
               <input onChange={handlename} className={styles.input} value={name} type="text" placeholder=' Name'/>
               <br></br>
               <label className={styles.label}></label>
               <input onChange={handlecontact} className={styles.input} value={contact} type="text" placeholder=' Contact Number'/>
               <br></br>
               <label className={styles.label} ></label>
               <input onChange={handlemail} className={styles.input} value={email} type="email" placeholder='Email For Communication'/>
               <br></br>
               <label className={styles.label} ></label>
                <input onChange={handlepass} className={styles.input} value={pass} type="password" placeholder='Your Password'/>
                <br></br>
                <h5 className={styles.h5}>Gender</h5>
               <input  onChange={handlegender} list = "gender" name = "gender"/>
               <datalist id = "gender">
                   <option value="Male"/>
                   <option value="Female"/>
                   <option value=" Prefer Not to Say"/>
               </datalist>
                <br></br>
                <button onClick={handleRegister} className={styles.button} type="submit"> Sign Up </button>
               
           </form>
         </div>

);

}






