import React, { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function getClock() {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    }
    getClock();
    const interval = setInterval(getClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const clockStyle = {
    color: "#fff",
    textShadow: "0 0 10px #fff",
    fontSize: "5rem",
    fontWeight: "bold",
    letterSpacing: "2px",
    textAlign: "center",
    margin: "1.5rem 0",
    position: "absolute",
    bottom: "700px",
    left: "250px",
    transform: "translateX(-50%)",
  };

  return <h2 style={clockStyle}>{time}</h2>;
}

export default Clock;
