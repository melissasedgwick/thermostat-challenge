$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperatureDisplayed();
  $('#temperature-up').click(function(){
    thermostat.up();
    updateTemperatureDisplayed();
  });
  $('#temperature-down').click(function() {
    thermostat.down();
    updateTemperatureDisplayed();
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


  function updateTemperatureDisplayed() {
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.energyUsage());
  };
})
