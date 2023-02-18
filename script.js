const operands = [];
let display = ``;

function main() {}

function attachEventListeners() {}

function add(op1, op2) {
    return op1 + op2;
}
function subtract(op1, op2) {
    return op1 - op2;
}

function multiply(op1, op2) {
    return op1 * op2;
}

function divide(op1, op2) {
    return op1 / op2;
}

function mod(op1, op2) {
    return op1 % op2;
}

function operate(op1, operand, op2) {
    switch (operand) {
        case "+":
            return add(op1, op2);

        case "-":
            return subtract(op1, op2);

        case "*":
            return multiply(op1, op2);

        case "/":
            return divide(op1, op2);

        case "%":
            return mod(op1, op2);
    }
}
