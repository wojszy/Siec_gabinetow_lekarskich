import "../../screen/DoctorScreens/DoctorPrescription";

import CustomButton from "../customButton/customButton";
import { useState } from "react";

const ResultForm = (props) => {
  const [patientId, setPatientId] = useState();

  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");

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

  const createResult = async () => {
    try {
      let response = await fetch("https://localhost:5001/api/result", {
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        method: "POST",
        body: JSON.stringify({
          date: date,
          type: type,
          patientId: patientId,
          description: desc,

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
        <p>Wpisz opis: </p>
        <input
          type="text"
          placeholder="Opis"
          onChange={(e) => setDesc(e.target.value)}
        ></input>
        <p>Wybierz datę badania</p>
        <input type="date" onChange={(e) => setDate(e.target.value)}></input>
        <p>Wpisz typ badania:</p>
        <input
          type="text"
          placeholder="Typ badania"
          onChange={(e) => setType(e.target.value)}
        ></input>
        <div>
          <br></br>
          <CustomButton
            type="subimt"
            title={"Prześlij"}
            onClick={createResult}
          ></CustomButton>
        </div>
      </form>
    </div>
  );
};

export default ResultForm;
