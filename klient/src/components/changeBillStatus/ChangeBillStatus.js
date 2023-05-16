//import "./resultsTable.css";

import { useState } from "react";

const ModifyPatientsData = (data) => {
  //const [patientData, setBillStatus] = useState();
  const [billStatus, setBillStatus] = useState("");
  const [billId, setBillId] = useState();
  console.log(data);

  const updateData = async (id) => {
    const patchData = [{ value: billStatus, path: "/status", op: "replace" }];
    try {
      let response = await fetch("https://localhost:5001/api/bill/" + id, {
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
    array = Array.from(data["bills"]);

    //console.log(data["patients"][0].user.name);
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
    <>
      <div class="form-popup" id="myForm">
        <form class="form-container">
          <h1>Zmień status faktury</h1>
          <select onChange={(e) => setBillStatus(e.target.value)}>
            <option value="" selected disabled hidden>
              Wybierz status
            </option>
            <option value="oplacona">Opłacona</option>
            <option value="nieopłacona">Nieopłacona</option>
          </select>

          <div className="buttons">
            <button
              type="button"
              onClick={() => {
                //billId;
                //console.log("userid? : " + );
                updateData(billId);
                window.location.reload();
              }}
            >
              Zapisz
            </button>
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
                    <th>ID Faktury</th>
                    <th>Data wystawienia</th>
                    <th>Kwota</th>
                    <th>Status</th>
                    <th>ID Pacjenta</th>
                    <button
                      className="open-button"
                      type="button"
                      onClick={() => {
                        setBillId(data.billId);
                        openForm();
                      }}
                    >
                      Zmień status
                    </button>
                  </tr>

                  <tr>
                    <td>{data.billId}</td>
                    <td>{data.date}</td>
                    <td>{data.total}</td>
                    <td>{data.status}</td>
                    <td>{data.patientId}</td>
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
