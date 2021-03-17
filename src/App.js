import React, { useState, useEffect } from 'react';
import { Button, TextField, FormControl } from '@material-ui/core';
import axios from 'axios';
import Table from './components/Table';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';


function App() {
  const apiKey = "7083cd16161bdb6686c87eb80fd31922"
  const [cordinates,setCordinates] = useState(["33.441792","-94.037689"])
  const [weatherData,setWeatherData] = useState(null);
  const [maxFilter,setMax] = useState(1000000);
  const [minFilter,setMin] = useState(-1000);

  const kelvinToF = (kelvin) => {
    return (((kelvin-273.15)*1.8)+32).toFixed(2);
  }

  const pullWeatherData = async() => {
    console.log("Pulling weather data");
    const apiUrl = "https://api.openweathermap.org/data/2.5/onecall?exclude=hourly,minutely,alerts,current&lat="+cordinates[0]+"&lon="+cordinates[1]+"&appid="+apiKey
    const response = await axios.get(apiUrl);
    setWeatherData(response.data.daily.map(dateData =>  ({
      "date" : new Date(dateData.dt*1000).toLocaleDateString("en-US"),
      "temp" : kelvinToF(dateData.temp.day),
      "humidity": dateData.humidity
      })
    ));
    console.log("Data Successfully Retrieved");
  }

  const filterData = (max,min,data) => {
    let filteredResults = [];
    data.forEach(dateData => {
      if (dateData.temp >= min && dateData.temp <= max){
        filteredResults.push(dateData);
      }
    })
    console.log("Data Successfully Filtered");
    return filteredResults; 
  }
  
  const setLimits = (e) => {
    e.preventDefault()
    if(e.target[0].value.length){
      setMin(parseInt(e.target[0].value));
    }
    if(e.target[1].value.length){
      setMax(parseInt(e.target[1].value));
    }
    console.log("Limits Successfully Set");

  }

  useEffect(pullWeatherData,[cordinates]);

  return (
    <div className="App">
      <Grid container direction="row" justify="center" alignItems="center" >
        <form onSubmit={setLimits}>
          <TextField id="standard-basic" type="number" label="Minimum Tempature" />
          <TextField id="standard-basic" type="number" label="Max Tempature" />
          <Button type="submit" variant="contained">Get Data</Button>
        </form>
        {weatherData && <Table data={filterData(maxFilter,minFilter,weatherData)}/>}
        <p>Cordinates: {cordinates[0]},{cordinates[1]}</p>
      </Grid>
    </div>
  );
}

export default App;