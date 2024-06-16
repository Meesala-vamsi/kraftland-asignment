import { ColorRing } from 'react-loader-spinner'
import { FaCloud } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { WiDayWindy } from "react-icons/wi";
import { BsFillCloudLightningRainFill } from "react-icons/bs";
import { BsCloudsFill } from "react-icons/bs";
import pressureIcon from '../../Assets/pressure-icon.svg'
import './index.css'
import { useContext, useState } from "react";
import { ReactContext } from "../../ReactContext/Context";
import LightModeIcon from '@mui/icons-material/LightMode';


const WeatherDetails=(props)=>{
    const {currentLocData,isDarkMode,setDarkMode} = useContext(ReactContext)
    
    const [rotateIcon, setRotateIcon] = useState(false);

    if (!currentLocData|| !currentLocData.city) {
        return <div className='loader-container'>
        <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperClass="color-ring"
            colors={["blue","blue","blue","blue","blue"]}
            />
    </div>;
    }

    const reusableDate=(value)=>{
        const dateString = value;
        const date = new Date(dateString);
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeek = daysOfWeek[date.getUTCDay()];
        return dayOfWeek.slice(0,3)
    }
    const dateString = currentLocData.list[0].dt_txt;
    const date = new Date(dateString);

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const day = date.getUTCDate();
    const month = monthsOfYear[date.getUTCMonth()];

    

    const convertionInToCelsius=(value)=>{
        const kelvinTemp = value;
    const celsiusTemp = kelvinTemp - 273.15;
    const roundedCelsiusTemp = Math.round(celsiusTemp);
    return roundedCelsiusTemp
    }

    const onClickToggle=()=>{
        setDarkMode(!isDarkMode)
        setRotateIcon(true);
        setTimeout(() => {
            setRotateIcon(false);
        }, 500);
    }


    return(
        <div className="weather-main-container">
        <div className={isDarkMode?"dark-card-container":"weather-card-container"}>
            <div className='light-container'>
                <div>
                    <h1 className="main-heading">{currentLocData.city.name},{currentLocData.city.country}</h1>
                    <p className="day-desc">{dayOfWeek} {day} {month}</p>
                </div>
                <LightModeIcon className={`light-icon ${rotateIcon ? 'dark-mode' : 'hello'}`}  onClick={onClickToggle} />
            </div>
            <div className="atmosphere-container">
                <div className="cloud-container"> 
                    <div className="temp-container">
                        {currentLocData.list[0].weather[0].main==="Rain"?<BsFillCloudLightningRainFill className="cloud-icon"/>:<FaCloud className="cloud-icon"/>}
                        <span>{convertionInToCelsius(currentLocData.list[0].main.temp)}&deg;</span>
                    </div>
                    <p>{currentLocData.list[0].weather[0].description}</p>
                </div>
                <div className="details-container">
                    <p>Feels like {convertionInToCelsius(currentLocData.list[0].main.feels_like)}&deg;</p>
                    <div className="temp-increase-decrease-container">
                        <div className="temp-icon-container">
                            <FaLongArrowAltUp className="arrow-icon"/>
                            <p>{convertionInToCelsius(currentLocData.list[0].main.temp_max)}&deg;</p>
                        </div>
                        <div className="temp-icon-container">
                            <FaLongArrowAltDown className="arrow-icon"/>
                            <p>{convertionInToCelsius(currentLocData.list[0].main.temp_min)}&deg;</p>
                        </div>
                    </div>
                    <div className="list-container">
                        <div className="list-items">
                            <FaDroplet className="list-icon"/>
                            <p>Humidity</p>
                            <p>{currentLocData.list[0].main.humidity}%</p>
                        </div>
                        <div className="list-items">
                            <WiDayWindy className="list-icon"/>
                            <p>Wind</p>
                            <p>{currentLocData.list[0].wind.speed}kph</p>
                        </div>
                        <div className="list-items">
                            <img src={pressureIcon} alt="" className="list-icon" />
                            <p>Pressure</p>
                            <p>{currentLocData.list[0].main.pressure}pha</p>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
        <div className="extended-forecast-container">
                <h1>Forecast</h1>
                <ul className="forecast-list-container">
                    {
                        currentLocData.list.slice(0,10).map((eachItem,index)=>(
                            <li className={isDarkMode?"dark-forecast-list-items":"forecast-list-items"} key={index}>
                                    <p>{reusableDate(eachItem.dt_txt)}</p>
                                    {eachItem.weather[0].main==="Rain"?<BsFillCloudLightningRainFill/>:<BsCloudsFill/>}
                                    <p>{eachItem.weather[0].main}</p>
                                    <div className="forecast-temp">
                                        <span>{convertionInToCelsius(eachItem.main.temp_max)}&deg;</span>
                                        /
                                        <span>{convertionInToCelsius(eachItem.main.temp_min)}&deg;</span>
                                    </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default WeatherDetails