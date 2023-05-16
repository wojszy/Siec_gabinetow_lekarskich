import { useState } from "react";
import "./changeSalary.css";

const ChangeSalary = (worker) => {
  const [salary, setSalary] = useState("");
  const [workId, setWorkId] = useState();
  const updateSalary = async (id) => {
    //var link = ;
    const data = [{ value: salary, path: "/salary", op: "replace" }];
    try {
      let response = await fetch("https://localhost:5001/api/worker/" + id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        method: "PATCH",
        body: JSON.stringify(data),
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
  console.log(worker);
  if (worker === undefined) {
    return;
  }
  var array;
  try {
    array = Array.from(worker["worker"]);

    // console.log(worker["worker"][0].name);
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
          <h1>Wpisz kwote wynagrodzenia</h1>
          <input
            type="number"
            min="0"
            onChange={(e) => setSalary(e.target.value)}
          ></input>

          <div className="buttons">
            <button
              type="button"
              onClick={() => {
                updateSalary(workId);
                closeForm();
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
          if (data.salary == null) return (data.salary = "-");

          return (
            <>
              <div>
                <table className="resultsTable">
                  <tr>
                    <th>Id pracownika</th>
                    <th>Imie</th>
                    <th>Nazwisko</th>
                    <th>Wynagrodzenie</th>
                    <th>Rola</th>
                    <button
                  className="open-button"
                  type="button"
                  onClick={() => {
                    setWorkId(data.workerId);
                    openForm();
                    
                  }}
                >
                  Zmień wynagrodzenie
                </button>
                  </tr>

                  <tr>
                    <td>{data.workerId}</td>
                    <td>{data.user.name}</td>
                    <td>{data.user.surname}</td>
                    <td>{data.salary}</td>
                    <td>{data.user.role.name}</td>
                  </tr>
                </table>
              </div>



            </>
          );
        })}
      </div>
    </>
  );
};

export default ChangeSalary;
