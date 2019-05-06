const math = require('mathjs');

const calculator = {
  _currentValue: '',
  _storedValue: '',
  _currentOperation: '',

  set currentValue(newValue) {
    this._currentValue += newValue;
  },

  set storedValue(newValue) {
    this._storedValue = newValue;
  },

  set currentOperation(newValue) {
    this._currentOperation = newValue;
  },

  get currentValue() {
    return this._currentValue;
  },

  get storedValue() {
    return this._storedValue;
  },

  get currentOperation() {
    return this._currentOperation;
  },

  currentToStored() {
    this.storedValue = this.currentValue;
  },

  addition(num1, num2) {
    num1 + num2
  },

  subtraction(num1, num2) {
    num1 - num2;
  },

  multiplication(num1, num2) {
    num1 * num2;
  },

  division(num1, num2) {
    num1 / num2;
  },

}

math.config({
  number: 'Fraction' // Default type of number:
  // 'number' (default), 'BigNumber', or 'Fraction'
})


print(math.add(math.fraction(0.1), math.fraction(0.2)))

function print(value) {
  console.log(math.format(value, {
    fraction: 'decimal'
  }))
}


console.log(calculator._currentValue)
calculator.currentValue = '7'
calculator.currentValue = '4'
console.log(calculator._currentValue)