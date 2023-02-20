// FIXME : FIX THE PROBLEM THAT LINE DOES NOT BREAK WHEN USER ENTERS A BIG NUMBER

const operandFragments = [0];
let isCleared = true;
let isDotUsable = true;
let firstOperand = null;
let secondOperand = null;
let operator = null;
let displayTop = ``;
let displayBottom = `0`;
let evaluatedAlready = false;
let result = null;

main();

function main() {
    attachEventListenersToOperators();
    attachEventListenersToNumbers();
    attachEventListenerToDot();
    handleClearAndBackspace();
    evaluateExpressionOnClickToEquals();
    listenForKeyStrokes();
}

function clearPreviousExpression() {
    if (evaluatedAlready) {
        evaluatedAlready = false;
        firstOperand = result;
        result = null;
    }
}

function attachEventListenersToOperators() {
    const operatorNodeList = document.querySelectorAll(".operator");
    operatorNodeList.forEach((operatorButton) => {
        operatorButton.addEventListener("click", (e) => {
            if (
                firstOperand !== null &&
                operator !== null &&
                isOperandEligible()
            ) {
                document.querySelector("#evaluate").click();
            }
            if (isOperandEligible() && operator === null) {
                clearPreviousExpression();
                isDotUsable = true;
                displayBottom = ``;
                if (firstOperand === null) {
                    firstOperand = +operandFragments.join("");
                }
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
            if (evaluatedAlready) {
                clear();
                clearPreviousExpression();
            }
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
            evaluatedAlready = true;
            secondOperand = +operandFragments.join("");
            displayTop += ` ${secondOperand} ${equalsButton.textContent}`;
            result = +operate(firstOperand, operator, secondOperand);
            if (!Number.isInteger(result)) {
                result = parseFloat(result.toFixed(8));
            }
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
        if (evaluatedAlready) {
            clear();
            clearPreviousExpression();
        }
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
    result = null;
    updateDisplay();
}

function updateDisplay() {
    document.querySelector(".display-top>.text").textContent = displayTop;
    document.querySelector(".display-bottom>.text").textContent = displayBottom;
}

function isOperandEligible() {
    return operandFragments.length > 0;
}

function listenForKeyStrokes() {
    document.addEventListener("keypress", (e) => {
        let button = document.querySelector(
            `button[data-id="${e.key.toLowerCase()}"]`
        );
        if (button != null) {
            button.click();
        }
    });
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
            if (op1 == "0" && op2 != "0") {
                return 0;
            }
            if (op2 == "0") {
                alert("You cannot divide by 0. Will clear automatically.");
                clear();
            }
            return mod(op1, op2);
    }
}
