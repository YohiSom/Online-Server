import React, { useState, useEffect } from "react";

function GetLocation() {
  const [country, setCountry] = useState(null);
  const [error, setError] = useState("");

  const getLocation = async () => {
    const res = await fetch("https://ipapi.co/json/");

    if (res) {
      const data = await res.json();
      setCountry(data.country_name);
    } else {
      setError(
        "Your location cannot be established at the moment! Please try again later!"
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      {country && <div>{country}</div>}
    </div>
  );
}

export default GetLocation;
