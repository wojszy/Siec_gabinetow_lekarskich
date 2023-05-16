import { type } from "@testing-library/user-event/dist/type";
import { useState, useEffect } from "react";
import CustomButton from "../customButton/customButton";
const ReceptAddAppo = (props) => {
  const [date, setDate] = useState("");
  const [price, setPrice] = useState();
  const [patientId, setPatientId] = useState();
  const [doctorId, setDoctorId] = useState();
  const [clinicId, setClinicId] = useState();
  const [type, setType] = useState("");
  //  var id=sessionStorage.getItem("id");
  if (props === undefined) {
    return;
  }
  var array;
  try {
    array = Array.from(props.patient);
    //  console.log(id);
    console.log(props.patient["patient"][0].patientId);
  } catch {
    console.log("Blad");
  }

  if (props === undefined) {
    return;
  }
  var arrayDoc;
  try {
    arrayDoc = Array.from(props.doctor);
    //  console.log(id);
    console.log(props.patient.doctor["doctor"][0].DoctorId);
  } catch {
    console.log("Blad");
  }
  const createAppointment = async () => {
    try {
      let response = await fetch("https://localhost:5001/api/appointment", {
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        method: "POST",
        body: JSON.stringify({
          date: date,
          price: price,
          patientId: patientId,
          doctorId: doctorId,
          clinicId: clinicId,
          //TO DO :) w sesji jest userId a nie receptionistId
        }),
      });
      if (response.status === 200) {
        console.log("Pomyślnie");
      } else {
        console.log("Niepomyślnie");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputPatient = (event) => {
    setPatientId(event.target.value);
  };
  const handleInputDoctor = (event) => {
    setDoctorId(event.target.value);
  };
  return (
    <div>
      <form>
        <p>Wybierz pacjenta:</p>
        <select id="pacjenci" onChange={handleInputPatient}>
          <option value="" selected disabled hidden>
            Wybierz pacjenta
          </option>
          {array?.map((data, key) => {
            return (
              <option value={data.patientId}>
                {data.user.name} {data.user.surname}
              </option>
            );
          })}
        </select>

        <p> Wybierz lekarza</p>
        <select id="lekarze" onChange={handleInputDoctor}>
          <option value="" selected disabled hidden>
            Wybierz lekarza
          </option>
          {arrayDoc?.map((datad, key) => {
            return (
              <option value={datad.doctorId}>
                {datad.worker.user.name} {datad.worker.user.surname}{" "}
              </option>
            );
          })}
        </select>

        <p>Wybierz termin wizyty:</p>
        <input type="date" onChange={(e) => setDate(e.target.value)}></input>
        <tr></tr>

        <p>Wpisz kwote wizyty:</p>
        <input
          type="number"
          min="0"
          onChange={(e) => setPrice(e.target.value)}
        ></input>

        <p> Wpisz typ wizyty:</p>
        <input type="text" onChange={(e) => setType(e.target.value)}></input>
        <tr></tr>
        <tr></tr>
        <p>Wybierz gabinet</p>
        <select id="gabinety" onChange={(e) => setClinicId(e.target.value)}>
          <option value="" selected disabled hidden>
            Wybierz gabinet
          </option>
          <option value={1}>Stomatologiczny</option>;
          <option value={2}>Kardiologiczny</option>;
          <option value={3}>Zabiegowy</option>;
          <option value={4}>Okulistyczny</option>;
        </select>
        <tr></tr>
        <br></br>
        <div>
          <CustomButton
            type="button"
            title={"Umów"}
            onClick={() => {
              createAppointment();
              window.location.reload();
            }}
          ></CustomButton>
        </div>
      </form>
    </div>
  );
};

export default ReceptAddAppo;
