import * as React from "react";
import { useState } from "react";
import { Button, View, Text } from "react-native";
import { Link, Navigate } from "react-router-dom";
import CustomButton from "../../components/customButton/customButton";
import MenuButton from "../../components/menuButton/MenuButton";
import LoginInput from "../../components/loginInput/loginInput";
import LogoutButton from "../../components/logoutButton/logutButton";
import profile from "../../img/doctors.png";

function ManagerRegister() {
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
            <h1>Strona rejestracji pracownikow</h1>
          </div>
          <Link to="/registerScreenManager">
            <CustomButton type="submit" title={"Zarejestruj"}></CustomButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ManagerRegister;
