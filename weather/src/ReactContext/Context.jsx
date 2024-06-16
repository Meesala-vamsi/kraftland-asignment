
import React, { useEffect, useState } from "react"


export const ReactContext=React.createContext()

const ContextProvider=({children})=>{

    const [currentLocData,setCurrLocData] = useState({})
    const [isDarkMode,setDarkMode] = useState(false)

    useEffect(()=>{
        const getWeatherData = async (latitude, longitude) => {
            const apiKey = '4fbe68292e25f738ebd14dcc2409d079';
            const options ={
              method:"GET"
            }
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&id=524901&appid=${apiKey}`
              const response = await fetch(url,options);
              console.log(response)
                const data = await response.json();
               setCurrLocData(data);
               console.log(data)
          };
      
          const getLocation = () => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  getWeatherData(latitude, longitude);
                }
              );
            }
          };
      
          getLocation();
    },[])
    return(
        <ReactContext.Provider value={{currentLocData,setCurrLocData,isDarkMode,setDarkMode}}>
            {children}
        </ReactContext.Provider>
    )
}

export default ContextProvider

