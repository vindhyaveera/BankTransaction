const app = document.querySelector(".app");
const invaliddetails = document.querySelector(".invalid_details");
const movements = document.querySelector(".movements");
const balancevalue = document.querySelector(".balance__value");
const value_in = document.querySelector(".summary__value--in");
const value_out = document.querySelector(".summary__value--out");
const sort_amount = document.querySelector(".btn--sort");
const value_interest = document.querySelector(".summary__value--interest");
const btn_loan = document.querySelector(".form__btn--loan");
const btn_close = document.querySelector(".form__btn--close");

const amount = [];
var owner = [];
var Transactions;
var successfulTransactions;
var unsuccessfulTransactions;

const rate = 5; // Annual interest rate in percentage
const time = 2; // Time period in years;

const transfer_amount = document.querySelector(".form__btn--transfer");

// Get the current date and time
let currentDate = new Date();

// Get the components of the date and time
let year = currentDate.getFullYear();
let month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
let day = String(currentDate.getDate()).padStart(2, "0");
let hours = currentDate.getHours();
let minutes = String(currentDate.getMinutes()).padStart(2, "0");
let seconds = String(currentDate.getSeconds()).padStart(2, "0");

// Determine AM or PM and convert hours to 12-hour format
let ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12;
hours = hours ? hours : 12; // If hours is 0, set it to 12

// Format hours to 2 digits
hours = String(hours).padStart(2, "0");

// Combine the components into a formatted string
let formattedDate = `${year}-${month}-${day}`;
let formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;

// Display the current date and time
console.log("Current Date: " + formattedDate);
console.log("Current Time: " + formattedTime);

// Annual interest rate
const annualInterestRate = 0.05;

var timerInterval;

const users = [
  {
    id: 1,
    ownername: "sivaram",
    userid: "siva",
    transaction: [
      { state: true, amount: 2000, date: "2024-07-01 09:15:30 AM" },
      { state: true, amount: 5000, date: "2024-07-02 11:45:00 AM" },
      { state: true, amount: 4000, date: "2024-07-10 03:30:15 PM" },
      { state: false, amount: -200, date: "2024-07-15 07:00:00 PM" },
      { state: false, amount: -900, date: "2024-07-20 12:00:00 PM" },
    ],
    pin: 7777,
  },
  {
    id: 2,
    ownername: "vindhyadevi",
    userid: "vin",
    transaction: [
      { state: true, amount: 2900, date: "2024-07-03 08:20:00 AM" },
      { state: true, amount: 3000, date: "2024-07-07 02:45:15 PM" },
      { state: true, amount: 1000, date: "2024-07-12 04:10:30 PM" },
      { state: false, amount: -400, date: "2024-07-18 10:30:00 AM" },
      { state: false, amount: -900, date: "2024-07-22 06:15:45 PM" },
    ],
    pin: 3333,
  },
  {
    id: 3,
    ownername: "kaushigan",
    userid: "kau",
    transaction: [
      { state: true, amount: 8000, date: "2024-07-05 09:30:00 AM" },
      { state: true, amount: 3000, date: "2024-07-09 01:00:00 PM" },
      { state: true, amount: 9000, date: "2024-07-14 12:00:00 PM" },
      { state: false, amount: -900, date: "2024-07-16 08:45:30 PM" },
      { state: false, amount: -900, date: "2024-07-21 05:30:15 PM" },
    ],
    pin: 6666,
  },
  {
    id: 4,
    ownername: "vishalkrishna",
    userid: "vk",
    transaction: [
      { state: true, amount: 2800, date: "2024-07-06 10:00:00 AM" },
      { state: true, amount: 3500, date: "2024-07-11 12:30:00 PM" },
      { state: true, amount: 400, date: "2024-07-15 03:00:00 PM" },
      { state: false, amount: -1200, date: "2024-07-19 09:15:00 AM" },
      { state: false, amount: -900, date: "2024-07-23 07:30:00 PM" },
    ],
    pin: 1111,
  },
  {
    id: 5,
    ownername: "veerapandian",
    userid: "vp",
    transaction: [
      { state: true, amount: 2900, date: "2024-07-02 11:00:00 AM" },
      { state: true, amount: 3000, date: "2024-07-08 03:00:00 PM" },
      { state: true, amount: 1000, date: "2024-07-13 09:45:00 AM" },
      { state: false, amount: -400, date: "2024-07-17 01:30:00 PM" },
      { state: false, amount: -900, date: "2024-07-21 04:00:00 PM" },
    ],
    pin: 8888,
  },
  {
    id: 6,
    ownername: "narend",
    userid: "nd",
    transaction: [
      { state: true, amount: 8000, date: "2024-07-04 10:30:00 AM" },
      { state: true, amount: 3000, date: "2024-07-08 02:15:00 PM" },
      { state: true, amount: 9000, date: "2024-07-13 12:30:00 PM" },
      { state: false, amount: -900, date: "2024-07-18 07:00:00 PM" },
      { state: false, amount: -900, date: "2024-07-24 05:45:00 PM" },
    ],
    pin: 2222,
  },
  {
    id: 7,
    ownername: "yogananth",
    userid: "yg",
    transaction: [
      { state: true, amount: 2800, date: "2024-07-03 09:00:00 AM" },
      { state: true, amount: 3500, date: "2024-07-09 11:30:00 AM" },
      { state: true, amount: 400, date: "2024-07-14 01:00:00 PM" },
      { state: false, amount: -1200, date: "2024-07-19 06:15:00 PM" },
      { state: false, amount: -900, date: "2024-07-25 04:30:00 PM" },
    ],
    pin: 2020,
  },
];

