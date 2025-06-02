import { useState } from "react";

function Weather() {
  const WeatherStyle = {
    color: "#fff",
    textShadow: "0 0 10px #fff",
    fontSize: "1.3rem",
    fontWeight: "bold",
    letterSpacing: "2px",
    textAlign: "center",
    margin: "1.5rem 0",
    position: "absolute",
    bottom: "600px",
    right: "100px",
    transform: "translateX(-50%)",
  };
  const [info, setInfo] = useState(null);
  const API_KEY = "ca764b7bc4d8f2c6b4de03157e6544eb";

  function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInfo({
          description: data.weather[0].description,
          temp: data.main.temp,
          city: data.name,
          icon: data.weather[0].icon,
        });
      });
  }

  function onGeoError() {
    setInfo({ error: "위치 정보를 찾을 수 없읍니다." });
  }

  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  return (
    <div className="weather" style={WeatherStyle}>
      {info ? (
        info.error ? (
          <p>{info.error}</p>
        ) : (
          <>
            <div>
              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${info.icon}@2x.png`}
                  alt={`${info.description}`}
                />
              </div>
              <span>{info.city}</span>
              <br />
              <span>{info.temp}</span>
              <br />
              <span>{info.description}</span>
            </div>
          </>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Weather;
