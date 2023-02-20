// TODO: FIX THE PROBLEM THAT LINE DOES NOT BREAK WHEN USER ENTERS A BIG NUMBER

const operandFragments = [0];
let isCleared = true;
let isDotUsable = true;
let firstOperand = null;
let secondOperand = null;
let operator = null;
let displayTop = ``;
let displayBottom = `0`;

main();

function main() {
    attachEventListenersToOperators();
    attachEventListenersToNumbers();
    attachEventListenerToDot();
    handleClearAndBackspace();
    evaluateExpressionOnClickToEquals();
}

function attachEventListenersToOperators() {
    const operatorNodeList = document.querySelectorAll(".operator");
    operatorNodeList.forEach((operatorButton) => {
        operatorButton.addEventListener("click", (e) => {
            if (isOperandEligible() && operator === null) {
                isDotUsable = true;
                displayBottom = ``;
                firstOperand = +operandFragments.join("");
                operator = operatorButton.textContent;
                displayTop = `${firstOperand} ${operator}`;
                operandFragments.splice(0, operandFragments.length);
                updateDisplay();
            }
        });
    });
}

function attachEventListenersToNumbers() {
    const numberNodeList = document.querySelectorAll(".number");
    numberNodeList.forEach((number) => {
        number.addEventListener("click", (e) => {
            if (isCleared) {
                isCleared = false;
                if (number.textContent !== "0") {
                    operandFragments.pop();
                    displayBottom = ``;
                }
            }
            operandFragments.push(number.textContent);
            displayBottom += `${number.textContent}`;
            updateDisplay();
        });
    });
}

function evaluateExpressionOnClickToEquals() {
    const equalsButton = document.querySelector("#evaluate");
    equalsButton.addEventListener("click", (e) => {
        if (firstOperand !== null && operator !== null && isOperandEligible()) {
            secondOperand = +operandFragments.join("");
            displayTop += ` ${secondOperand} ${equalsButton.textContent}`;
            let result = +operate(firstOperand, operator, secondOperand);
            result = result.toFixed(8);
            firstOperand = null;
            operator = null;
            secondOperand = null;
            if (isFinite(result) && !isNaN(result)) {
                displayBottom = `${result}`;
                updateDisplay();
            }
        }
    });
}

function attachEventListenerToDot() {
    const dot = document.querySelector("#dot");
    dot.addEventListener("click", (e) => {
        if (isDotUsable) {
            isDotUsable = false;
            if (isCleared) {
                isCleared = false;
            }
            if (operandFragments.length === 0) {
                operandFragments.push("0");
                displayBottom += "0";
            }
            operandFragments.push(dot.textContent);
            displayBottom += `${dot.textContent}`;
            updateDisplay();
        }
    });
}

function handleClearAndBackspace() {
    const clearButton = document.querySelector("#clear");
    const deleteButton = document.querySelector("#delete");
    clearButton.addEventListener("click", (e) => {
        if (!isCleared) {
            clear();
            updateDisplay();
        }
    });
    deleteButton.addEventListener("click", (e) => {
        if (!isCleared && isOperandEligible()) {
            let deleted = operandFragments.pop();
            if (deleted == ".") {
                isDotUsable = true;
            }
            displayBottom =
                displayBottom.length > 1
                    ? displayBottom.substring(0, displayBottom.length - 1)
                    : ``;
            updateDisplay();
        }
    });
}

function clear() {
    operandFragments.splice(0, operandFragments.length);
    operandFragments.push(0);
    isCleared = true;
    isDotUsable = true;
    firstOperand = null;
    secondOperand = null;
    operator = null;
    displayTop = ``;
    displayBottom = `0`;
    updateDisplay();
}

function updateDisplay() {
    document.querySelector(".display-top>.text").textContent = displayTop;
    document.querySelector(".display-bottom>.text").textContent = displayBottom;
}

function isOperandEligible() {
    return operandFragments.length > 0;
}

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

function operate(op1, operator, op2) {
    switch (operator) {
        case "+":
            return add(op1, op2);

        case "-":
            return subtract(op1, op2);

        case "*":
            return multiply(op1, op2);

        case "/":
            if (op2 == "0") {
                alert("You cannot divide by 0. Will clear automatically.");
                clear();
            }
            return divide(op1, op2);

        case "%":
            return mod(op1, op2);
    }
}
