const apiKey = "d9b07f6dd2db85620804980d2f0d4e5a"; //API key from open weather map(OWM)
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; //taken url also from OWM

//using DOM get the html data by query selector
const cityName = document.querySelector(".search input"); //name of the city user give as input
const searchbtn = document.querySelector(".search button"); //action which performed for searchbtn
const changeimg = document.getElementById("images");

//function for modify the apiurl as depends on user input city name
async function weatherDetails(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json(); //to store the json file output from api url

  //to check whether the city is valid or not
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block"; //to display invalid msg
    document.querySelector(".weather").style.display = "none"; //hidden the weather data for invalid city name
  } else {
    console.log(data); // to show the json file format data in html console page
    document.querySelector(".city").innerHTML = data.name; //give the city name from user input to html

    // data is in json file stored data in that there is name field which has name of the city given by user
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + " °c";

    document.querySelector(".climate").innerHTML = data.weather[0].main;

    //to display the weather details which we hidden before the input
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

    if (data.weather[0].main == "Clouds") {
      changeimg.src = "Images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      changeimg.src = "Images/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      changeimg.src = "Images/drizzle.png";
    } else if (data.weather[0].main == "Snow") {
      changeimg.src = "Images/snow.png";
    } else if (data.weather[0].main == "Haze") {
      changeimg.src = "Images/haze.png";
    } else {
      changeimg.src = "Images/rain.png";
    }
  }
}

//after clicking search icon it will execute
searchbtn.addEventListener("click", () => {
  //anonymous function -- there is no name for this function
  weatherDetails(cityName.value);
});
