import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import '../../assets/css/AuthPage.css';

export default function AuthPage() {
  const [isSignupActive, setIsSignupActive] = useState(false);

  return (
    <div className="auth-page">
      <div
        className={`auth-container ${
          isSignupActive ? "right-panel-active" : ""
        }`}
      >
        <div className="form-container sign-up-container">
          <Signup />
        </div>
        <div className="form-conatiner sign-in-container">
          <Login />
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Already have an account?</p>
              <button
                className="ghost"
                onClick={() => setIsSignupActive(false)}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Don’t have an account yet?</p>
              <button className="ghost" onClick={() => setIsSignupActive(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
