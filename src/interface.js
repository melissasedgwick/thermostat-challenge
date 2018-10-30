$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperatureDisplayed();
  getImage()
  $('#temperature-up').click(function(){
    thermostat.up();
    updateTemperatureDisplayed();
    getImage()
  });
  $('#temperature-down').click(function() {
    thermostat.down();
    updateTemperatureDisplayed();
    getImage()
  });

  $('#temperature-reset').click(function() {
    thermostat.resetTemperature();
    updateTemperatureDisplayed();
  });

  $('#powersaving-on').click(function() {
    thermostat.switchPowerSavingModeOn();
    $('#power-saving-status').text('on');
    updateTemperatureDisplayed();
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
    if (thermostat.temperature < 18) {
      document.getElementById("img").src="public/thermo_low.jpeg"
    } else if (thermostat.temperature >= 18 &&
      thermostat.temperature < 25) {
      document.getElementById("img").src = "public/thermo_med.jpeg";
    } else {
       document.getElementById("img").src = "public/thermo_high.jpeg";
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
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.energyUsage());
  };
})
