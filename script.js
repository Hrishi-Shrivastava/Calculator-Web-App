const currentDisplay = document.getElementById('current-operand');
const previousDisplay = document.getElementById('previous-operand');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const equalsButton = document.getElementById('equals');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

function updateDisplay() {
    currentDisplay.innerText = currentOperand === '' ? '0' : currentOperand;
    if (operation != null) {
        previousDisplay.innerText = `${previousOperand} ${operation}`;
    } else {
        previousDisplay.innerText = '';
    }
}

function appendNumber(number) {
    
    if (number === '.' && currentOperand.includes('.')) return;
    if (number === '0' && currentOperand === '0') return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
}

function chooseOperation(op) {
    if (currentOperand === '' && currentDisplay.innerText === 'Error') {
        clear();
        return;
    }
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                computation = 'Error';
            } else {
                computation = prev / current;
            }
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }

    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    if (currentOperand === 'Error') {
        clear();
        return;
    }
    currentOperand = currentOperand.toString().slice(0, -1);
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.dataset.number);
        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.dataset.action);
        updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    compute();
    updateDisplay();
});

clearButton.addEventListener('click', () => {
    clear();
});

deleteButton.addEventListener('click', () => {
    deleteNumber();
    updateDisplay();
});
