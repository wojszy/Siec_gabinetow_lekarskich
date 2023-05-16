import { Navigate, Router, useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  function logout() {
    sessionStorage.clear();
    navigate("/login", { replace: true });
  }

  return (
    <button type={"submit"} className="LogoutButton" onClick={logout}>
      Wyloguj
    </button>
  );
};

export default LogoutButton;
