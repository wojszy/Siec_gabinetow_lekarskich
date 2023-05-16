import "../../screen/DoctorScreens/DoctorPrescription";
import "./addDutyForm.css";
import CustomButton from "../customButton/customButton";
import { useState, useEffect } from "react";

const AddDutyForm = (props) => {
  const [date, setDate] = useState("");
  const [workerId, setWorkerId] = useState();
  const [manager, setManager] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    var id = sessionStorage.getItem("id");
    getManger(`https://localhost:5001/api/manager/user/${id}`);
  }, []);

  const getManger = async (apiUrl) => {
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
      .then((json) => setManager(json)) //setData here
      .catch((error) => {
        console.log(`Error getting ad data: ${error.message}`);
      });
  };

  if (props === undefined) {
    return;
  }
  var array;
  try {
    array = Array.from(props.worker);
  } catch {
    console.log("Blad");
  }

  const createDuty = async () => {
    fetch("https://localhost:5001/api/duty", {
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      },
      method: "POST",
      body: JSON.stringify({
        date: date,
        workerId: workerId,
        managerId: manager.managerId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Niepomyslnie");
          response.text().then((response) => {
            setErrorMessage("Wystąpił bład podczas dodawania grafiku");
          });
        }
        return response.json();
      })
      .then((json) => {
        setErrorMessage("Dodano grafik");
      })
      .catch((error) => {
        console.log(`Error getting ad data: ${error.message}`);
      });
  };

  return (
    <div>
      <form>
        <span>
          {" "}
          Pracownik: <br />{" "}
        </span>
        <select
          id="pracownicy"
          data-testid="selekt"
          onChange={(e) => setWorkerId(e.target.value)}
        >
          <option data-testid="optionSelect" value="" selected disabled hidden>
            Wybierz pracownika
          </option>

          {array?.map((data, key) => {
            return (
              <option value={data.workerId}>
                {data.user.name} {data.user.surname}
              </option>
            );
          })}
        </select>
        <tr></tr>
        <span></span>
        <input type="date" onChange={(e) => setDate(e.target.value)}></input>
        <div className="errorMessage">
          <br></br>
          {errorMessage}
        </div>
        <div>
          <CustomButton
            data-testid="apply"
            type="button"
            title={"Wystaw"}
            onClick={createDuty}
          ></CustomButton>
        </div>
      </form>
    </div>
  );
};

export default AddDutyForm;
