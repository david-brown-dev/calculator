// configure the default type of numbers as Fractions
math.config({
  number: 'Fraction' // Default type of number:
  // 'number' (default), 'BigNumber', or 'Fraction'
})


const mathFormat = (value) => {
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
  return calculator.currentValue += newValue;
};

const currentToStored = () => {
  calculator.storedValue = calculator.currentValue;
  calculator.currentValue = ''
};

const addCalc = (stringA, stringB) => {
  return math.add(math.fraction(parseFloat(stringA)), math.fraction(parseFloat(stringB)));
};

const subtractCalc = (stringA, stringB) => {
  return math.subtract(math.fraction(parseFloat(stringA)), math.fraction(parseFloat(stringB)));
};

const multiplyCalc = (stringA, stringB) => {
  return math.multiply(math.fraction(parseFloat(stringA)), math.fraction(parseFloat(stringB)));
};

const divideCalc = (stringA, stringB) => {
  return math.divide(math.fraction(parseFloat(stringA)), math.fraction(parseFloat(stringB)));
};

const percentCalc = (stringA, stringB, operator) => {
  switch (operator) {
    case 'multiply':
      return mathFormat(multiplyCalc(stringA, divideCalc(stringB, '100')));
    case 'divide':
      return mathFormat(multiplyCalc(stringA, divideCalc(stringB, '100')));
    case 'add':
      return mathFormat(divideCalc(multiplyCalc(stringA, stringB), '100'));
    case 'sub':
      return mathFormat(divideCalc(multiplyCalc(stringA, stringB), '100'));
  }
}

const runCalulation = (stringA, stringB, operation) => {
  switch (operation) {
    case 'multiply':
      return mathFormat(multiplyCalc(stringA, stringB));
    case 'divide':
      return mathFormat(divideCalc(stringA, stringB));
    case 'add':
      return mathFormat(addCalc(stringA, stringB));
    case 'sub':
      return mathFormat(subtractCalc(stringA, stringB));
  }
}

const updateScreen = (value) => {
  document.getElementById('screen').textContent = value;
}

const allClear = () => {
  clear();
  calculator.storedValue = '';
}

const clear = () => {
  calculator.currentValue = '';
  updateScreen(0);
  calculator.calcReturned = false;
}

const setCurrentOperator = (operator) => {
  calculator.currentOperation = operator
  calculator.calcReturned = true;
}

const calcOnEquals = (stringA, stringB, operator) => {
  calculator.currentValue = runCalulation(stringA, stringB, operator);
  updateScreen(calculator.currentValue);
  calculator.calcReturned = false;
  calculator.storedValue = ''
}

const calcOnOperator = (stringA, stringB, operator) => {
  calculator.currentValue = runCalulation(stringA, stringB, operator);
  updateScreen(calculator.currentValue);
  calculator.storedValue = ''
  setCurrentOperator(operator)
}


const buttonOnClick = (evt) => {
  if (evt.target.dataset.number) {
    if (!calculator.calcReturned) {
      updateScreen(addToCurrentValue(evt.target.value));
    } else {
      currentToStored();
      calculator.calcReturned = false;
      updateScreen(addToCurrentValue(evt.target.value));
    }
  }

  if (evt.target.dataset.action) {
    if (calculator.currentValue !== '' && calculator.storedValue !== '') {
      calcOnOperator(calculator.storedValue, calculator.currentValue, evt.target.dataset.action);
    } else {
      setCurrentOperator(evt.target.dataset.action)
    }
  }

  if (evt.target.dataset.sum === 'equals' && calculator.currentValue !== '' && calculator.storedValue !== '') {
    calcOnEquals(calculator.storedValue, calculator.currentValue, calculator.currentOperation);
  }

  if (evt.target.dataset.sum === 'percent' && calculator.currentValue !== '' && calculator.storedValue !== '') {
    calculator.currentValue = percentCalc(calculator.storedValue, calculator.currentValue, calculator.currentOperation);
    updateScreen(calculator.currentValue)
  }

  if (evt.target.dataset.delete === 'clear') {
    clear();
  }

  if (evt.target.dataset.delete === 'all-clear') {
    allClear();
  }

}

const eventListeners = () => {
  const calculatorID = document.getElementById('calculator');
  calculatorID.addEventListener('click', buttonOnClick)
}

eventListeners();