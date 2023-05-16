import "./salaryChange.css";
import CustomButton from "../customButton/customButton";
import { Link, Navigate } from "react-router-dom";

const SalaryChange = (worker) => {
  console.log(bills);
  if (bills === undefined) {
    return;
  }
  var array;
  try {
    array = Array.from(worker["worker"]);

    console.log(bills["worker"][0].name);
  } catch {
    console.log("Blad");
  }

  return (
    //<div>{resArray}</div>
    <>
      <div className="stock-container">
        {array?.map((data, key) => {
          return (
            <div>

              <table className="salaryTable">
                <tr>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Kwota</th>
                </tr>

                <tr>
                  <td>{data.date}</td>
                  <td>{data.status}</td>
                  <td>{data.total}</td>
                  <Link to="/payment">
              <button className="payButton" title={"pay"}>Zapłać</button>
              
            </Link>

                </tr>
              </table>

            </div>
          );
        })}
      </div>
    </>
  );
};

export default SalaryChange