const calculatorDisplay = document.querySelector('h1')
const inputBtns = document.querySelectorAll('button')
const clearBtn = document.getElementById('clear-btn')
const decimalBtn = document.querySelector('.decimal')
const equalBtn = document.querySelector('.equal-sign')

// let numberInput = false;
let curNumber = '0';
let value = 0;
let op;
let equalClicked = false;
let numberCount = 0;

const sendNumberValue = (number) => {
  if (equalClicked) {
    clearBtn.click();
    equalClicked = false;
  }
  if (curNumber === '0' && !numberCount) {
    if (number !== '0') {
      curNumber = number.toString();
      calculatorDisplay.textContent = number;
    }
  } else {
    curNumber += number.toString()
    calculatorDisplay.textContent += number;
  }
}

const getNewValue = (operator) => {
  curNumber = Number(curNumber)
  if (!numberCount) {
    value = curNumber;
    numberCount++
  } else {
    numberCount++
    switch (operator) {
      case '+':
        value += curNumber
        break;
      case '-':
        value -= curNumber
        break;
      case '×':
        value *= curNumber
        break;
      case '÷':
        value /= curNumber
        break;
      default:
        break;
    }
  }
}

const sendOperator = (operator) => {
  if (!equalClicked) {
    getNewValue(op);
    curNumber = '0';
    op = operator;
  } else {
    numberCount = 1;
    curNumber = '0';
    op = operator;
    equalClicked = false;
  }
  calculatorDisplay.textContent = `${Math.round(value) === value ? value : value.toPrecision(3)} ${op} `;
}

const sendDecimal = () => {
  let index;
  index = curNumber.toString().indexOf('.')
  if (index === -1) {
    calculatorDisplay.textContent += '.'
    curNumber += '.'
  }
}

inputBtns.forEach((btn) => {
  if (!btn.classList.length) {
    btn.setAttribute('onclick', `sendNumberValue(${btn.value})`)
  } else if (btn.className === 'operator') {
    btn.setAttribute('onclick', `sendOperator("${btn.textContent}")`)
  }
})


clearBtn.addEventListener('click', () => {
  curNumber = '0';
  value = 0;
  numberCount = 0;
  calculatorDisplay.textContent = curNumber;
  equalClicked = false;
})

equalBtn.addEventListener('click', () => {
  getNewValue(op);
  calculatorDisplay.textContent = Math.round(value) === value ? value : value.toPrecision(3);
  equalClicked = true;
  curNumber = value;
})

decimalBtn.addEventListener('click', sendDecimal)
