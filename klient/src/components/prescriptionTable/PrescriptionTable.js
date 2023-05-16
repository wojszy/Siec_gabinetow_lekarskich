import "./prescriptionTable.css";

const PrescriptionTable = (prescriptions) => {
  if (prescriptions === undefined) {
    return;
  }
  var array;
  try {
    array = Array.from(prescriptions["prescriptions"]);

    console.log(prescriptions["prescriptions"][0].name);
  } catch {
    console.log("Blad");
  }

  return (
    //<div>{resArray}</div>

      <div className="stock-container">
        {array?.map((data, key) => {
          return (
            <div>
              <table className="resultsTable">
                <tr>
                  <th>ID recepty</th>
                  <th>Imie pacjenta</th>
                  <th>Nazwisko pacjenta</th>
                  <th>Lek</th>
                </tr>

                <tr>
                  <td>{data.prescriptionId}</td>
                  <td>{data.patient.user.name}</td>
                  <td>{data.patient.user.surname}</td>
                  <td>{data.medicine}</td>
                </tr>
              </table>
            </div>
          );
        })}
      </div>

  );
};

export default PrescriptionTable;
