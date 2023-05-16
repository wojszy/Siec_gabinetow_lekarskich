import "../App.css";
import { useState } from "react";
import profile from "../img/doctors.png";
import loginimg from "../img/login-logo.png";
import pass from "../img/password.png";
import LoginInput from "../components/loginInput/loginInput";
import CustomButton from "../components/customButton/customButton";
import "./RegisterScreen.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import jwt_decode from "jwt-decode";
import { handleRedirect } from "../helperFunctions/redirectHelper";

function LoginScreen(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFailure = (result) => {
    console.log(result);
  };

  const handleGoogleLogin = async (googleData) => {
    fetch("https://localhost:5001/api/user/google-login", {
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
      body: JSON.stringify({
        IdToken: googleData.tokenId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Niepomyslnie");
          response.text().then((response) => {
            setErrorMessage(response);
          });
        }
        return response.json();
      })
      .then((json) => {
        sessionStorage.setItem("token", json);
        var decodedToken = jwt_decode(json);
        var decodedRole =
          decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          var decodedUserId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
          sessionStorage.setItem("role", decodedRole);
          sessionStorage.setItem("id", decodedUserId);
        var route = handleRedirect(decodedRole);
        navigate(route);
        props.updateRole(decodedRole);
        setErrorMessage("");
      })
      .catch((error) => {
        console.log(`Error getting ad data: ${error.message}`);
      });
  };

  const handleLogin = async () => {
    fetch("https://localhost:5001/api/user/login", {
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
      body: JSON.stringify({
        email: login,
        haslo: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Niepomyslnie");
          response.text().then((response) => {
            setErrorMessage(response);
          });
        }
        return response.json();
      })
      .then((json) => {
        sessionStorage.setItem("token", json);
        var decodedToken = jwt_decode(json);
        var decodedRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        var decodedUserId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        sessionStorage.setItem("role", decodedRole);
        sessionStorage.setItem("id", decodedUserId);
        var route = handleRedirect(decodedRole);
        props.updateRole(decodedRole);
        navigate(route);
        setErrorMessage("");
      })
      .catch((error) => {
        console.log(`Error getting ad data: ${error.message}`);
      });
  };

  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt="profile" className="profile" />
            </div>
          </div>
          <div>
            <h1>Login Page</h1>
            <div className="divInput">
              <img src={loginimg} alt="login" className="login" />
              <LoginInput data-testid="login"
                type={"text"}
                placeholder={"Login"}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              ></LoginInput>
            </div>
            <div className="divInput">
              <img src={pass} alt="password" className="login" />
              <LoginInput data-testid="password"
                type={"password"}
                placeholder={"Wprowadź hasło"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></LoginInput>
            </div>
            <div className="login-button">
              <div className="errorMessage">{errorMessage}</div>
              <CustomButton data-testid="loginButton"
                type="submit"
                title={"Zaloguj"}
                onClick={handleLogin}
              ></CustomButton>
                            </div>
              <Link to="/register">
                <CustomButton title={"Zarejestruj"}></CustomButton>
              </Link>
              <div>
                <br></br>
              <div>
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Sign in with Google"
                  onSuccess={handleGoogleLogin}
                  onFailure={handleFailure}
                  cookiePolicy={"single_host_origin"}
                ></GoogleLogin>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
