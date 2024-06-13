"use strict";
let firstNumber = "";
let secondNumber = "";
let operator = "";
let value = "";

const displayText = document.querySelector(".displayText");
const btnClear = document.querySelector(".btnClear");
const btnEquals = document.querySelector(".btnOperatorEquals");
const btnNumber = document.querySelectorAll(".btnNumber");
const btnOperator = document.querySelectorAll(".btnOperator");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(firstNumber, operator, secondNumber) {
  if (operator === "+") return add(firstNumber, secondNumber);
  if (operator === "-") return subtract(firstNumber, secondNumber);
  if (operator === "*") return multiply(firstNumber, secondNumber);
  if (operator === "/") return divide(firstNumber, secondNumber);
}

function displayVal(e) {
  if (!value.length && e.target.value === ".") return;

  value =
    e.target.value === "." && value.length > 1
      ? value.includes(".")
        ? value
        : value + e.target.value
      : value + e.target.value;
  displayText.textContent = value;

  if (!operator) {
    firstNumber = +value;
  } else {
    secondNumber = +value;
  }
  btnEquals.disabled = false;
}

function addOperator(e) {
  if (!firstNumber) return;

  value = "";
  operator = e.target.value;
  secondNumber = "";
}

function calculate() {
  firstNumber = operate(firstNumber, operator, secondNumber);
  value = firstNumber;
  displayText.textContent =
    firstNumber % 2 === 0 ? firstNumber : firstNumber.toFixed(2);

  operator = "";
  value = "";

  if (firstNumber === Infinity) {
    displayText.textContent = "Woops, you can't divide by 0";
    return;
  }

  if (firstNumber === undefined) {
    displayText.textContent = "0";
  }

  btnEquals.disabled = true;
}

function clearToInit() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  value = "";
  displayText.textContent = "0";
}

btnNumber.forEach((btn) => {
  btn.addEventListener("click", displayVal);
});

btnOperator.forEach((btn) => {
  btn.addEventListener("click", addOperator);
});

btnEquals.addEventListener("click", calculate);

btnClear.addEventListener("click", clearToInit);
