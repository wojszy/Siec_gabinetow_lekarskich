import * as React from "react";
import { useState, useEffect } from "react";
import { Button, View, Text } from "react-native";
import { Link, Navigate } from "react-router-dom";
import CustomButton from "../../components/customButton/customButton";
import MenuButton from "../../components/menuButton/MenuButton";
import LoginInput from "../../components/loginInput/loginInput";
import profile from "../../img/doctors.png";
import PrescriptionForm from "../../components/prescriptionForm/prescriptionForm";
import LogoutButton from "../../components/logoutButton/logutButton";

function DoctorPrescription() {
  const [data, setData] = useState();
  const [doctor, setDoctor] = useState();

  useEffect(() => {
    var id = sessionStorage.getItem("id");
    getDoctor(`https://localhost:5001/api/doctor/user/${id}`);
    getData("https://localhost:5001/api/patient");
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
  const getDoctor = async (apiUrl) => {
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
            <h1>Strona wystawienia e-recepty</h1>
            <PrescriptionForm patient={data} doctor={doctor}></PrescriptionForm>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorPrescription;
