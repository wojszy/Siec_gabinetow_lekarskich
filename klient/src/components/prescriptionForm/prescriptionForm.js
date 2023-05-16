import "../../screen/DoctorScreens/DoctorPrescription";
import "./prescriptionForm.css";
import CustomButton from "../customButton/customButton";
import { useState } from "react";

const PrescriptionForm = (props) => {
  const [medicine, setMedicine] = useState("");
  const [patientId, setPatientId] = useState("");
  if (props === undefined) {
    return;
  }
  var array;
  try {
    array = Array.from(props.patient);

    console.log(props.patient["patient"][0].patientId);
  } catch {
    console.log("Blad");
  }

  if (props === undefined) {
    return;
  }


  const createPrescription = async () => {
    try {
      let response = await fetch("https://localhost:5001/api/prescription", {
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        method: "POST",
        body: JSON.stringify({
          medicine: medicine,
          patientId: patientId,
          //TO DO :)
          doctorId: props.doctor.doctorId,
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
  const handleInput = (event) => {
    setPatientId(event.target.value);
  };

  return (
    <div>
      <form>
        <p>Wybierz pacjenta </p>
        <select id="pacjenci" onChange={handleInput}>
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

        <tr></tr>
        <p>Wpisz lek: </p>
        <input
          data-testid="input"
          type="text"
          placeholder="Lek"
          onChange={(e) => setMedicine(e.target.value)}
        ></input>
        <div>
          <br></br>
          <CustomButton
            type="subimt"
            title={"Wystaw"}
            onClick={createPrescription}
          ></CustomButton>
        </div>
      </form>
    </div>
  );
};

export default PrescriptionForm;
