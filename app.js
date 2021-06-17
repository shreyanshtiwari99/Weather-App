//GETTING ELEMENTS FROM HTML
let temperatureDescription = document.querySelector(".temperature-description");
let temperatureDegree = document.querySelector(".temperature-degree");
let locationTimezone = document.querySelector(".location-timezone");
let temperatureSection = document.querySelector(".temperature");
const temperatureSpan = document.querySelector(".temperature span");
let cityName = document.querySelector(".city-name");
let iconimg = document.querySelector(".icon")
const refreshTime = document.querySelector(".refreshed")
const invalue = document.querySelector('#in')
const form = document.querySelector(".searching");
const btn = document.querySelector(".submission");
const key = config.API_KEY;
let d = new Date();
btn.addEventListener("click", getData)

window.addEventListener('keypress',(e)=>{
  if(e.keyCode == 13){
    btn.click();
  }
})
//
window.addEventListener("load",()=>{
  refreshTime.innerHTML= `<h4>Please enter a valid city name</h4>`;
  invalue.innerHTML= ``;
  temperatureDegree.innerHTML=``;
})

function getData(){
  let searchCIty = document.querySelector(".search").value;
      if(!searchCIty || searchCIty==""){
        console.log("running")
        refreshTime.innerHTML= `<h4>Please enter a valid city name</h4>`;
       
      }
 // const proxy = "https://cors-anywhere.herokuapp.com/";

      // const locationKey = "http://api.openweathermap.org/data/2.5/weather?q=Raipur&appid=f8f1dac8b861a54ccc2b50d4306de857&units=metric ";
      const first = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${searchCIty}`
      fetch(first)
        .then(resp => {
      
            return resp.json();
        })
        .then(dataset => {
          const locationKey = dataset[0].Key;
        
          const city = dataset[0].LocalizedName;
          cityName.textContent = city.toUpperCase();
            fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=%20%09${key}`)
              .then(data => {
                return data.json();
              })
              .then(result => {
                console.log(result);
                console.log(result[0].Temperature.Metric.Value);
                console.log(result[0].WeatherText);
                console.log(result[0].WeatherIcon);
                console.log(result[0].IsDayTime)
                // console.log(result[0].LocalObservationDateTime);
                const value = Math.round(result[0].Temperature.Metric.Value);
                const desc = result[0].WeatherText;
                const icon = result[0].WeatherIcon;
                const isDayTime = result[0].IsDayTime;
               
                // const time = result[0].LocalObservationDateTime[0].substr(11,16);

                  //Set DOM elements from API
                // temperatureDegree.textContent = value;
                temperatureDescription.textContent = desc.toUpperCase();
                // refreshTime.innerHTML= `<h4>Data last obtained:${result[0].LocalObservationDateTime}</h4>`;
                refreshTime.innerHTML= `<h4>Last refreshed: ${d.getHours()}:${d.getMinutes()}</h4>`;
                invalue.textContent= "in";
                temperatureDegree.innerHTML= `${value}&deg;C`;
                // locationTimezone.textContent = time;
                // iconimg.src = `https://developer.accuweather.com/sites/default/files/${icon}-s.png`;

                //set icon
                setIcons(icon, document.querySelector(".icon"), isDayTime);
              })
              .catch(err =>{
                console.log("There was some error in the second fetch:",err.message);
              })
               
              
        })
        .catch(e =>{
          refreshTime.innerHTML= `<h4>Please enter a valid city name</h4>`;
          invalue.innerHTML= ``;
          temperatureDegree.innerHTML=``;
          const skycons = new Skycons({ color: "white" });
          skycons.pause();
          cityName.innerHTML  ='';
          temperatureDescription.innerHTML = '';
          console.log("There was some error in first fetch",e.message);
        })
      };



    
  
// FUNCTION TO ADD ANIMATED SVG ICONS
  function setIcons(icon, iconID, isDayTime) {
  
    const currentIcon = iconChange(icon,isDayTime);
    const skycons = new Skycons({ color: "white" });
    


    function iconChange(num, isDayTime) {
      let assign;
      if(isDayTime){
            if (num == 1 || num ==2 || num==3 || num==4) {
                assign = "CLEAR_DAY";
                document.body.style.backgroundImage = "url('clear.jpg')";
            } 
            else if (num == 6 || num == 7 || num == 8 || num == 5) {
                assign = "PARTLY_CLOUDY_DAY";
                document.body.style.backgroundImage = "url('rainy.jpg')";
            }
            else if (num == 12 ||num == 13 ||num == 14 ||num == 15 ||num == 16 ||num == 17 ||num == 18 ) {
              assign = "RAIN";
              document.body.style.backgroundImage = "url('rain.jpg')";
        }  else if (num == 11 ) {
          document.body.style.backgroundImage = "url('fog.jpg')";
          assign = "FOG";
      }else {
        document.body.style.backgroundImage = "url('snowDay.jpg')";
              assign = "SNOW";
            }
            return assign;
          }
  
  else{
    if (num == 33 || num ==34 || num==35) {
      document.body.style.backgroundImage = "url('night.jpg')";
      assign = "CLEAR_NIGHT";
  } else if (num == 36 || num == 37 || num == 38 ) {
    document.body.style.backgroundImage = "url('cloudyNight.jpg')";
    assign = "PARTLY_CLOUDY_NIGHT";
  } else if(num == 39 ||num == 40 ||num == 41 ||num == 42 ) {
    document.body.style.backgroundImage = "url('rain.jpg')";
    assign = "RAIN";
  }
  else{
    document.body.style.backgroundImage = "url('snowNight.jpg')";
    assign = "SNOW";
  }
  return assign;
}

  }
    

    console.log(currentIcon);
    skycons.play();

    return skycons.set(iconID, Skycons[currentIcon]);
  }

