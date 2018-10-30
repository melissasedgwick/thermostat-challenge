'use strict';

describe('Thermostat', function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe('default', function() {
    it('starts at 20 degrees', function() {
      expect(thermostat.currentTemperature()).toEqual(20);
    });
    it('has a minimum of 10 degrees', function() {
      for (var i = 0; i < 11; i++) {
        thermostat.down();
      }
      expect(thermostat.currentTemperature()).toEqual(10);
    });
    it('starts on power saving mode', function() {
      expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });
  });

  describe('up', function() {
    it('increases the temperature', function() {
      thermostat.up()
      expect(thermostat.currentTemperature()).toEqual(21);
    });
  });

  describe('down', function() {
    it('descreases the temperature', function() {
      thermostat.down()
      expect(thermostat.currentTemperature()).toEqual(19);
    });
  });

  describe('switch power saving mode off', function() {
    it('switches power saving mode off', function() {
      thermostat.switchPowerSavingModeOff()
      expect(thermostat.isPowerSavingModeOn()).toBe(false);
    });
  });

  describe('switch power saving mode on', function() {
    it('switches power saving mode on', function() {
      thermostat.switchPowerSavingModeOff
      thermostat.switchPowerSavingModeOn
      expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });
  });

  describe('when power saving mode is on', function() {
    it('has a maximum temperature of 25 degrees', function() {
      for (var i = 0; i < 6; i++) {
        thermostat.up();
      }
      expect(thermostat.currentTemperature()).toEqual(25);
    });
  });

  describe('when power saving mode is off', function() {
    it('has a maximum temperature of 32 degrees', function() {
      thermostat.switchPowerSavingModeOff()
      for (var i = 0; i < 13; i++) {
        thermostat.up();
      }
      expect(thermostat.currentTemperature()).toEqual(32);
    });
  });

  describe('reset temperature', function() {
    it('resets the temperature to 20 degrees', function() {
      for (var i = 0; i < 6; i++) {
        thermostat.up();
      }
      thermostat.resetTemperature()
      expect(thermostat.currentTemperature()).toEqual(thermostat.DEFAULT_TEMPERATURE);
    });
  });

  describe('energy usage', function() {
    it('is low usage when below 18 degrees', function() {
      for (var i = 0; i < 3; i++) {
        thermostat.down();
      }
      expect(thermostat.energyUsage()).toEqual('low-usage');
    });
    it('is medium usage when between 18 - 25 degrees', function() {
      expect(thermostat.energyUsage()).toEqual('medium-usage');
    });
    it('is high usage when above 25 degrees', function() {
      for (var i = 0; i < 6; i++) {
        thermostat.up();
      }
      expect(thermostat.energyUsage()).toEqual('high-usage');
    });
  });
});
