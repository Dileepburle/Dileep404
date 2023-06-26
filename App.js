import React, {useState } from 'react'
import './index.css'
import axios from 'axios'
function App(){
    const [data,setData] = useState({
        celcius: 10,
        name: 'hyderabad',
        hunidity: 10,
        speed: 2,
        pressure:1000,
        description:'Clouds',
        image: "https://cdn-icons-png.flaticon.com/512/3731/3731894.png"
    })
    const [name,setName] = useState('');
    const [error,setError] =useState('')

    const handleClick = () =>{
        if(name !== ""){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=b2e167549c1404013edee37c9ba60abd&units=metric`
        axios.get(apiUrl)
        .then(res =>{
            let imagePath = '';
            if(res.data.weather[0].main ==="Clouds"){
                imagePath ="https://cdn-icons-png.flaticon.com/512/1163/1163624.png"
            }
            else if(res.data.weather[0].main ==="Clear"){
                imagePath ="https://cdn-icons-png.flaticon.com/512/3032/3032894.png"
            }
            else if(res.data.weather[0].main ==="Rain"){
                imagePath ="https://cdn-icons-png.flaticon.com/512/1332/1332449.png"
            }
            else if(res.data.weather[0].main ==="Drizzle"){
                imagePath ="https://cdn-icons-png.flaticon.com/512/175/175973.png"
            }           
             else if(res.data.weather[0].main ==="Mist"){
                imagePath ="https://cdn-icons-png.flaticon.com/512/4005/4005901.png"
            }
            else{
                imagePath ="https://cdn-icons-png.flaticon.com/512/3731/3731894.png"
            }
            console.log(res.data);
            setData({...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity,
                 speed: res.data.wind.speed, pressure: res.data.main.pressure,description:res.data.weather[0].main, image:imagePath})
        })
        .catch(err =>{
           if(err.response.status == 404){
            setError("Invalid City Name")
           }
           else{
            setError('')
           }
         console.log(err)}); 
        } 
    }
    return(
        <div className='container'>
            <div className='weather'>
                <div className='search'>
                <input type='text' placeholder='enter city' onChange={e =>setName(e.target.value)} />
                <button onClick={handleClick}><img src="https://cdn-icons-png.flaticon.com/512/10905/10905219.png" onClick={handleClick}/></button>
                </div>
                <div className='winfo'>
                  <img src={data.image} className='icon' />
                  <h1>{Math.round(data.celcius)}°c,{data.description}</h1>
                  <h2>{data.name}</h2>
                  <div className='details'>
                    <div className='col'>
                     <img src='https://cdn-icons-png.flaticon.com/512/6393/6393411.png'/>
                     <div className='humidity'>
                        <p>{data.humidity}%</p>
                        <p>Humidity</p>
                     </div>
                    </div>
                    <div className='col'>
                     <img src='https://cdn.onlinewebfonts.com/svg/img_315328.png'/>
                     <div className='windspeed'>
                        <p>{Math.round(data.speed)}kmph</p>
                        <p>Windspeed</p>
                     </div>
                    </div>
                    <div className='col'>
                     <div className='pressure'>
                        <p>{data.pressure}</p>
                        <p>Pressure</p>
                     </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default App