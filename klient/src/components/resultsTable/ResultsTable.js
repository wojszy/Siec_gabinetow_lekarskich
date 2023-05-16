import { useState } from "react";
import "./resultsTable.css";

const ResultsTable = (results) => {
  const [resultId, setResultId] = useState();
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  
  console.log(results);
  if (results === undefined) {
    return;
  }
  var array;
  try {
    array = Array.from(results["results"]);

    console.log(results["results"][0].name);
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
      <div class="results-form-popup" id="myForm">
        <form class="results-form-container">
          <h1>Szczegóły wizyty</h1>
          <table className="form-resultsTable">
            <tr>
              <th>Data</th>
              <th>Typ</th>
              <th>Opis</th>
            </tr>
            <tr>
              <td>{date}</td>
              <td>{type}</td>
              <td>{desc}</td>
            </tr>
          </table>
          <div>
            <br></br>
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
                    <th>ID wyniku</th>
                    <th>Data</th>
                    <th>Typ</th>
                    <button
                      className="open-button"
                      type="button"
                      onClick={() => {
                        setResultId(data.resultId);
                        setDate(data.date);
                        setDesc(data.description);
                        setType(data.type);
                        openForm();
                      }}
                    >
                      Wyświetl szczegóły
                    </button>
                  </tr>

                  <tr>
                    <td>{data.resultId}</td>
                    <td>{data.date}</td>
                    <td>{data.type}</td>
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

export default ResultsTable;
