import "./billsTable.css";
import CustomButton from "../customButton/customButton";
import { Link, Navigate, useNavigate } from "react-router-dom";

const BillsTable = (bills) => {
  const navigate = useNavigate();

  if (bills === undefined) {
    return;
  }
  var array;
  try {
    array = Array.from(bills["bills"]);

    console.log(bills["bills"][0].name);
  } catch {
    console.log("Blad");
  }

  return (
    <>
      <div className="stock-container">
        {array?.map((data, key) => {
          return (
            <div>
              <table className="resultsTable">
                <tr>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Kwota</th>
                </tr>

                <tr>
                  <td>{data.date}</td>
                  <td>{data.status}</td>
                  <td>{data.total}</td>
                  {data.status === "nieopłacona" ? (
                    <button
                      className="payButton"
                      title={"pay"}
                      onClick={() =>
                        navigate("/payment", {
                          state: { amount: data.total, billId: data.billId },
                        })
                      }
                    >
                      Zapłać
                    </button>
                  ) : (
                    <div></div>
                  )}
                </tr>
              </table>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BillsTable;
