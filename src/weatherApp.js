import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = 'cf3ce77b94eb470e861204311240107';

  const fetchWeather = () => {
    if (city.trim() === '') {
            alert('Please enter a city name.');
            return;
          }
    setLoading(true);
    setError(null);
    setWeather(null); // Clear previous weather data
      axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then(response => {
          setWeather(response.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setError('Failed to fetch weather data');
          alert('Failed to fetch weather data');
        });
      };

  return (
    <div>
        <input 
              type="text" 
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
              placeholder="Enter city name"/>
        <button onClick={fetchWeather}>Search</button>
        <div>
            {loading && <p>Loading data...</p>}
            {error && <p>{error}</p>}
            {weather && (
            <div className="weather-cards">
                <div className="weather-card">
                      <h3>Temperature</h3>
                      <p>{weather.current.temp_c}°C</p>
                </div>
                <div className="weather-card">
                      <h3>Humidity</h3>
                      <p>{weather.current.humidity}%</p>
                </div>
                <div className="weather-card">
                      <h3>Condition</h3>
                      <p>{weather.current.condition.text}</p>
                </div>
                <div className="weather-card">
                      <h3>Wind Speed</h3>
                      <p>{weather.current.wind_kph} kph</p>
                </div>
            </div>
            )}
        </div>
    </div>
  );
};
export default Weather;

//using Mui component

// import { Box, Stack, Typography } from "@mui/material";
// import { useState } from "react";
// import axios from "axios";
// import Weathercard from "./components/weathercard";

// const WeatherApp = () => {
//   const [city, setCity] = useState('');
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const apiKey = 'cf3ce77b94eb470e861204311240107';

//   const fetchWeather = async () => {
//     if (city.trim() === '') {
//       alert('Please enter a city name.');
//       return;
//     }
//     setLoading(true); //waiting time till api loads after clicking the search button
//     setWeather(null); //reset old data when searching for new data
//     try {
//       const apiurl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
//       const response = await axios.get(apiurl);
//       setWeather(response.data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Failed to fetch weather data:', err); 
//       setLoading(false);
//       alert("Failed to fetch weather data");
//     }
//   };

//   function handlechange(e) {
//     e.preventDefault();
//     setCity(e.target.value);
//   }

//   function handlesearch() {
//     fetchWeather();
//   }

//   return (
//     <Box sx={{
//       background: "#F0F8FF",
//       width: "100%",
//       height: "100%",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//     }}>
//       <Typography mb={3} fontSize={{ xs: 35, md: 50 }} fontWeight={600}>Weather Data</Typography>
//       <Stack mb={2} direction={{ xs: "column", sm: "row" }}
//         spacing={1}
//         sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//         <input type="text" placeholder="Enter city name" value={city} onChange={handlechange} style={{ height: "35px", width: "15em" }} />
//         <button onClick={handlesearch} style={{ height: "35px", width: "80px" }}>Search</button>
//       </Stack>

//        {loading && (
//           <p style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1em" }}>Loading data…</p>
//         )}
      
//       {weather && (
//         <Box className="weather-cards">
//           <Stack direction={{ xs: "column", sm: "row", md: "row" }}
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               margin: "1em",
//               gap: "1em"
//             }}>
//             <Weathercard text={"Temperature"} value={`${weather.current.temp_c} °C`} />
//             <Weathercard text={"Humidity"} value={`${weather.current.humidity}%`} />
//             <Weathercard text={"Condition"} value={weather.current.condition.text} />
//             <Weathercard text={"Wind Speed"} value={`${weather.current.wind_kph}kph`} />
//           </Stack>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default WeatherApp;
