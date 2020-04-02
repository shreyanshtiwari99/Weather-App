window.addEventListener("load", () => {
  let long;

  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(lat);
      console.log(long);

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const locationapi = `${proxy}http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=%20%09Ffx7XA6Jw14Zr7ykqaMGZznpAmhGo8pW%20&q=${lat}%2C${long}&language=en-us `;
      fetch(locationapi)
        .then(resp => {
          return resp.json();
        })
        .then(papa => {
          const locationKey = papa.Key;
          const tz = papa.SupplementalAdminAreas[0].LocalizedName;
          const weatherApi = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=%20%09Ffx7XA6Jw14Zr7ykqaMGZznpAmhGo8pW%20`;
          fetch(weatherApi)
            .then(response => {
              return response.json();
            })
            .then(data => {
              console.log(data);
              const value = data[0].Temperature.Metric.Value;
              const desc = data[0].WeatherText;
              const icon = data[0].WeatherIcon;
              const time = data[0].LocalObservationDateTime;
              //Set DOM elements from API
              let celsius = value;
              let kelvin = value + 273;
              temperatureDegree.textContent = celsius;
              temperatureDescription.textContent = desc.toUpperCase();
              locationTimezone.textContent = tz;

              //set icon
              setIcons(icon, document.querySelector(".icon"));

              temperatureSection.addEventListener("click", () => {
                if (temperatureSpan.textContent === "C") {
                  temperatureSpan.textContent = "K";
                  temperatureDegree.textContent = kelvin;
                } else {
                  temperatureSpan.textContent = "C";
                  temperatureDegree.textContent = celsius;
                }
              });
            });
        });
    });
  } else {
    h1.textContent = "This will not work without location access!";
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    function iconChange(num) {
      let assign;
      if (num == 1 || num == 2 || num == 3 || num == 4 || num == 5) {
        /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        document.body.style.background = " linear-gradient( #36D1DC,#5B86E5) ";

        assign = "CLEAR_DAY";
      } else if (num == 6 || num == 7 || num == 8 || num == 11) {
        document.body.style.background = " linear-gradient( #bdc3c7,#2c3e50) ";
        assign = "PARTLY_CLOUDY_DAY";
      } else {
        document.body.style.background =
          " linear-gradient( #667db6,#0082c8,#0082c8,#667db6 ) ";
        assign = "RAIN";
      }
      return assign;
    }

    const currentIcon = iconChange(icon.toString());

    console.log(currentIcon);
    skycons.play();

    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
