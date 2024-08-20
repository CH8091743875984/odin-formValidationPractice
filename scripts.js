/*
fix error not showing on load with previously entered password / after submit

do the functions for pw and pw confirm need to include the check for missing values?
*/

const form = document.querySelector("form");

const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");

const country = document.getElementById("country");
const countryError = document.querySelector("#country + span.error");

const zipcode = document.getElementById("zipcode");
const zipcodeError = document.querySelector("#zipcode + span.error");

const password = document.getElementById("password");
const passwordError = document.querySelector("#password + span.error");

const passwordConfirm = document.getElementById("passwordConfirm");
const passwordConfirmError = document.querySelector(
  "#passwordConfirm + span.error"
);

window.addEventListener("load", () => {
  const passwordValid = checkPasswordRequirements();
  password.className = passwordValid ? "valid" : "invalid";

  const passwordMatch = checkPasswordMatch();
  passwordConfirm.className = passwordMatch ? "valid" : "invalid";
});

email.addEventListener("input", (event) => {
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error";
  } else {
    showErrorEmail();
  }
});

country.addEventListener("input", (event) => {
  if (country.validity.valid) {
    countryError.textContent = "";
    countryError.className = "error";
  } else {
    showErrorCountry();
  }
});

zipcode.addEventListener("input", (event) => {
  if (zipcode.validity.valid) {
    zipcodeError.textContent = "";
    zipcodeError.className = "error";
  } else {
    showErrorZipcode();
  }
});

password.addEventListener("input", (event) => {
  const isValid = checkPasswordRequirements(password.textContent);
  if (isValid) {
    password.className = "valid";
    passwordError.textContent = "";
    passwordError.className = "error";
  } else {
    password.className = "invalid";
    showErrorPassword();
  }
});

passwordConfirm.addEventListener("input", (event) => {
  const isValid = checkPasswordMatch();
  if (isValid) {
    passwordConfirm.className = "valid";
    passwordConfirmError.textContent = "";
    passwordConfirmError.className = "error";
  } else {
    passwordConfirm.className = "invalid";
    showErrorPasswordConfirm();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!email.validity.valid) {
    showErrorEmail();
  }
  if (!country.validity.valid) {
    showErrorCountry();
  }
  if (!zipcode.validity.valid) {
    showErrorZipcode();
  }

  const isValidPassword = checkPasswordRequirements(password.textContent);
  if (!isValidPassword) {
    password.className = "valid";
    passwordError.textContent = "";
    passwordError.className = "error";
  } else {
    password.className = "invalid";
    showErrorPassword();
  }
  if (!passwordConfirm.validity.valid) {
    showErrorPasswordConfirm();
  }
});

function showErrorEmail() {
  if (email.validity.valueMissing) {
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Please enter a valid email address.";
  }

  emailError.className = "error active";
}

function showErrorCountry() {
  if (country.validity.valueMissing) {
    countryError.textContent = "You need to enter a country.";
  } else if (country.validity.tooLong) {
    countryError.textContent = "Country name is too long.";
  }
  countryError.className = "error active";
}

function showErrorZipcode() {
  if (zipcode.validity.valueMissing) {
    zipcodeError.textContent = "You need to enter a zipcode.";
  } else if (zipcode.validity.patternMismatch) {
    zipcodeError.textContent = "Please enter a valid zipcode (5 numbers).";
  }
  zipcodeError.className = "error active";
}

function showErrorPassword() {
  if (password.validity.valueMissing) {
    passwordError.textContent = "You need to enter a password.";
  }
  //   } else if (password.validity.patternMismatch) {
  //     passwordError.textContent = "Please enter a valid zipcode (5 numbers).";
  //   }
  passwordError.className = "error active";
}

function showErrorPasswordConfirm() {
  if (passwordConfirm.validity.valueMissing) {
    passwordConfirmError.textContent = "You need to confirm your password.";
  }

  passwordConfirmError.className = "error active";
}

function checkPasswordRequirements() {
  const string = password.value;

  let isValid = true;
  let errorMessage = [];
  if (string.length < 10) {
    errorMessage.push("short");
    isValid = false;
  }
  if (string.length > 50) {
    errorMessage.push("long");
    isValid = false;
  }
  if (!/[A-Z]/.test(string)) {
    errorMessage.push("needs uppercase");
    isValid = false;
  }
  if (!/[a-z]/.test(string)) {
    errorMessage.push("needs lowercase");
    isValid = false;
  }
  if (!/[0-9]/.test(string)) {
    errorMessage.push("needs number");
    isValid = false;
  }
  if (!/[!@#$%*]/.test(string)) {
    errorMessage.push("needs a special character in !, @, #, $, %, *");
    isValid = false;
  }

  const finalMessage = errorMessage.join(", ");

  if (isValid) {
    password.setCustomValidity("");
    passwordError.textContent = "";
  } else {
    password.setCustomValidity(finalMessage);
    passwordError.textContent = finalMessage;
  }

  console.log(finalMessage);
  return isValid;
}

function checkPasswordMatch() {
  const isValid = password.value === passwordConfirm.value;
  if (isValid) {
    passwordConfirm.setCustomValidity("");
    passwordConfirmError.textContent = "";
  } else {
    const errorMessage = "Your password does not match.";
    passwordConfirm.setCustomValidity(errorMessage);
    passwordConfirmError.textContent = errorMessage;
  }
  return isValid;
}
