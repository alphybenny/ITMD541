let latitude;
let longitude;

function getSunriseSunset() {

  const todayUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`;
  const tomorrowUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=tomorrow`;

  // Fetch data for today
  fetch(todayUrl)
    .then(response => response.json())
    .catch(error => console.error('Error fetching today\'s data:', error));

  // Fetch data for tomorrow
  fetch(tomorrowUrl)
    .then(response => response.json())

    .catch(error => console.error('Error fetching tomorrow\'s data:', error));
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        var location = 'Current location'; 
        document.getElementById('location').textContent = 'Location: ' + location;
            document.getElementById('coordinates').textContent = 'Latitude: ' + latitude + ', Longitude: ' + longitude;
            updateDashboard(latitude, longitude, new Date());
            updateDashboardTomorrow(latitude, longitude, new Date());
        getSunriseSunset();
      },
      error => {
        console.error('Error getting current location:', error);
        alert('Unable to retrieve your location. Please enter manually.');
      }
    );
  } else {
    alert('Geolocation is not supported by your browser. Please enter manually.');
  }
}

// Modify the searchLocation function to accept city as a parameter
function searchLocation() {
  debugger;
  var location = document.getElementById('locationSearch').value;
  const geocodeApiUrl = `https://geocode.maps.co/search?city=${encodeURIComponent(location)}`;

  fetch(geocodeApiUrl)
    .then(response => response.json())
    .then(data => handleGeocodeResult(data))
    .catch(error => console.error('Error:', error));
}

function handleGeocodeResult(data) {
  if (data && data.length > 0) {
    const location = data[0];
    var locationvalue = document.getElementById('locationSearch').value;
    latitude= location.lat;
    longitude= location.lon;
    document.getElementById('location').textContent = 'Location: ' + locationvalue;
            document.getElementById('coordinates').textContent = 'Latitude: ' + latitude + ', Longitude: ' + longitude;
            updateDashboard(latitude, longitude, new Date());
            updateDashboardTomorrow(latitude, longitude, new Date());
    getSunriseSunset();
  } else {
    alert('Location not found. Please enter a valid location.');
  }
}

function updateDashboard(lat, lon, date) {
  var dateStr = date.toISOString().split('T')[0];
  document.getElementById('dateToday').textContent = 'Date: ' + dateStr; 

  fetch('https://api.sunrisesunset.io/json?lat=' + lat + '&lng=' + lon + '&date=' + dateStr)
  .then(response => response.json())
  .then(data => {
      var results = data.results;

      document.getElementById('sunriseToday').textContent = results.sunrise;
      document.getElementById('sunsetToday').textContent = results.sunset;
      document.getElementById('dawnToday').textContent = 'Dawn: ' + results.dawn;
      document.getElementById('duskToday').textContent = 'Dusk: ' + results.dusk;
      document.getElementById('dayLengthToday').textContent = 'Day Length: ' + results.day_length;
      document.getElementById('solarNoonToday').textContent = 'Solar Noon: ' + results.solar_noon;
      document.getElementById('timezone').textContent = 'Timezone: ' + results.timezone;

  })
  .catch(error => console.error(error));
}

function updateDashboardTomorrow(lat, lon, date) {
  var tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  var dateStr = tomorrow.toISOString().split('T')[0];
  document.getElementById('dateTomorrow').textContent = 'Date: ' + dateStr;  

  fetch('https://api.sunrisesunset.io/json?lat=' + lat + '&lng=' + lon + '&date=' + dateStr)
  .then(response => response.json())
  .then(data => {
      var results = data.results;

      document.getElementById('sunriseTomorrow').textContent = results.sunrise;
      document.getElementById('sunsetTomorrow').textContent = results.sunset;
      document.getElementById('dawnTomorrow').textContent = 'Dawn: ' + results.dawn;
      document.getElementById('duskTomorrow').textContent = 'Dusk: ' + results.dusk;
      document.getElementById('dayLengthTomorrow').textContent = 'Day Length: ' + results.day_length;
      document.getElementById('solarNoonTomorrow').textContent = 'Solar Noon: ' + results.solar_noon;

  })
  .catch(error => console.error(error));
}