// math.js configuration settings and formatting function. This is used to fix the base-10 to base-2 fraction problems.
math.config({
  number: "Fraction"
});

const mathFormat = value => {
  return math.format(value, {
    fraction: "decimal"
  });
};

//Calculator object used as shared state for calc operations with getters and setters.

const calculator = {
  _currentValue: "",
  _storedValue: "",
  _currentOperation: "",
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
};

// Core math calculations

const addCalc = (stringA, stringB) => {
  return math.add(
    math.fraction(parseFloat(stringA)),
    math.fraction(parseFloat(stringB))
  );
};

const subtractCalc = (stringA, stringB) => {
  return math.subtract(
    math.fraction(parseFloat(stringA)),
    math.fraction(parseFloat(stringB))
  );
};

const multiplyCalc = (stringA, stringB) => {
  return math.multiply(
    math.fraction(parseFloat(stringA)),
    math.fraction(parseFloat(stringB))
  );
};

const divideCalc = (stringA, stringB) => {
  return math.divide(
    math.fraction(parseFloat(stringA)),
    math.fraction(parseFloat(stringB))
  );
};

// Calculate and return percentages

const percentCalc = (stringA, stringB, operator) => {
  switch (operator) {
    case "multiply":
      return mathFormat(multiplyCalc(stringA, divideCalc(stringB, "100")));
    case "divide":
      return mathFormat(multiplyCalc(stringA, divideCalc(stringB, "100")));
    case "add":
      return mathFormat(divideCalc(multiplyCalc(stringA, stringB), "100"));
    case "sub":
      return mathFormat(divideCalc(multiplyCalc(stringA, stringB), "100"));
  }
};

//Check object operator storage to call correct calculation

const runCalulation = (stringA, stringB, operation) => {
  switch (operation) {
    case "multiply":
      return mathFormat(multiplyCalc(stringA, stringB));
    case "divide":
      return mathFormat(divideCalc(stringA, stringB));
    case "add":
      return mathFormat(addCalc(stringA, stringB));
    case "sub":
      return mathFormat(subtractCalc(stringA, stringB));
  }
};

//Helper functions to update calc object information and DOM

const addToCurrentValue = (currentValue, newValue) => {
  const filteredNewValue = oneDecimalOnly(currentValue, newValue);
  currentValue += filteredNewValue;
  calculator.currentValue = currentValue;
  return currentValue;
};

const currentToStored = () => {
  calculator.storedValue = calculator.currentValue;
  calculator.currentValue = "";
};

const oneDecimalOnly = (currentValue, valueToUpdate) => {
  if (currentValue.includes(".") && valueToUpdate === ".") {
    return "";
  } else {
    return valueToUpdate;
  }
};

const updateScreen = value => {
  document.getElementById("screen").textContent = value;
};

// Operator and clear button functions.

const allClear = () => {
  clear();
  calculator.storedValue = "";
};

const clear = () => {
  calculator.currentValue = "";
  updateScreen(0);
  calculator.calcReturned = false;
};

const setCurrentOperator = operator => {
  calculator.currentOperation = operator;
  calculator.calcReturned = true;
};

const calcOnEquals = (stringA, stringB, operator) => {
  calculator.currentValue = runCalulation(stringA, stringB, operator);
  updateScreen(calculator.currentValue);
  calculator.calcReturned = false;
  calculator.storedValue = "";
};

const calcOnOperator = (stringA, stringB, operator) => {
  calculator.currentValue = runCalulation(stringA, stringB, operator);
  updateScreen(calculator.currentValue);
  calculator.storedValue = "";
  setCurrentOperator(operator);
};

//Listener logic

const buttonOnClick = evt => {
  if (evt.target.dataset.number) {
    if (!calculator.calcReturned) {
      updateScreen(
        addToCurrentValue(calculator.currentValue, evt.target.value)
      );
    } else {
      currentToStored();
      calculator.calcReturned = false;
      updateScreen(
        addToCurrentValue(calculator.currentValue, evt.target.value)
      );
    }
  }

  if (evt.target.dataset.action) {
    if (calculator.currentValue !== "" && calculator.storedValue !== "") {
      calcOnOperator(
        calculator.storedValue,
        calculator.currentValue,
        evt.target.dataset.action
      );
    } else {
      setCurrentOperator(evt.target.dataset.action);
    }
  }

  if (
    evt.target.dataset.sum === "equals" &&
    calculator.currentValue !== "" &&
    calculator.storedValue !== ""
  ) {
    calcOnEquals(
      calculator.storedValue,
      calculator.currentValue,
      calculator.currentOperation
    );
  }

  if (
    evt.target.dataset.sum === "percent" &&
    calculator.currentValue !== "" &&
    calculator.storedValue !== ""
  ) {
    calculator.currentValue = percentCalc(
      calculator.storedValue,
      calculator.currentValue,
      calculator.currentOperation
    );
    updateScreen(calculator.currentValue);
  }

  if (evt.target.dataset.delete === "clear") {
    clear();
  }

  if (evt.target.dataset.delete === "all-clear") {
    allClear();
  }
};

const eventListeners = () => {
  const calculatorID = document.getElementById("calculator");
  calculatorID.addEventListener("click", buttonOnClick);
};

eventListeners();
