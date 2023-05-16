import * as React from "react";
import { useState, useEffect } from "react";
import { Button, View, Text } from "react-native";
import { Link, Navigate } from "react-router-dom";
import CustomButton from "../../components/customButton/customButton";
import MenuButton from "../../components/menuButton/MenuButton";
import LoginInput from "../../components/loginInput/loginInput";
import profile from "../../img/doctors.png";
import LogoutButton from "../../components/logoutButton/logutButton";
import ModifyEmployeeData from "../../components/modifyEmployeeData/ModifyEmployeeData";

function ManagerEmployeeData() {
  const [data, setData] = useState("");
  useEffect(() => {
    getData(`https://localhost:5001/api/worker`);
  }, []);
  const getData = async (apiUrl) => {
    fetch(apiUrl, {
      credentials: "same-origin",
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(`Did not get an ok. got: ${response.statusText}`);
        }
        return response.json();
      })
      .then((json) => setData(json)) //setData here
      .catch((error) => {
        console.log(`Error getting ad data: ${error.message}`);
      });
  };
  return (
    <div>
      <div class="header">
        <img src={profile} alt="profile" />
        <h1>Sieć gabinetów lekarskich</h1>
        <LogoutButton></LogoutButton>
      </div>
      <div id="wrapper" class="toggled">
        {/* <!-- Sidebar --> */}
        <div id="sidebar-wrapper">
          <ul class="sidebar-nav">
            <Link to="/graphicManager">
              <MenuButton title="Stwórz grafik"></MenuButton>
            </Link>
            <Link to="/employeeDataManager">
              <MenuButton title="Zarządzaj pracownikami"></MenuButton>
            </Link>
            <Link to="/salaryManager">
              <MenuButton title="Wynagrodzenia pracowników"></MenuButton>
            </Link>
            <Link to="/registerManager">
              <MenuButton title="Rejestrowanie pracownikow"></MenuButton>
            </Link>
          </ul>
        </div>

        <div id="page-content-wrapper">
          <div class="container-fluid">
            <h1>Strona zarządzania danymi pracowników</h1>
          </div>
          <ModifyEmployeeData employees={data}></ModifyEmployeeData>
        </div>
      </div>
    </div>
  );
}

export default ManagerEmployeeData;
