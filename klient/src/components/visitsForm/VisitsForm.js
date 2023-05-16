import "./visitsForm.css";
import { useState } from "react";

const VisitsForm = (visits) => {
  const [description, setDescription] = useState("");
  const [appId, setAppId] = useState();
  if (visits === undefined) {
    return;
  }
  var array;
  try {
    array = Array.from(visits["visits"]);

    console.log(visits["visits"][0].name);
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

  const updateDescription = async (id) => {
    //var link = ;
    const data = [{ value: description, path: "/description", op: "replace" }];
    try {
      let response = await fetch(
        "https://localhost:5001/api/appointment/" + id,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          method: "PATCH",
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log(description);
        console.log("Pomyślnie");
      } else {
        console.log("Niepomyślnie");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div class="form-popup" id="myForm">
        <form class="form-container">
          <h1>Dodaj treść raportu</h1>

          <textarea
            placeholder={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="buttons">
            <button
              type="button"
              onClick={() => {
                updateDescription(appId);
                closeForm();
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

      <div>
        {array?.map((data, key) => {
          return (
            <div>
              <table className="formVisit">
                <tr>
                  <th>ID Wizyty</th>
                  <th>Data</th>
                  <th>ID pacjenta</th>
                </tr>
                <tr>
                  <td>{data.appointmentId}</td>
                  <td>{data.date}</td>
                  <td>{data.patientId}</td>
                  <button
                    className="open-button"
                    type="button"
                    onClick={() => {
                      setAppId(data.appointmentId);
                      openForm();
                    }}
                  >
                    Zdaj raport
                  </button>
                </tr>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VisitsForm;
