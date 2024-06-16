import { useContext, useState } from "react"
import "./Home.css"
import WeatherDetails from "../weatherDetails";
import { ReactContext } from "../../ReactContext/Context";
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
  const [inputValue,setInput] = useState('')
  const {currentLocData,setCurrLocData,isDarkMode} = useContext(ReactContext)

const onChangeInput=(event)=>{
  setInput(event.target.value)
}


const onClickSearch=async()=>{
  setCurrLocData({})
  if(inputValue!==""){
  const apiKey = '4fbe68292e25f738ebd14dcc2409d079';
  const url=`https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&&id=524901&appid=${apiKey}`
  const options={
      method:"GET"
  }

  const response = await fetch(url,options)
  const data = await response.json()
  if(response.ok){
    setCurrLocData(data)
  }
  setInput('')
}
}

console.log(currentLocData)

  return (
    <div className={isDarkMode?"dark-bg":"home-bg"}>
      <div className="content">
        <div className="container">
          <div className="input-container">
            <input type='search' placeholder='Search for location' className="input-element" value={inputValue} onChange={onChangeInput} />
            <SearchIcon className="search-icon" onClick={onClickSearch}/>
          </div>
        </div>
        <div className="weather-details-container">
        <WeatherDetails className="weather-details"/>
        </div>
      </div>
    </div>
  )
}

export default Home