import "../App.css";
import "../App.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async () => {
    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.message) {
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

  return (
    <>
      <div className="register-container">
        <h2>Register Now</h2>

        <div className="input-fields">
          <input
            className="input"
            type="email"
            placeholder="Enter your email id here.."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Enter your password here.."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={registerHandler}>Register</button>
      </div>
    </>
  );
};

export default Register;
