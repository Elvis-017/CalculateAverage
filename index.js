// Getting DOM elements by their IDs
const content = document.getElementById("content"),
  addBtn = document.getElementById("add"),
  calculate = document.getElementById("calculate"),
  form = document.getElementById("form"),
  results = document.getElementById("results");

// Initializing variables and arrays
let btnRemove = document.getElementsByClassName("btnRemove"),
  count = 0,
  calculosNum = [],
  calculosDem = [],
  numerator = 0,
  denominator = 0,
  inputsColors = [
    // Array of input colors
    "#3cc5f3",
    //... (other color codes)
    "#6c244b",
  ];

// Adding event listeners
addBtn.addEventListener("click", addItem);
calculate.addEventListener("click", calculator);

// Function to disable buttons and clean UI based on content
function disableBtnSubmitANdClean() {
  // Checking and updating button states and UI
  if (content.innerHTML == "") {
    calculate.disabled = true;
    results.innerHTML = "";
  } else {
    calculate.disabled = false;
  }
}
disableBtnSubmitANdClean(); // Initial state

// Function to add an item dynamically to the UI
function addItem() {
  // Increment count
  count++;

  // Creating HTML element for the item
  let element = `...`; // (HTML code for the item)

  // Accessing the 'group' elements
  let group = document.getElementsByClassName("group");

  // Setting input borders with random colors
  if (group.length >= 0) {
    // Adding a delay to show random colors
    setTimeout(() => {
      for (let key in group) {
        let randomColor =
          inputsColors[Math.floor(Math.random() * inputsColors.length)];
        group[key].children[1].style.borderColor = randomColor;
        group[key].children[2].style.borderColor = randomColor;
      }
    }, 50);
  }

  // Alert if the item limit is reached, otherwise, add the item to the UI
  if (group.length > 11) {
    alert("You have reached the limit");
  } else {
    content.insertAdjacentHTML("beforeend", element);
  }

  disableBtnSubmitANdClean(); // Update button state
}

// Function to remove an item from the UI
function removeItem(elem) {
  content.removeChild(elem.parentElement);
  disableBtnSubmitANdClean(); // Update button state
}

// Function to perform calculations based on user input
function calculator() {
  // Resetting calculation arrays and variables
  calculosNum.splice(0, calculosNum.length);
  calculosDem.splice(0, calculosDem.length);
  numerator = 0;
  denominator = 0;

  // Getting input elements
  let credit = document.getElementsByClassName("credit"),
    literal = document.getElementsByClassName("literal");

  // Calculating numerator and denominator based on input values
  for (let index = 0; index < credit.length; index++) {
    let numProd = credit[index].value * literal[index].value;
    calculosNum.push(numProd);
    calculosDem.push(+credit[index].value);
  }

  // Calculating the sum of numerator and denominator
  calculosNum.forEach((num) => {
    numerator += num;
  });

  calculosDem.forEach((num) => {
    denominator += num;
  });

  // Calculating and displaying results based on the calculated value
  let val = parseFloat(numerator / denominator).toFixed(2);
  if (val >= 3 && val <= 4) {
    results.innerHTML = "<p class='result success'>" + val + "</p> ";
  }
  if (val >= 2 && val <= 2.9) {
    results.innerHTML = "<p class='result warming'>" + val + "</p> ";
  }
  if (val <= 1.9) {
    results.innerHTML = "<p class='result danger'>" + val + "</p> ";
  }
}

// Preventing form submission
form.onsubmit = (event) => {
  event.preventDefault();
};
