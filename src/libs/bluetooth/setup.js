const util = require('util')
const bleno = require('bleno')

const BlenoCharacteristic = bleno.Characteristic

const SetupCharacteristic = function() {
  SetupCharacteristic.super_.call(this, {
    uuid: '4454c36c-92fe-45ce-a852-e483aa7998c1',
    properties: ['write'],
    value: null
  })

  this._value = new Buffer(0)
  this._updateValueCallback = null
  this._onChange = null
  this._onReceiveSetup = null
}

util.inherits(SetupCharacteristic, BlenoCharacteristic)

SetupCharacteristic.prototype.onWriteRequest = function(
  data,
  offset,
  withoutResponse,
  callback
) {
  console.log(
    'SetupCharacteristic - onWriteRequest: value = ' + data.toString()
  )
  const setup = JSON.parse(data.toString())
  console.log(setup)
  if (setup) {
    console.log(this._onReceiveSetup)
    if (this._onReceiveSetup) {
      this._onReceiveSetup(setup)
    }
  }

  callback(this.RESULT_SUCCESS)
}

SetupCharacteristic.prototype.addChangeListener = function(callback) {
  this._onChange = callback
}


SetupCharacteristic.prototype.setReceiveSetupListener = function(callback) {
  this._onReceiveSetup = callback
}

module.exports = SetupCharacteristic
