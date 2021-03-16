import React, { useState, useEffect } from 'react';
import { Button, TextField, FormControl } from '@material-ui/core';
import axios from 'axios';
import Table from './components/Table';




function App() {
  const apiKey = "7083cd16161bdb6686c87eb80fd31922"
  const [weatherData,setWeatherData] = useState(null);
  const [maxFilter,setMax] = useState(1000000);
  const [minFilter,setMin] = useState(-1000);
  const cook = true


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

  const filterData = (max,min,data) => {
    let filteredResults = [];
    console.log(max);
    console.log(min);
    data.forEach(dateData => {
      if (dateData.temp >= min && dateData.temp <= max){
        console.log("Added Bitch");
        filteredResults.push(dateData);
      }
    })

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
  }



  useEffect(pullWeatherData,[cook]);
  //pullWeatherData()

  return (
    <div className="App">
      <form onSubmit={setLimits}>
        <TextField id="standard-basic" label="Below" />
        <TextField id="standard-basic" label="Above" />
        <Button type="submit" style="contained">Get Data</Button>
      </form>
      
      <FormControl
            placeholder="Enter city"
          />
      {weatherData && <Table data={filterData(maxFilter,minFilter,weatherData)}/>}
    </div>
  );
}

export default App;