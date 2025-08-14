import React, { useEffect, useState } from "react";
import { MyntraApi } from "../Axios/Api";

function Carousal() {
  const [carousal, setCarousal] = useState([]);

  useEffect(() => {
    const data = async () => {
      try {
        const res = await MyntraApi.get("/Slider");
        setCarousal(res.data);
      } catch (error) {
        alert("Error in Fetching");
      }
    };
    data();
  }, []);

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {carousal.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "undefined"}
            aria-label={`slide ${index + 1}}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {carousal.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img src={item.uri} className="d-block w-100" alt="..." />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousal;
