import * as React from "react";
import { useState, useEffect } from "react";
import { Button, View, Text } from "react-native";
import { Link, Navigate } from "react-router-dom";
import CustomButton from "../../components/customButton/customButton";
import MenuButton from "../../components/menuButton/MenuButton";
import LoginInput from "../../components/loginInput/loginInput";
import profile from "../../img/doctors.png";
import LogoutButton from "../../components/logoutButton/logutButton";
import ReceptAddAppo from "../../components/recepAddAppo/ReceptAddAppo";

function ReceptionistAddAppointment() {
  const [data, setData] = useState();
  const [datad, setDoctor] = useState();
  useEffect(() => {
    getData("https://localhost:5001/api/patient");
  }, []);
  useEffect(() => {
    getDoctor("https://localhost:5001/api/doctor");
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
  const getDoctor = async (doctorUrl) => {
    fetch(doctorUrl, {
      credentials: "same-origin",
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(`Did not get an ok. got: ${response.statusText}`);
        }
        return response.json();
      })
      .then((json) => setDoctor(json)) //setData here
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
            <h1>Strona umawiania pacjenta na wizytę</h1>
            <ReceptAddAppo patient={data} doctor={datad}></ReceptAddAppo>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceptionistAddAppointment;
