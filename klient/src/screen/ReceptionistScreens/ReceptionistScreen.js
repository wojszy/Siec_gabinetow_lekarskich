import * as React from "react";
import { useState } from "react";
import { Button, View, Text } from "react-native";
import { Link, Navigate } from "react-router-dom";
import CustomButton from "../../components/customButton/customButton";
import MenuButton from "../../components/menuButton/MenuButton";
import LoginInput from "../../components/loginInput/loginInput";
import profile from "../../img/doctors.png";
import LogoutButton from "../../components/logoutButton/logutButton";
//import LogoutButton from "../../components/logoutButton/logutButton";
//import Menu from "react-select/dist/declarations/src/components/Menu";

function ReceptionistScreen() {
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
            <Link to="/patientDataReceptionist">
              <MenuButton title="Modyfikuj dane o pacjencie"></MenuButton>
            </Link>
            <Link to="/addAppointmentReceptionist">
              <MenuButton title="Umów pacjenta"></MenuButton>
            </Link>
            <Link to="/billReceptionist">
              <MenuButton title="Wystaw fakturę"></MenuButton>
            </Link>
            <Link to="/changeBillStatus">
              <MenuButton title="Zmien stan faktury"></MenuButton>
            </Link>
          </ul>
        </div>

        <div id="page-content-wrapper">
          <div class="container-fluid">
            <h1>Strona recepcjonisty</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceptionistScreen;
