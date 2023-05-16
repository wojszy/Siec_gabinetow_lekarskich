import * as React from "react";
import { useState } from "react";
import { Button, View, Text } from "react-native";
import { Link, Navigate } from "react-router-dom";
import CustomButton from "../../components/customButton/customButton";
import MenuButton from "../../components/menuButton/MenuButton";
import LoginInput from "../../components/loginInput/loginInput";
import profile from "../../img/doctors.png";
import LogoutButton from "../../components/logoutButton/logutButton";

function DoctorScreen() {
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
            <Link to="/visitsDoctor">
              <MenuButton title="Zdaj raport z wizyty"></MenuButton>
            </Link>
            <Link to="/prescriptionDoctor">
              <MenuButton title="Wystaw e-recepte"></MenuButton>
            </Link>
            <Link to="/resultDoctor">
              <MenuButton title="Prześlij wyniki badań"></MenuButton>
            </Link>
          </ul>
        </div>

        <div id="page-content-wrapper">
          <div class="container-fluid">
            <h1>Strona główna lekarza</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorScreen;
