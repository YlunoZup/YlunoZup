const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalButton = document.getElementById('equal');

let currentInput = '';
let currentOperator = '';
let previousValue = '';

// Function to handle input from buttons or keyboard
function handleInput(value) {
  if (!isNaN(value) || value === '.') { // If it's a number or decimal
    currentInput += value;
    display.value = currentInput;
  } else if (value === 'C') { // Handle clear
    clearCalculator();
  } else if (value === '=') { // Handle equal
    calculateResult();
  } else if (['+', '-', '*', '/'].includes(value)) { // Handle operators
    if (currentInput === '') return;
    previousValue = currentInput;
    currentOperator = value;
    currentInput = '';
  }
}

// Event listener for button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    handleInput(button.value);
  });
});

// Event listener for keyboard input
document.addEventListener('keydown', (event) => {
  const key = event.key;

  // Map keyboard keys to calculator functionality
  if (!isNaN(key) || key === '.') { // Number or decimal input
    handleInput(key);
  } else if (['+', '-', '*', '/'].includes(key)) { // Operators
    handleInput(key);
  } else if (key === 'Enter' || key === '=') { // Equal key
    handleInput('=');
  } else if (key === 'Backspace' || key.toLowerCase() === 'c') { // Clear (C or Backspace)
    handleInput('C');
  }
});

// Clear function
function clearCalculator() {
  currentInput = '';
  previousValue = '';
  currentOperator = '';
  display.value = '';
}

// Equal (calculate) function
function calculateResult() {
  if (!previousValue || !currentInput || !currentOperator) return;

  const firstNumber = parseFloat(previousValue);
  const secondNumber = parseFloat(currentInput);
  let result = '';

  switch (currentOperator) {
    case '+':
      result = firstNumber + secondNumber;
      break;
    case '-':
      result = firstNumber - secondNumber;
      break;
    case '*':
      result = firstNumber * secondNumber;
      break;
    case '/':
      result = firstNumber / secondNumber;
      break;
    default:
      return;
  }

  display.value = result;
  currentInput = result;
  previousValue = '';
  currentOperator = '';
}
