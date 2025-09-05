import "../App.css";
import "../App.js";
import { useNavigate } from "react-router-dom";
import {useState} from 'react';

const Register = () => {
  const navigate = useNavigate();
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');


  const registerHandler = async () => {
  try {
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if(data.message)
    { 
      alert(data.message);
    }

    if (data.success) {
      alert("Registered Successfully! Redirecting to login...");
      navigate("/login");
    } else {
      alert("Registration failed: " + data.message);
    }
  } catch (error) {
    alert("Error during registration: " + error.message);
  }
};


  const set_username=(e)=>
  {
    setUsername(e.target.value);
  }

  const set_password=(e)=>
  {
    setPassword(e.target.value);
  }

  return (
    <>
      <div className="register-container">
        <h2>Register Now..</h2>

        <div className="input-fields">
          <input className="input" onChange={set_username} placeholder="Enter your username here.." />
          <input className="input" onChange={set_password} placeholder="Enter your password here.." />
        </div>

        <button onClick={registerHandler}>Register</button>
      </div>
    </>
  );
};

export default Register;
