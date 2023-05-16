import * as React from 'react';
import { useState, useEffect } from 'react'
import { Button, View, Text } from 'react-native';
import { Link, Navigate } from 'react-router-dom';
import CustomButton from '../../components/customButton/customButton';
import MenuButton from '../../components/menuButton/MenuButton';
import LoginInput from '../../components/loginInput/loginInput';
import profile from "../../img/doctors.png" 
import login from "../../img/login-logo.png"
import pass from "../../img/password.png"
import AppointmentTable from '../../components/appointmentTable/AppointmentTable';
import LogoutButton from '../../components/logoutButton/logutButton';

function PatientChangeAppointment() {
  const [ data, setData ] = useState();
  useEffect(() => {
    var id = sessionStorage.getItem("id");
    console.log(id);
    getData(`https://localhost:5001/api/appointment/Patient/${id}`);
},[])
const getData = async (apiUrl) => {

  fetch(apiUrl, {credentials: 'same-origin',headers:{'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
     .then((response) => {
         if (!response.ok) {
             console.log(`Did not get an ok. got: ${response.statusText}`);
         }
         return response.json();
     })
     .then(json => setData(json)) //setData here
     .catch((error) => {
         console.log(`Error getting ad data: ${error.message}`);
     })
}
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
            <Link to="/prescriptionPatient">
            <MenuButton title="Moje e-Recepty" ></MenuButton>
                    </Link>
                    <Link to="/resultsPatient">
                  <MenuButton title="Moje wyniki badań"></MenuButton>
                  </Link>

                  <Link to="/changeAppointmentPatient">
                  <MenuButton title="Zmień termin wizyty"></MenuButton>
                  </Link>
                  <Link to="/payBillPatient">
                  <MenuButton title="Opłać faktury"></MenuButton>
                  </Link>
                
            </ul>
        </div>

        <div id="page-content-wrapper">
            <div class="container-fluid">
                
                  <h1>Strona zmień termin wizyty</h1>
                  <AppointmentTable appointments={data}></AppointmentTable>
            </div>
        </div>

    </div>

    </div>
  )
    }

    export default PatientChangeAppointment;