$(document).ready(function() {
  // Let's use the geolocation data from the navigator to find out the user's current location:
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      //With the above lat/long, let's get the weather using the openweathermap API. Note that we have to use a CORS-circumventing service (see the modified API link below) in order to overcome the issue of Codepen not liking it when you call an http API when codepen is itself in https.
      $.getJSON(
        "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=" +
          lat +
          "&lon=" +
          long +
          "&appid=9e8abcb9c2cb981c62d1d94631857a88",
        function(json) {
          $(".location").html(json.name);
          $(".humidity").html(json.main.humidity + "% humidity");
          $(".condition").html(json.weather[0].description);
          $(".weather-icon").html('<img src="https://openweathermap.org/img/w/' + json.weather[0].icon + '.png" alt="icon representing current weather condition">'); //This snippet fetches the appropriate weather icon from Openweathermap at https://openweathermap.org/img/w/[ICONCODE].png.
          $(".temperatureC").html((json.main.temp - 273.15).toFixed(1) + " °C"); //Default temperatures from Openweathermap are in Kelvin, so we need to convert to Celsius.
          $(".windC").html(  (json.wind.speed * 3.6).toFixed(2) + " km/h, " + json.wind.deg + "°"); // Default value is in m/s, converted here to km/h with a max of two decimal places.
          $(".temperatureF").html( ((json.main.temp - 273.15) * 9 / 5 + 32).toFixed(1) + " °F"); //Default temperatures from Openweathermap are in Kelvin, so we need to convert to Fahrenheit.
          $(".windF").html(  (json.wind.speed * 2.2369363).toFixed(2) + " mph, " + json.wind.deg + "°"); // Default value is in m/s, converted here to mph with a max of two decimal places.
          
          
          //To avoid the divs appearing empty on page load, and then getting populated by the data from the API, we have them set to display="none" in the CSS, and here, we fade them in (Celsius is the page default).
          $(".location, .temperatureC, .humidity, .windC, .condition, .weather-icon").fadeIn("400", "linear");
          
          //Okay, time to make the button that toggles between metric and imperial:
          $(".btn").on("click", function() {
            $(".unitsC").toggle(); //No transition set on the buttons so that they change imperceptibly fast
            $(".unitsF").toggle(); //No transition set on the buttons so that they change imperceptibly fast
            
            //Here's what I came up with to smoothly switch from C to F. Note that the default length of time for a slideUp or slideDown event is 400ms, hence the delay length I used. Make sure to not have a top margin on the divs, otherwise the animations will go all the way up to the top of the margin and look bad.
            if ($(".temperatureF").css('display') == "none") {
              $(".temperatureC").slideUp();
              $(".windC").slideUp();
              $(".temperatureF").delay(400).slideDown();
              $(".windF").delay(400).slideDown();
            } //End of if statement
            else if ($(".temperatureC").css('display') == "none") {
              $(".temperatureC").delay(400).slideDown();
              $(".windC").delay(400).slideDown();
              $(".temperatureF").slideUp();
              $(".windF").slideUp();
            }; //End of else if statement

          }); //End of onClick and toggling between F and C

        }); //End of getJSON
    }); //End of if(navigator.geolocation)'s function
  } //End of if(navigator.geolocation)
}); //End of scripts