//import "./resultsTable.css";

import { useState } from "react";

const ModifyEmployeeData = (data) => {
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

  const deleteEmployee = async (id) => {
    console.log("id test : " + id);
    //var link = ;
    //const element = document.querySelector("#delete-request .status");
    try {
      let response = await fetch("https://localhost:5001/api/user/" + id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        method: "DELETE",
        //body: JSON.stringify(patchData),
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
    array = Array.from(data["employees"]);

    console.log(data["employees"][0].user.name);
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

  function confirmDelete(id) {
    let confirmAction = window.confirm(
      "Czy na pewno chcesz usunąć tego użytkownika? "
    );
    if (confirmAction) {
      deleteEmployee(id);
      alert("Usunięto");
      window.location.reload();
    } else {
      alert("Anulowano usuwanie");
    }
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
          <br></br>
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
                    <th>ID Pracownika</th>
                    <th>Imie</th>
                    <th>Nazwisko</th>
                    <th>Stanowisko</th>
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
                    <td>{data.workerId}</td>
                    <td>{data.user.name}</td>
                    <td>{data.user.surname}</td>
                    <td>{data.user.role.name}</td>
                    <button
                      className="open-button"
                      type="button"
                      onClick={() => {
                        setUserId(data.user.userId);
                        console.log(userId);
                        // deleteEmployee(userId);
                        confirmDelete(data.user.userId);
                        // deleteEmployee(userId);
                      }}
                    >
                      Usuń pracownika
                    </button>
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

export default ModifyEmployeeData;
