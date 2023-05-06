import "./Login.css";
import NavBar from "../Home/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaFacebook,
  FaGoogle,
  FaApple,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import { isEmail } from "validator";
import axios from "axios";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};
const vemail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">This is not a valid email.</div>
    );
  }
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onchangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (event) => {
    event.preventDefault();
  
    axios
      .post(
        "http://localhost:8080/authentication-service/login",
        document.querySelector("#login-form"),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Check if login was successful
        if (response.status === 200) {
          // Redirect to user page
          navigate("/userpage");
        } else {
          // Display error message
          alert("Login failed");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Login failed");
      });
  };
  return (
    <div className="login-page">
      <NavBar />
      <div className="login-card-container">
        <div className="login-card">
          <div className="login-card-header">
            <h1>Sign In</h1>
            <div>Please login to use the platform</div>
          </div>
          <form
            className="login-card-form"
            onSubmit={handleLogin}
            id="login-form"
          >
            <div className="form-item">
              <i>
                <FaEnvelope
                  size={"1.3em"}
                  color="#37018e"
                  className="form-item-icon"
                />
              </i>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-input"
                name="username"
                value={email}
                onChange={onchangeEmail}
                validations={[required, vemail]}
              />
            </div>
            <div className="form-item">
              <FaLock
                size={"1.3em"}
                color="#37018e"
                className="form-item-icon"
              />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
                className="form-input"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />

              <i onClick={handleTogglePassword} className="form-item-icon-eye">
                {showPassword ? (
                  <FaEye size={"1.3em"} color="#37018e" />
                ) : (
                  <FaEyeSlash size={"1.3em"} color="#37018e" />
                )}
              </i>
            </div>
            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>
          <div className="login-card-footer">
            Don't have an account?{" "}
            <Link to="/register" className="new-acc">
              Create a free account.
            </Link>
          </div>
        </div>
        <div className="login-card-social">
          <div>Other Sign-In Options</div>
          <div className="login-card-social-btns">
            <a href="/">
              <FaFacebook size={"2em"} />
            </a>
            <a href="/">
              <FaGoogle size={"2em"} />
            </a>
            <a href="/">
              <FaApple size={"2em"} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
