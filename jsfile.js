//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const weatherapi={
    key:"4978837bfcfb85b0452c1629b150fee5",
    baseUrl:"https://api.openweathermap.org/data/2.5/weather?"
}
//Ananomus function
//EventLister
const searchinput=document.getElementById('input-box');
searchinput.addEventListener('keypress',(Event)=>{
    //keyCode is deprecated instead of KeyCode use Event.key==="Enter";
    if(Event.key==='Enter'){
        getweather(searchinput.value);
        document.getElementById('weatherbody').style.display='block';
        
    }
});

//get weather report
//&units=metric is used to change in celcius
async function getweather(city){
   await fetch(`${weatherapi.baseUrl}q=${city}&appid=${weatherapi.key}&units=metric`)
    .then(weather=>{
        return weather.json();
    }).then(showweatherrport);
}
//show waether report
function showweatherrport(weather){
    if(weather==undefined)
    console.log(weather,"my weather");
    let city=document.getElementById('city');
    city.innerText=`${weather.name},${weather.sys.country}`;
    //on temp
    let tempt=document.getElementById('temp');
    tempt.innerHTML=`${Math.round(weather.main.temp)}&deg;C`;
    // on min-max
    let min_Max=document.getElementById('min-max');
    min_Max.innerHTML=`${Math.floor(weather.main.temp_min)}&deg;C(min)/
    ${Math.ceil(weather.main.temp_max)}&deg;C(max)`
    //weather type
    let weathertype=document.getElementById('weather');
    weathertype.innerText=`${weather.weather[0].main}`

    if(weathertype.textContent=='Clouds'){
        document.body.style.backgroundImage="url(cloud1.jpeg)";
    }
    else if(weathertype.textContent=='Haze'){
        document.body.style.backgroundImage="url(haze.jpg)";
    }
    else if(weathertype.textContent=='Clear'){
        document.body.style.backgroundImage="url(sunny.jpg)";
    }
    else if(weathertype.textContent=='Rain'){
        document.body.style.backgroundImage="url(rainy.jpg)";
    }
    

    let humidity=document.getElementById('humdity-pressure');
    humidity.innerText=`Humidity : ${weather.main.humidity}`;
    let pressure=document.getElementById('pressure');
    pressure.innerHTML=`Pressure :  ${weather.main.pressure}`;
    const  dateE1=document.getElementById('date');
    const days=['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday'];
    const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    setInterval(()=>{
    const time=new Date();
    const date=time.getDate();
    const day=time.getDay();
    const month=time.getMonth();
    const year=time.getFullYear();
    dateE1.innerHTML=days[day]+","+date+" "+months[month]+" "+year;
})
}


