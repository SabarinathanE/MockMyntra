import React from "react";
import "./Error.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

function Error() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="container-err">
      <h1>404</h1>
      <h4>Requested Page not Found 🥺</h4>
      <button onClick={() => navigate("/")}>Return to the Main Page</button>
    </div>
    </>
  );
}

export default Error;
