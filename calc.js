// configure the default type of numbers as Fractions
math.config({
  number: 'Fraction' // Default type of number:
  // 'number' (default), 'BigNumber', or 'Fraction'
})


function print(value) {
  return (math.format(value, {
    fraction: 'decimal'
  }))
}

const calculator = {
  _currentValue: '',
  _storedValue: '',
  _currentOperation: '',
  _calcReturned: false,

  set currentValue(newValue) {
    this._currentValue = newValue;
  },

  set storedValue(newValue) {
    this._storedValue = newValue;
  },

  set currentOperation(newValue) {
    this._currentOperation = newValue;
  },

  set calcReturned(newValue) {
    this._calcReturned = newValue;
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

  get calcReturned() {
    return this._calcReturned;
  }
}

const addToCurrentValue = (newValue) => {
  calculator._currentValue += newValue;
};

const currentToStored = () => {
  calculator.storedValue = calculator.currentValue;
  calculator.currentValue = ''
};

const addCalc = (stringA, stringB) => {
  return print(math.add(math.fraction(parseFloat(stringA)), math.fraction(parseFloat(stringB))));
};

const subtractCalc = (stringA, stringB) => {
  return print(math.subtract(math.fraction(parseFloat(stringA)), math.fraction(parseFloat(stringB))));
};

const multiplyCalc = (stringA, stringB) => {
  return print(math.multiply(math.fraction(parseFloat(stringA)), math.fraction(parseFloat(stringB))));
};

const divideCalc = (stringA, stringB) => {
  return print(math.divide(math.fraction(parseFloat(stringA)), math.fraction(parseFloat(stringB))));
};

const runCalulation = (operation) => {
  switch (operation) {
    case 'multiply':
      return multiplyCalc(calculator.storedValue, calculator.currentValue);
    case 'divide':
      return divideCalc(calculator.storedValue, calculator.currentValue);
    case 'add':
      return addCalc(calculator.storedValue, calculator.currentValue);
    case 'sub':
      return subtractCalc(calculator.storedValue, calculator.currentValue);
  }
}

const updateScreen = (value) => {
  document.getElementById('screen').textContent = value;
}


const buttonOnClick = (evt) => {
  if (evt.target.dataset.number && !calculator.calcReturned) {
    addToCurrentValue(evt.target.value);
    updateScreen(calculator.currentValue);
  } else if (evt.target.dataset.number && calculator.calcReturned) {
    currentToStored();
    calculator.calcReturned = false;
    addToCurrentValue(evt.target.value);
    updateScreen(calculator.currentValue);
  }

  if (evt.target.dataset.action) {
    if (calculator.currentValue !== '' && calculator.storedValue !== '') {
      calculator.currentValue = runCalulation(calculator.currentOperation);
      updateScreen(calculator.currentValue);
      calculator.storedValue = ''
      calculator.currentOperation = evt.target.dataset.action
      calculator.calcReturned = true;
    } else {
      calculator.currentOperation = evt.target.dataset.action
      calculator.calcReturned = true;
    }
  }

  if (evt.target.dataset.sum === 'equals' && calculator.currentValue !== '' && calculator.storedValue !== '') {
    calculator.currentValue = runCalulation(calculator.currentOperation);
    updateScreen(calculator.currentValue);
    calculator.calcReturned = false;
    calculator.storedValue = ''
  }

  if (evt.target.dataset.delete === 'clear') {
    calculator.currentValue = '';
    updateScreen(0);
    calculator.calcReturned = false;
  }

  if (evt.target.dataset.delete === 'all-clear') {
    calculator.currentValue = '';
    calculator.storedValue = '';
    updateScreen(0);
    calculator.calcReturned = false;
  }

}

const eventListeners = () => {
  const calculatorID = document.getElementById('calculator');
  calculatorID.addEventListener('click', buttonOnClick)
}

eventListeners();