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
function RegisterScreenManager() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState(2);
  const navigate = useNavigate();
  const handleRegister = async () => {
    fetch("https://localhost:5001/api/user/register", {
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
        idUprawnien: role,
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
        navigate("/registerManager");
      })
      .catch((error) => {
        console.log(`Error getting ad data: ${error.message}`);
      });
  };
  const handleInput = (event) => {
    // if (event.target.value == "Recepcjonista") {
    //   setRole(2);
    // }
    // if (event.target.value == "Lekarz") {
    //   setRole(3);
    // } else {
    //   setRole(4);
    // }
    console.log(event.target.value);
    setRole(event.target.value);
  };

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
            <div>
              <span>Wybierz role </span>
              <select id="role" onChange={handleInput}>
                <option value="" selected disabled hidden>
                  Wybierz
                </option>
                <option value={2}>Recepcjonista</option>
                <option value={3}>Lekarz</option>
                <option value={4}>Manager</option>
              </select>
            </div>
            <div className="errorMessage">{errorMessage}</div>
            <Link to="/registerScreenManager">
              <CustomButton
                type="submit"
                title={"Zarejestruj"}
                onClick={handleRegister}
              ></CustomButton>
              <br></br>
            </Link>
            <Link to="/registerManager">
              <CustomButton title={"Wróć"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreenManager;
