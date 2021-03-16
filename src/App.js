import React, { useState, useEffect } from 'react';
import { Button, TextField, FormControl } from '@material-ui/core';
import axios from 'axios';
import Table from './components/Table';



function App() {
  const apiKey = "7083cd16161bdb6686c87eb80fd31922"
  const [weatherData,setWeatherData] = useState(null);
  const [cords,setCords] = useState(null);

  const pullWeatherData = async() => {
    const lat = "33.441792";
    const long = "-94.037689";
    const apiUrl = "https://api.openweathermap.org/data/2.5/onecall?exclude=hourly,minutely,alerts,current&lat="+lat+"&lon="+long+"&appid="+apiKey
    const response = await axios.get(apiUrl);
    //console.log(esponse.data.daily.map(dateData => dateData.)
    setWeatherData(response.data.daily.map(dateData =>  ({
      "date" : new Date(dateData.dt*1000).toLocaleDateString("en-US"),
      "temp" : dateData.temp.day,
      "humidity": dateData.humidity
    })
    ));
    console.log(response.data);
  }

  useEffect(pullWeatherData,[cords]);
  //pullWeatherData()

  return (
    <div className="App">
      <FormControl>
        <TextField id="standard-basic" label="Longitude" />
        <TextField id="standard-basic" label="Lattitude" />
        <Button>Get Data</Button>
      </FormControl>
      
      <FormControl
            placeholder="Enter city"
          />
      {weatherData && <Table data={weatherData}/>}
    </div>
  );
}

export default App;