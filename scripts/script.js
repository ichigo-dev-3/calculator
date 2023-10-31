let operandOne = '';
let operandTwo = '';
let operator = null;
let displayClear = false;

const display = document.querySelector('.display');
const numBtns = document.querySelectorAll('.num-btn');
const operBtns = document.querySelectorAll('.opr-btn');
const btnEqauls = document.querySelector('.btneqauls');
const btnClr = document.querySelector('.btnclear');
const btnDec = document.querySelector('.btndeci');
const btnBack = document.querySelector('.btnback')

const operatorEvent = (oper) => {
  if (operator !== null) equalEvent();
  operator = oper;
  operandOne = display.textContent;
  displayClear = true;
};

const equalEvent = () => {
  if (operator === null || displayClear) return;
  if (operator === '÷' && display.textContent === '0') {
    alert("You can't divide by 0 !!");
    return;
  }
  operandTwo = display.textContent;
  display.textContent = roundDecimal(operate(operandOne, operator, operandTwo));
  operator = null;
};

const numCombiner = (num) => {
  if (display.textContent === '0' || displayClear) clearDisplay();
  display.textContent += num;
};

const clearDisplay = () => {
  display.textContent = '';
  displayClear = false;
};

const clearEvent = () => {
  display.textContent = '0';
  operandOne = '';
  operandTwo = '';
  operator = null;
};

const addDecimal = () => {
  if (displayClear) clearDisplay();
  if (display.textContent === '') display.textContent = '0';
  if (display.textContent.includes('.')) return;
  display.textContent += '.';
};

const roundDecimal = (number) => {
  return Math.round(number * 1000) / 1000;
};

const deleteNumber = () => {
  display.textContent = display.textContent.toString().slice(0, -1)
}

const add = (num1, num2) => {
  return num1 + num2;
};
const substract = (num1, num2) => {
  return num1 - num2;
};
const multiply = (num1, num2) => {
  return num1 * num2;
};
const divide = (num1, num2) => {
  return num1 / num2;
};

const convertOperator = (operatorKey) => {
  if (operatorKey === '/') return '÷'
  if (operatorKey === '*') return 'x'
  if (operatorKey === '+') return '+'
  if (operatorKey === '-') return '-'
}

const operate = (num1, operator, num2) => {
  num1 = Number(num1);
  num2 = Number(num2);
  switch (operator) {
    case '+':
      return add(num1, num2);

    case '-':
      return substract(num1, num2);

    case 'x':
      return multiply(num1, num2);

    case '÷':
      if (num2 === 0) return null;
      else return divide(num1, num2);
  }
};

const keyboardEvent = (k) => {
  if (k.key >= 0 && k.key <= 9) numCombiner(k.key)
  if (k.key === '.') addDecimal()
  if (k.key === '=' || k.key === 'Enter') equalEvent()
  if (k.key === 'Backspace') deleteNumber()
  if (k.key === 'Escape') clearEvent()
  if (k.key === '+' || k.key === '-' || k.key === '*' || k.key === '/') operatorEvent(convertOperator(k.key))
} 


window.addEventListener('keydown', keyboardEvent)
numBtns.forEach((button) => {
  button.addEventListener('click', () => numCombiner(button.textContent));
});

operBtns.forEach((button) => {
  button.addEventListener('click', () => operatorEvent(button.textContent));
});

btnEqauls.addEventListener('click', equalEvent);
btnClr.addEventListener('click', clearEvent);
btnDec.addEventListener('click', addDecimal);
btnBack.addEventListener('click', deleteNumber)
