import Elements from "./Elements";
import Screen from "./Screen";
import styles from "./Calculator.module.css";

let leftNumbers = [];
let rightNumbers = [];

let isDivideClicked = false;
let isMultiplyClicked = false;
let isSubtractClicked = false;
let isAdditionClicked = false;
let isEqualClicked = false;

const onClickSeven = () => {
  if (
    !isDivideClicked &&
    !isMultiplyClicked &&
    !isSubtractClicked &&
    !isAdditionClicked &&
    !isEqualClicked
  ) {
    leftNumbers.push(7);
    let currentNumber = parseInt(leftNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  } else {
    rightNumbers.push(7);
    let currentNumber = parseInt(rightNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  }
};

const onClickEight = () => {
  if (
    !isDivideClicked &&
    !isMultiplyClicked &&
    !isSubtractClicked &&
    !isAdditionClicked &&
    !isEqualClicked
  ) {
    leftNumbers.push(8);
    let currentNumber = parseInt(leftNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  } else {
    rightNumbers.push(8);
    let currentNumber = parseInt(rightNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  }
};

const onClickNine = () => {
  if (
    !isDivideClicked &&
    !isMultiplyClicked &&
    !isSubtractClicked &&
    !isAdditionClicked &&
    !isEqualClicked
  ) {
    leftNumbers.push(9);
    let currentNumber = parseInt(leftNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  } else {
    rightNumbers.push(9);
    let currentNumber = parseInt(rightNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  }
};

const onClickFour = () => {
  if (
    !isDivideClicked &&
    !isMultiplyClicked &&
    !isSubtractClicked &&
    !isAdditionClicked &&
    !isEqualClicked
  ) {
    leftNumbers.push(4);
    let currentNumber = parseInt(leftNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  } else {
    rightNumbers.push(4);
    let currentNumber = parseInt(rightNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  }
};

const onClickFive = () => {
  if (
    !isDivideClicked &&
    !isMultiplyClicked &&
    !isSubtractClicked &&
    !isAdditionClicked &&
    !isEqualClicked
  ) {
    leftNumbers.push(5);
    let currentNumber = parseInt(leftNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  } else {
    rightNumbers.push(5);
    let currentNumber = parseInt(rightNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  }
};

const onClickSix = () => {
  if (
    !isDivideClicked &&
    !isMultiplyClicked &&
    !isSubtractClicked &&
    !isAdditionClicked &&
    !isEqualClicked
  ) {
    leftNumbers.push(6);
    let currentNumber = parseInt(leftNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  } else {
    rightNumbers.push(6);
    let currentNumber = parseInt(rightNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  }
};

const onClickOne = () => {
  if (
    !isDivideClicked &&
    !isMultiplyClicked &&
    !isSubtractClicked &&
    !isAdditionClicked &&
    !isEqualClicked
  ) {
    leftNumbers.push(1);
    let currentNumber = parseInt(leftNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  } else {
    rightNumbers.push(1);
    let currentNumber = parseInt(rightNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  }
};

const onClickTwo = () => {
  if (
    !isDivideClicked &&
    !isMultiplyClicked &&
    !isSubtractClicked &&
    !isAdditionClicked &&
    !isEqualClicked
  ) {
    leftNumbers.push(2);
    let currentNumber = parseInt(leftNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  } else {
    rightNumbers.push(2);
    let currentNumber = parseInt(rightNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  }
};

const onClickThree = () => {
  if (
    !isDivideClicked &&
    !isMultiplyClicked &&
    !isSubtractClicked &&
    !isAdditionClicked &&
    !isEqualClicked
  ) {
    leftNumbers.push(3);
    let currentNumber = parseInt(leftNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  } else {
    rightNumbers.push(3);
    let currentNumber = parseInt(rightNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  }
};

const onClickZero = () => {
  if (
    !isDivideClicked &&
    !isMultiplyClicked &&
    !isSubtractClicked &&
    !isAdditionClicked &&
    !isEqualClicked
  ) {
    leftNumbers.push(0);
    let currentNumber = parseInt(leftNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  } else {
    rightNumbers.push(0);
    let currentNumber = parseInt(rightNumbers.join(""));
    document.getElementById("screen").innerHTML = `<p>${currentNumber}</p>`;
  }
};

const onClickDivide = () => {
  isDivideClicked = true;
};

const onClickMultiply = () => {
  isMultiplyClicked = true;
};

const onClickSubtract = () => {
  isSubtractClicked = true;
};

const onClickAddition = () => {
  isAdditionClicked = true;
};

const onClickEqual = () => {
  isEqualClicked = true;
  let leftNumber = parseInt(leftNumbers.join(""));
  let rightNumber = parseInt(rightNumbers.join(""));
  let result = 0;
  if (isAdditionClicked) {
    result = leftNumber + rightNumber;
  } else if (isSubtractClicked) {
    result = leftNumber - rightNumber;
  } else if (isMultiplyClicked) {
    result = leftNumber * rightNumber;
  } else if (isDivideClicked) {
    result = leftNumber / rightNumber;
  }
    document.getElementById("screen").innerHTML = `<p>${result}</p>`;
  
};

const Calculator = () => {
  return (
    <div className={styles.calculator}>
      <Screen />
      <Elements />
    </div>
  );
};

export {
  Calculator,
  onClickSeven,
  onClickEight,
  onClickNine,
  onClickDivide,
  onClickFour,
  onClickFive,
  onClickSix,
  onClickMultiply,
  onClickOne,
  onClickTwo,
  onClickThree,
  onClickSubtract,
  onClickZero,
  onClickAddition,
  onClickEqual,
};
