import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [visibility, setVisibility] = useState("password");

  const loginHandler = async () => {
    try {
      console.log("Login button clicked ✅");

      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      console.log("Response status:", res.status);

      const data = await res.json().catch(() => {
        console.error("Failed to parse JSON");
        return { success: false, message: "Invalid server response" };
      });

      console.log("Response data:", data);

      if (data.success) {
        alert("Login Successful.. Redirecting to dashboard");
        // redirect
        window.location.href = "/dashboard";
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Check console.");
    }
  };

  const toggleVisibility = () => {
    setVisibility((prev) => (prev === "password" ? "text" : "password"));
  };

  const usernameHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const googleLoginHandler = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <>
      <div id="login-id" className="login-container">
        <h2 className="login-heading">Login to the website...</h2>

        <div className="input-fields">
          <input
            className="input"
            type="text"
            onChange={usernameHandler}
            placeholder="Enter your email id"
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

        <div>
          <button className="google-login" onClick={googleLoginHandler}>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              width="20"
              height="20"
              style={{ marginRight: "8px" }}
            />
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
