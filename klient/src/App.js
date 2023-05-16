import "./App.css";
import "./Style.css";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import PatientScreen from "./screen/PatientScreens/PatientScreen";
import PrescriptionScreen from "./screen/PatientScreens/PrescriptionScreen";
import ManagerScreen from "./screen/ManagerScreens/ManagerScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PatientResults from "./screen/PatientScreens/PatientResults";
import PatientChangeAppointment from "./screen/PatientScreens/PatientChangeAppointment";
import PatientPayBill from "./screen/PatientScreens/PatientPayBill";
import ManagerGraphic from "./screen/ManagerScreens/ManagerGraphic";
import ManagerEmployeeData from "./screen/ManagerScreens/ManagerEmployeeData";
import ManagerSalary from "./screen/ManagerScreens/ManagerSalary";
import ReceptionistAddAppointment from "./screen/ReceptionistScreens/ReceptionistAddAppointment";
import ReceptionistPatientData from "./screen/ReceptionistScreens/ReceptionistPatientData";
import ReceptionistBill from "./screen/ReceptionistScreens/ReceptionistBill";
import ReceptionistScreen from "./screen/ReceptionistScreens/ReceptionistScreen";
import DoctorVisits from "./screen/DoctorScreens/DoctorVisits";
import DoctorScreen from "./screen/DoctorScreens/DoctorScreens";
import DoctorPrescription from "./screen/DoctorScreens/DoctorPrescription";
import Checkout from "./components/StripePayment/Checkout";
import PaymentSuccess from "./components/paymentResult/PaymentSuccess";
import PaymentFailed from "./components/paymentResult/PaymentFailed";
import ManagerRegister from "./screen/ManagerScreens/ManagerRegister";
import RegisterScreenManager from "./screen/RegisterScreenManager";
import ReceptionistManageBills from "./screen/ReceptionistScreens/ReceptionistManageBills";
import { handleRedirect } from "./helperFunctions/redirectHelper";
import { useState } from "react";
import DoctorResults from "./screen/DoctorScreens/DoctorResults";

function App() {
  var initialRole = sessionStorage.getItem("role");
  const [role, setRole] = useState(initialRole);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginScreen updateRole={setRole} />} />
        <Route path="register" element={<RegisterScreen />} />
        <Route path="login" element={<LoginScreen updateRole={setRole} />} />
        <Route
          path="patient"
          element={
            role === "Patient" ? (
              <PatientScreen />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />
        <Route
          path="prescriptionPatient"
          element={
            role === "Patient" ? (
              <PrescriptionScreen />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />
        <Route
          path="resultsPatient"
          element={
            role === "Patient" ? (
              <PatientResults />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />

        <Route
          path="changeAppointmentPatient"
          element={
            role === "Patient" ? (
              <PatientChangeAppointment />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />
        <Route
          path="payBillPatient"
          element={
            role === "Patient" ? (
              <PatientPayBill />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />
        <Route
          path="manager"
          element={
            role === "Manager" ? (
              <ManagerScreen />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />
        <Route
          path="graphicManager"
          element={
            role === "Manager" ? (
              <ManagerGraphic />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />
        <Route
          path="employeeDataManager"
          element={
            role === "Manager" ? (
              <ManagerEmployeeData />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />
        <Route
          path="salaryManager"
          element={
            role === "Manager" ? (
              <ManagerSalary />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />
        <Route
          path="receptionist"
          element={
            role === "Receptionist" ? (
              <ReceptionistScreen />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />
        <Route
          path="patientDataReceptionist"
          element={
            role === "Receptionist" ? (
              <ReceptionistPatientData />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />

        <Route
          path="addAppointmentReceptionist"
          element={
            role === "Receptionist" ? (
              <ReceptionistAddAppointment />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />
        <Route
          path="billReceptionist"
          element={
            role === "Receptionist" ? (
              <ReceptionistBill />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />
        <Route
          path="visitsDoctor"
          element={
            role === "Doctor" ? (
              <DoctorVisits />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />
        <Route
          path="resultDoctor"
          element={
            role === "Doctor" ? (
              <DoctorResults />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />

        <Route
          path="doctor"
          element={
            role === "Doctor" ? (
              <DoctorScreen />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />
        <Route
          path="prescriptionDoctor"
          element={
            role === "Doctor" ? (
              <DoctorPrescription />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />
        <Route path="payment" element={<Checkout />} />
        <Route path="success=true" element={<PaymentSuccess />} />
        <Route path="success=false" element={<PaymentFailed />} />
        <Route
          path="registerManager"
          element={
            role === "Manager" ? (
              <ManagerRegister />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />
        <Route
          path="registerScreenManager"
          element={
            role === "Manager" ? (
              <RegisterScreenManager />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />
        <Route
          path="changeBillStatus"
          element={
            role === "Receptionist" ? (
              <ReceptionistManageBills />
            ) : (
              <Navigate to={handleRedirect(role)} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
