$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperatureDisplayed();
  getImage()
  $('#temperature-up').click(function(){
    thermostat.up();
    updateTemperatureDisplayed();
    getImage();
  });
  $('#temperature-down').click(function() {
    thermostat.down();
    updateTemperatureDisplayed();
    getImage();
  });

  $('#temperature-reset').click(function() {
    thermostat.resetTemperature();
    updateTemperatureDisplayed();
    getImage();
  });

  $('#powersaving-on').click(function() {
    thermostat.switchPowerSavingModeOn();
    $('#power-saving-status').text('on');
    updateTemperatureDisplayed();
    getImage();
  });

  $('#powersaving-off').click(function() {
    thermostat.switchPowerSavingModeOff();
    $('#power-saving-status').text('off');
    updateTemperatureDisplayed();
  });

  displayWeather('London')

  $('#select-city').submit(function(event) {
    event.preventDefault();
    var city = $('#current-city').val();
    var formatted_city = city.split(' ').join('+');
    displayWeather(formatted_city)
  })


  function getImage() {
    if (thermostat.temperature == 10) {
      document.getElementById("img").src="public/thermo-min.png"
    } else if (thermostat.temperature < 18) {
      document.getElementById("img").src="public/thermo-low.png"
    } else if (thermostat.temperature >= 18 &&
      thermostat.temperature < 25) {
      document.getElementById("img").src = "public/thermo-med.png";
    } else if (thermostat.temperature === 32) {
      document.getElementById("img").src = "public/thermo-full.png";
    } else {
       document.getElementById("img").src = "public/thermo-high.png";
    }
  };


  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
    var units = '&units=metric';
    $.get(url + token + units, function(data) {
      $('#current-temperature').text(data.main.temp);
    })
  }

  function updateTemperatureDisplayed() {
    $('#temperature').text("Current setting: " + thermostat.temperature);
    $('#temperature').attr('class', thermostat.energyUsage());
  };
})
