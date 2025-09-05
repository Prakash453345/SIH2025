import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [visibility, setVisibility] = useState("password");

  const loginHandler = async () => {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data=await res.json();

    if(data.success)
    {
      alert('Login Sucessful.. Redirecting to dashboard');
    }

    else
    {
      alert(data.message);
    }
  };



  const toggleVisibility = () => {
    setVisibility((prev) => (prev === "password" ? "text" : "password"));
  };

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div id="login-id" className="login-container">
      <h2 className="login-heading">Login to Your Interview Portal</h2>

      <div className="input-fields">
        <input
          className="input"
          type="text"
          onChange={usernameHandler}
          placeholder="Enter your username"
        />

        <div className="password-wrapper">
          <input
            className="input"
            type={visibility}
            onChange={passwordHandler}
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="eye-button"
            onClick={toggleVisibility}
          >
            {visibility === "password" ? "👁️" : "🙈"}
          </button>
        </div>

        <button onClick={loginHandler} className="login-btn">
          Login
        </button>

        <p className="register">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