function getInputValue() {
  var username = document.querySelector(".login__input--user");
  var userpass = document.querySelector(".login__input--pin");

  var uservalue = username.value;
  var userpass = userpass.value;

  console.log(uservalue);
  console.log(userpass);
  invaliddetails.innerText = "";

  //Here  we can also use find instead of filter

  owner = users.filter(function (user) {
    if (user.ownername == uservalue && user.pin == userpass) {
      return user;
    }
  });
  // console.log(owner);
  if (owner[0]) {
    app.classList.add("appvalid");
    transaction(owner);
  } else {
    app.classList.remove("appvalid");
    invaliddetails.innerText = "Sorry!!! Username And Pin Number is Invalid!!!";
  }
}

function transaction(owner) {
  console.log(owner);
  // Transactions = owner[0].transaction;
  Transactions = owner.flatMap((user) => user.transaction);

  successfulTransactions = Transactions.filter((trans) => trans.state == true);
  unsuccessfulTransactions = Transactions.filter(
    (trans) => trans.state == false
  );

  console.log("Successful Transactions:", successfulTransactions);
  console.log("Unsuccessful Transactions:", unsuccessfulTransactions);

  timerInterval = 0;

  // Set initial timer values
  minutess = 5;
  secondss = 0;

  // Initial call to display the starting time immediately
  updateTimer();
  depositwithdraw();
}

function depositwithdraw() {
  var depositvalue = 0;
  var withdrawalvalue = 0;
  const deposit = successfulTransactions.map((trans) => {
    amount.push(trans.amount);
    depositvalue += trans.amount;

    return `
     <div class="movements__row">
       <div class="movements__type movements__type--deposit">deposit</div>
       <div class="movements__date">${trans.date}</div>
       <div class="movements__value">${trans.amount}</div>
      </div>`;
  });
  console.log(deposit);
  const withdrawal = unsuccessfulTransactions.map((trans) => {
    amount.push(trans.amount);
    withdrawalvalue += trans.amount;

    return `
      <div class="movements__row">
      <div class="movements__type movements__type--withdrawal">withdrawal
      </div>
         <div class="movements__date">${trans.date}
         </div>
         <div class="movements__value">${trans.amount}</div>
        </div>`;
  });
  console.log(withdrawal);
  console.log(amount);
  movements.innerHTML = deposit + withdrawal;
  console.log(depositvalue);
  balancevalue.innerHTML = depositvalue + withdrawalvalue;
  value_in.innerHTML = depositvalue + "€";
  value_out.innerHTML = withdrawalvalue + "€";
  value_interest.innerHTML =
    calculateSimpleInterest(balancevalue.innerHTML, rate, time) + "€";
}

sort_amount.addEventListener("click", function () {
  successfulTransactions.sort((a, b) => b.amount - a.amount);
  unsuccessfulTransactions.sort((a, b) => b.amount - a.amount);
  depositwithdraw();
  console.log(successfulTransactions);
  console.log(unsuccessfulTransactions);
});

