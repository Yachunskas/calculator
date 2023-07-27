let total = 0;
let buffer = "0";
let operator;
const screen = document.querySelector('#total');

function click(symbol) {
    if (isNaN(symbol)) {
        handleSymbol(symbol);
    }
    else {
        handleNumber(symbol);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    if (symbol === 'C') {
        buffer = "0";
        total = 0;
    }
    else if (symbol === '=') {
        if (operator === null) {
            return
        }
        flushOperation(parseInt(buffer, 10));
        operator = null;
        buffer = String(total);
        total = 0;
    }
    else if (symbol === '←') {
        if (String(Math.abs(parseInt(buffer, 10))).length === 1) {
            buffer = "0";
        }
        else {
            buffer = buffer.substring(0, buffer.length - 1);
        }
    }
    else {
        handleMath(symbol);
    }
} 

function handleMath(symbol) {
    if (buffer === "0") {
        return
    }
    const intBuffer = parseInt(buffer, 10);
    if (total === 0) {
        total = intBuffer
    }
    else {
        flushOperation(intBuffer)
    }
    operator = symbol;
    buffer = "0";
}

function flushOperation(value) {
    if (operator === '+') {
        total += value;
    }
    else if (operator === '-') {
        total -= value;
    }
    else if (operator === '×') {
        total *= value;
    }
    else {
        total /= value;
    }
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    }
    else {
        buffer += value;
    }
}

function init() {
    document.querySelector('.buttons').addEventListener('click', function(event){
        click(event.target.innerText);
    })
}

init();