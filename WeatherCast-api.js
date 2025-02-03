
const x = document.getElementById("location");
const Y = document.getElementById("temperature");
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  

  function showPosition(position) {
    //x.innerHTML = "Latitude: " + position.coords.latitude + 
    //"<br>Longitude: " + position.coords.longitude +"<br>Longitude: "+ getCity(coordinates);

    var lat =  position.coords.latitude.toString(); 
    var lng = position.coords.longitude.toString();
    var coordinates = [lat, lng];  

    getCity(coordinates);
    getWeatherForcast(coordinates);
  }

//Get the location and Temperature 
  window.onload = function () {  
        getLocation();
};


function getCity(coordinates) { 
    var xhr = new XMLHttpRequest(); 
    var lat = coordinates[0]; 
    var lng = coordinates[1]; 
  
    // Paste your LocationIQ token below. 
    xhr.open('GET', "https://us1.locationiq.com/v1/reverse?key=pk.6a4fd0d62927699ac40202d48cc0823e&lat=" + 
    lat + "&lon=" + lng + "&format=json", true); 
    xhr.send(); 
    xhr.onreadystatechange = processRequest; 
    xhr.addEventListener("readystatechange", processRequest, false); 
  
    function processRequest(e) { 
        if (xhr.readyState == 4 && xhr.status == 200) { 
            var response = JSON.parse(xhr.responseText); 
            var city = response.address.city; 
            x.innerHTML =city;
            return;
        } 
    } 
}   

function getWeatherForcast(coordinates) { 
    var xhr = new XMLHttpRequest(); 
    var lat = coordinates[0]; 
    var lng = coordinates[1]; 
  
    // Paste your LocationIQ token below. 
    xhr.open('GET', "https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude=" + lng + "&hourly=temperature_2m", true); 
    xhr.send(); 
    xhr.onreadystatechange = processRequest; 
    xhr.addEventListener("readystatechange", processRequest, false); 
  
    function processRequest(e) { 
        if (xhr.readyState == 4 && xhr.status == 200) { 
            var response = JSON.parse(xhr.responseText); 
            var temp = response.hourly.temperature_2m;
            Y.innerHTML= (temp.reduce((total, current) => total + current, 0)/temp.length).toFixed(2)+"°C";
            return temp; 
        } 
    } 
}