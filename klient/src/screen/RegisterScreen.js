import * as React from "react";
import { useState } from "react";
import { Button, View, Text } from "react-native";
import { Link, Navigate } from "react-router-dom";
import CustomButton from "../components/customButton/customButton";
import LoginInput from "../components/loginInput/loginInput";
import profile from "../img/doctors.png";
import loginimg from "../img/login-logo.png";
import person from "../img/person.png";
import pass from "../img/password.png";
import { useNavigate } from "react-router-dom";

function RegisterScreen() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function register(uprawnienia) {
    let response = await fetch("https://localhost:5001/api/user/register", {
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
      body: JSON.stringify({
        email: login,
        haslo: password,
        imie: name,
        nazwisko: surname,
        idUprawnien: 1,
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
        setErrorMessage("Pomyślnie zarejestrowano");
        navigate("/login");
      })
      .catch((error) => {
        console.log(`Error getting ad data: ${error.message}`);
      });
  }

  return (
    <div className="main">
      <div className="register-sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt="profile" className="profile" />
            </div>
          </div>
          <div>
            <h1>Register Page</h1>
            <div>
              <img src={loginimg} alt="login" className="login" />
              <LoginInput
                type={"text"}
                placeholder={"Login"}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              ></LoginInput>
            </div>
            <div className="divInput">
              <img src={pass} alt="password" className="login" />
              <LoginInput
                type={"password"}
                placeholder={"Wprowadź hasło"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></LoginInput>
            </div>

            <div className="divInput">
              <img src={person} alt="person" className="login" />
              <LoginInput
                type={"text"}
                placeholder={"Wprowadź imie"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></LoginInput>
            </div>
            <div className="divInput">
              <img src={person} alt="person" className="login" />
              <LoginInput
                type={"text"}
                placeholder={"Wprowadź nazwisko"}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              ></LoginInput>
            </div>
            <div className="errorMessage">{errorMessage}</div>
            <Link to="/register">
              <CustomButton
                type="submit"
                title={"Zarejestruj"}
                onClick={register}
              ></CustomButton>
            </Link>
            <br></br>
            <Link to="/login">
              <CustomButton title={"Wróć"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
