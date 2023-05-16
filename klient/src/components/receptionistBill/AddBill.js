import "./addBill.css";
import { useState, useEffect } from "react";
import CustomButton from "../customButton/customButton";

const AddBill = (patient) => {
  const [date, setDate] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState("");
  const [patientId, setPatientId] = useState("");
  const [receptionist, setReceptionist] = useState("");
  var id = sessionStorage.getItem("id");

  useEffect(() => {
    var id = sessionStorage.getItem("id");
    getReceptionist(`https://localhost:5001/api/receptionist/user/${id}`);
  }, []);
  const getReceptionist = async (apiUrl) => {
    fetch(apiUrl, { credentials: "same-origin",headers:{ Authorization: `Bearer ${sessionStorage.getItem('token')}`} })
      .then((response) => {
        if (!response.ok) {
          console.log(`Did not get an ok. got: ${response.statusText}`);
        }
        return response.json();
      })
      .then((json) => setReceptionist(json)) //setData here
      .catch((error) => {
        console.log(`Error getting ad data: ${error.message}`);
      });
  };
  if (patient === undefined) {
    return;
  }
  var array;
  try {
    array = Array.from(patient["patient"]);

  } catch {
    console.log("Blad");
  }

  const createBill = async () => {
    try {
      let response = await fetch("https://localhost:5001/api/bill", {
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        method: "POST",
        body: JSON.stringify({
          date: date,
          total: total,
          status: status,
          patientId: patientId,
          receptionistId: receptionist.receptionistId,
        }),
      });
      if (response.status === response.status.ok) {
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
    <div >
      <form>
      <p>Wybierz pacjenta</p>
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
        <p>Data wystawienia:</p>
        <input type="date" onChange={(e) => setDate(e.target.value)}></input>
        <tr></tr>
        <p> Wpisz kwote:</p>
        <input type="number" onChange={(e) => setTotal(e.target.value)}></input>
        <tr></tr>
        <p>Wpisz status faktury:</p>
        <select id="status" onChange={(e) => setStatus(e.target.value)}>
        <option value="" selected disabled hidden>
           wybierz status
          </option>
          <option value="opłacona">opłacona</option>;
          <option value="nieopłacona">nieopłacona</option>;
        </select>
        
        <div>
        <br></br>
          <CustomButton
            type="button"
            title={"Wystaw"}
            onClick={createBill}
          ></CustomButton>
        </div>
      </form>
    </div>
  );
};

export default AddBill;
