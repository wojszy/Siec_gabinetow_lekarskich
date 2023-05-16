import { useState } from "react";
import "./appointmentTable.css";

const AppointmentTable = (appointments) => {
  const [date, setDate] = useState("");
  const [appId, setAppId] = useState();
  const updateDate = async (id) => {
    //var link = ;
    const data = [{ value: date, path: "/date", op: "replace" }];
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
  console.log(appointments);
  if (appointments === undefined) {
    return;
  }
  var array;
  try {
    array = Array.from(appointments["appointments"]);

    console.log(appointments["appointments"][0].appointmentId);
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
          <h1>Wybierz termin nowej wizyty</h1>
          <input type="date" onChange={(e) => setDate(e.target.value)}></input>

          <div className="buttons">
            <button
              type="button"
              onClick={() => {
                updateDate(appId);
                window.location.reload();
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
          if (data.description == null) data.description = "-";
          return (
            <div>
              <table data-testid="table" className="appointmentTable">
                <tr>
                  <th>Data</th>
                  <th>Lekarz</th>
                  <th>Opis</th>
                </tr>

                <tr>
                  <td>{data.date}</td>
                  <td>
                    {data.doctor.worker.user.name}{" "}
                    {data.doctor.worker.user.surname}
                  </td>
                  <td>{data.description}</td>
                  <button
                    className="open-button"
                    type="button"
                    onClick={() => {
                      setAppId(data.appointmentId);
                      openForm();
                    }}
                  >
                    Zmień termin
                  </button>
                </tr>
              </table>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AppointmentTable;
