import React, {useState} from 'react';
import "../index.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {

  const Navigate = useNavigate();
  
  // constants
  const [login, setLogin] = useState("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Male");
  const [Hobbies, setHobbies] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    firstName:"Jitendra",
    lastName:"saini",
    employeeId:"14256",
    department:"IT",
    email:"ok@mail.com",
    location:"faridabad",
    hobbies:"Coding & Reading",
    isManager:true,
  });

  // functions here!
  const randomFixedInteger = (length)=> {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
  }

  const  handleSubmit = async (submitType)=>{
    if(submitType=='login'){
        //  VALIDATING INPUTS AND TRY LOGIN
        if(email==''||password==''){
          window.alert(`All Fields Are Required!`);
        }else{
          // Login QUERY
          try{
            const data  = {email,password};
            const res = await axios.post(`/auth/login`,data);
            // console.log(res.data);
            if(typeof(res.data)==="string"){
              window.alert(res.data);
              setLogin('register');
            }else{
              localStorage.setItem("user", JSON.stringify(res.data));
              handleResetStates();
              Navigate('/');
            }
          }catch(error){
            console.log(error);
          }
        }
    }else{
    //  VALIDATING INPUTS AND TRY REGISTRATION
      if(firstName==''||lastName==''|| email==''||password==''){
        window.alert(`All Fields Are Required!`);
      }else{
        // REGISTER QUERY
        try{
        let employeeId = randomFixedInteger(6);
        const data  = {firstName,lastName,location,employeeId,email,password};
          const res = await axios.post(`/auth/register`,data);
          if(typeof(res.data)==="string"){
            window.alert(res.data);   
          } 
        }catch(error){
          console.log(error);
        }
      }
      setLogin('login');
      handleResetStates();
    }
  }

  // reset const values
  const handleResetStates=()=>{
    setFirstName("");
    setLastName("");
    setLocation("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className='loginScreen'>
      <div className="LoginLeft"></div>
      <div className="LoginRight">
        <div className="form-wrapper">
          {
            login=="login" ? (

              // LOGIN FORM
            <form action="" onSubmit={(e)=>{e.preventDefault(); handleSubmit(login)}}>
            <h2 className="title">Login!</h2>
            <h6>Enter your credentials to login to your account.</h6>
            <div className="form-inputs">
            <label htmlFor="email">Email</label>
              <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
              <label htmlFor="password">Password</label>
              <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <button type='submit' >Submit</button>
            <h6>create a new account <span onClick={()=>{setLogin("register"); handleResetStates()}}>here!</span></h6>
          </form>):(

            // REGISTRATION FORM
            <form action="" onSubmit={(e)=>{e.preventDefault(); handleSubmit(login)}}>
            <h2 className="title">Register!</h2>
            <h6>Fill in the following details to create new account.</h6>
            <div className="form-inputs">
            <div className="inputRow">
            <div className="inputcell">
            <label htmlFor="FirstName">First Name</label>
              <input type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} />
            </div>
            <div className="inputcell">
            <label htmlFor="LastName">Last Name</label>
              <input type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} />
            </div>
            </div>
              <label htmlFor="location">Location</label>
              <input type="text" value={location} onChange={(e)=>{setLocation(e.target.value)}}/>
              <label htmlFor="email">Email</label>
              <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
              <label htmlFor="password">Password</label>
              <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <button type='submit'>Submit</button>
            <h6>To log in your account click <span onClick={()=>{setLogin("login"); handleResetStates()}}>here!</span></h6>
          </form>
          )
          }
        </div>
      </div>
    </div>
  )
}

export default Login