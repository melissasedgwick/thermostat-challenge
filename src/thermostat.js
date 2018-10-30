'use strict';

function Thermostat() {
  this.DEFAULT_TEMPERATURE = 20;
  this.MINIMUM_TEMPERATURE = 10;
  this.MAXIMUM_TEMPERATURE_PSM = 25;
  this.MAXIMUM_TEMPERATURE_PSM_OFF = 32;
  this.MEDIUM_USAGE_LIMIT = 18;
  this.powerSavingMode = true;
  this.temperature = this.DEFAULT_TEMPERATURE;
}

Thermostat.prototype.currentTemperature = function() {
  return this.temperature;
};

Thermostat.prototype.up = function() {
  if (this.isMaximumTemperature()) { return; }
  this.temperature += 1;
};

Thermostat.prototype.down = function() {
  if (this.isMinimumTemperature()) { return; }
  this.temperature -= 1;
};

Thermostat.prototype.isMinimumTemperature = function() {
  return this.temperature === this.MINIMUM_TEMPERATURE;
};

Thermostat.prototype.isMaximumTemperature = function () {
  if (this.isPowerSavingModeOn() === true) {
    return this.temperature === this.MAXIMUM_TEMPERATURE_PSM;
  }
  return this.temperature === this.MAXIMUM_TEMPERATURE_PSM_OFF;
};

Thermostat.prototype.isPowerSavingModeOn = function() {
  return this.powerSavingMode;
};

Thermostat.prototype.switchPowerSavingModeOff = function() {
  this.powerSavingMode = false;
};

Thermostat.prototype.switchPowerSavingModeOn = function () {
  if (this.temperature > this.MAXIMUM_TEMPERATURE_PSM) {
    this.temperature = this.MAXIMUM_TEMPERATURE_PSM
  }
  this.powerSavingMode = true;
};

Thermostat.prototype.resetTemperature = function() {
  this.temperature = this.DEFAULT_TEMPERATURE;
};

Thermostat.prototype.energyUsage = function() {
  if (this.temperature < this.MEDIUM_USAGE_LIMIT) {
    return 'low-usage';
  }
  if (this.temperature >= this.MEDIUM_USAGE_LIMIT &&
    this.temperature < this.MAXIMUM_TEMPERATURE_PSM
  ) {
    return 'medium-usage';
  }
  return 'high-usage';
};
