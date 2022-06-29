const wrapper = document.getElementById("wrapper");
const answer = document.getElementById("answer");

const calculator = {
  displayValue: "0",
  oldNum: null,
  waitingForNewNum: false,
  operator: null,
};

function updateDisplay() {
  answer.innerHTML = calculator.displayValue;
}

function inputNumber(num) {
  if (calculator.waitingForNewNum === true) {
    calculator.displayValue = num;
    calculator.waitingForNewNum = false;
  } else {
    calculator.displayValue =
      calculator.displayValue === "0" ? num : calculator.displayValue + num;
  }
}

function inputDecimal(dot) {
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(op) {
  const input = parseFloat(calculator.displayValue);
  if (calculator.displayValue === "0" && op === "-") {
    calculator.displayValue = op;
    return;
  }
  if (calculator.waitingForNewNum) {
    calculator.operator = op;
    return;
  }
  if (calculator.oldNum === null && !isNaN(input)) {
    calculator.oldNum = input;
  } else if (calculator.operator) {
    const result = calculate(calculator.oldNum, calculator.operator, input);
    calculator.displayValue = result;
    calculator.oldNum = result;
  }
  calculator.waitingForNewNum = true;
  calculator.operator = op;
}

function calculate(oldNum, operator, newNum) {
  switch (operator) {
    case "+":
      return oldNum + newNum;
    case "-":
      return oldNum - newNum;
    case "x":
      return oldNum * newNum;
    case "÷":
      return oldNum / newNum;
    case "=":
      return newNum;
  }
}

function clear() {
  calculator.displayValue = "0";
  calculator.oldNum = null;
  calculator.waitingForNewNum = false;
  calculator.operator = null;
}

wrapper.onclick = function (event) {
  if (event.target.className === "symbol") {
    handleOperator(event.target.textContent);
    updateDisplay();
    console.log(calculator);
  }
  if (event.target.className === "number") {
    inputNumber(event.target.textContent);
    updateDisplay();
    console.log(calculator);
  }
  if (event.target.id === "clear") {
    clear();
    updateDisplay();
  }
  if (event.target.id === "decimal") {
    inputDecimal(event.target.textContent);
    updateDisplay();
  }
};