transfer_amount.addEventListener("click", function () {
  const transfer_to = document.querySelector(".form__input--to").value;
  const transfers_amount = parseInt(
    document.querySelector(".form__input--amount").value
  );

  const trans_owner = users.filter(function (user) {
    if (user.ownername == transfer_to) {
      return user;
    }
  });

  console.log(trans_owner);

  console.log(owner);
  if (trans_owner[0]) {
    let user = trans_owner[0];
    console.log(user);

    let newTransaction = {
      state: true,
      amount: transfers_amount,
      date: formattedDate + " " + formattedTime,
    };

    user.transaction.push(newTransaction);

    let newTransaction_withdraw = {
      state: false,
      amount: -transfers_amount,
      date: formattedDate + " " + formattedTime,
    };

    let owner1 = owner[0];
    console.log(owner1);
    owner1.transaction.push(newTransaction_withdraw);
    console.log(owner1.transaction);

    transaction(owner);
    document.querySelector(".form__input--to").value = "";
    document.querySelector(".form__input--amount").value = "";
  } else {
    alert("Sorry!!User doesn't Exits!!!");
    document.querySelector(".form__input--to").value = "";
    document.querySelector(".form__input--amount").value = "";
  }
});

function calculateSimpleInterest(principal, rate, time) {
  // Simple Interest formula
  let interest = (principal * rate * time) / 100;
  // Return the calculated interest
  return interest;
}

btn_loan.addEventListener("click", function () {
  const loan_amount = parseInt(
    document.querySelector(".form__input--loan-amount").value
  );
  console.log(loan_amount);
  console.log(balancevalue.innerHTML);
  if (balancevalue.innerHTML / 2 >= loan_amount) {
    alert("Loan has been successfully sanctioned!");
    console.log(owner);
    let newTransaction = {
      state: true,
      amount: loan_amount,
      date: formattedDate + " " + formattedTime,
    };

    owner[0].transaction.push(newTransaction);
    transaction(owner);
    console.log(owner);
  } else {
    alert("Loan sanction failed. Please try again.");
  }
  document.querySelector(".form__input--loan-amount").value = "";
});

btn_close.addEventListener("click", function () {
  const user = document.querySelector(".form__input--user").value;
  const pin = document.querySelector(".form__input--pin").value;
  console.log(owner);
  console.log(user);
  console.log(pin);
  // console.log(owner[0].ownername);
  // console.log(owner[0].pin);
  if (user == owner[0].ownername && pin == owner[0].pin) {
    console.log("same");
    const index = users.findIndex((loan) => loan.id == owner[0].id);
    console.log(index);
    users.splice(index, 1);
    console.log(users);
    app.classList.remove("appvalid");
    document.querySelector(".form__input--user").value = "";
    document.querySelector(".form__input--pin").value = "";
    document.querySelector(".login__input--user").value = "";
    document.querySelector(".login__input--pin").value = "";
  } else {
    console.log("false");
    const close_owner = users.filter(function (user_close) {
      if (user_close.ownername == user) {
        return user;
      }
    });
    const user_id = close_owner[0].id;
    console.log(user_id);

    const index = users.findIndex((loan) => loan.id == user_id);
    console.log(index);
    users.splice(index, 1);
    console.log(users);
    document.querySelector(".form__input--user").value = "";
    document.querySelector(".form__input--pin").value = "";
    alert("closed the account successfully");
  }
});

// Set initial timer values
let minutess = 5;
let secondss = 0;

// Function to update the timer
function updateTimer() {
  // Format the minutes and seconds as two-digit strings
  let minutesString = String(minutess).padStart(2, "0");
  let secondsString = String(secondss).padStart(2, "0");

  // // Update the timer display
  document.querySelector(
    ".timer"
  ).textContent = `${minutesString}:${secondsString}`;

  // Decrease the timer
  if (minutess === 0 && secondss === 0) {
    // Timer has reached 0:00, you can add any additional logic here
    clearInterval(timerInterval);
    alert("You have been logged out.");
    document.querySelector(".login__input--user").value = "";
    document.querySelector(".login__input--pin").value = "";
    app.classList.remove("appvalid");
  } else if (secondss === 0) {
    // If seconds reach 0, decrease minutes and reset seconds to 59
    minutess--;
    secondss = 59;
  } else {
    // Otherwise, just decrease seconds
    secondss--;
  }
}

// Call the updateTimer function every 1 second (1000 milliseconds)
timerInterval = setInterval(updateTimer, 1000);
