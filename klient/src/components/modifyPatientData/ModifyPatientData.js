//import "./resultsTable.css";

import { useState } from "react";

const ModifyPatientsData = (data) => {
  //const [patientId, setPatientId] = useState();
  const [patientData, setPatientData] = useState();
  const [dataType, setDataType] = useState("name");
  const [userId, setUserId] = useState();
  console.log(data);

  const updateData = async (id) => {
    //var link = ;
    const patchData = [
      { value: patientData, path: "/" + dataType, op: "replace" },
    ];
    try {
      let response = await fetch("https://localhost:5001/api/user/" + id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        method: "PATCH",
        body: JSON.stringify(patchData),
      });
      if (response.status === 200) {
        //setName("");
        //setPassword("");
        console.log("Pomyślnie");
      } else {
        console.log("Niepomyślnie");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (data === undefined) {
    return;
  }
  var array;
  try {
    array = Array.from(data["patients"]);

    console.log(data["patients"][0].user.name);
    console.log("arr " + array);
  } catch {
    console.log("Blad");
  }

  async function openForm() {
    document.getElementById("myForm").style.display = "block";
    console.log("Otworz");
  }
  async function closeForm() {
    document.getElementById("myForm").style.display = "none";
    console.log("zamknij");
  }

  return (
    //<div>{resArray}</div>
    <>
      <div class="form-popup" id="myForm">
        <form class="form-container">
          <h1>Podaj nowe dane</h1>
          <select onChange={(e) => setDataType(e.target.value)}>
            <option value="name" selected>
              imie
            </option>
            <option value="surname">nazwisko</option>
          </select>
          <input
            type="text"
            onChange={(e) => setPatientData(e.target.value)}
          ></input>

          <div className="buttons">
            <button
              type="button"
              onClick={() => {
                console.log("userid? : " + userId);
                updateData(userId);
                window.location.reload();
              }}
            >
              Zapisz
            </button>
            <button type="reset">Wyczyść</button>
            <button type="button" onClick={closeForm}>
              Zamknij
            </button>
          </div>
        </form>
      </div>

      <div className="stock-container">
        {array?.map((data, key) => {
          return (
            <div>
              <a href="#">
                <table className="resultsTable">
                  <tr>
                    <th>ID Pacjenta</th>
                    <th>Imie</th>
                    <th>Nazwisko</th>
                    <button
                      className="open-button"
                      type="button"
                      onClick={() => {
                        setUserId(data.user.userId);
                        openForm();
                      }}
                    >
                      Zmień dane
                    </button>
                  </tr>

                  <tr>
                    <td>{data.patientId}</td>
                    <td>{data.user.name}</td>
                    <td>{data.user.surname}</td>
                  </tr>
                </table>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ModifyPatientsData;
