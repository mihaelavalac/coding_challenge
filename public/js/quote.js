const logOutBtn = document.getElementById("log-out-btn");

const helpBtn = document.getElementById("help-btn");

document.getElementById("age").addEventListener("change", isValidAge);

logOutBtn.addEventListener("click", logOut);
helpBtn.addEventListener("click", displayHelpSettings);
logOutBtn.classList.remove("d-none");
helpBtn.classList.remove("d-none");
document
  .querySelector(".trip-data-form")
  .addEventListener("click", tripDataFormHandler);
let modalBodyEl = document.getElementById("modal-body");
setStartingDateToday("start-date");
setStartingDateToday("end-date");

function tripDataFormHandler(event) {
  event.preventDefault();

  const age = document.querySelector("input[name='age']").value.trim();
  const currencySection = document.getElementById("currency").selectedIndex;
  const currency =
    document.getElementsByTagName("option")[currencySection].value;
  const startDate = document.querySelector("input[name='start-date']").value;
  const endDate = document.querySelector("input[name='end-date']").value;
  const token = localStorage.getItem("token");

  if (!isValidAge()) {
    return;
  }

  if (age && currency && startDate && endDate && token) {
    var xhr = new XMLHttpRequest(); //create a new XMLHttpRequest object, which is build in and accepted by all modern browser.
    xhr.open("POST", "/api/quote", true); //1.method  2.route  3. async = true //specify the request
    xhr.setRequestHeader("Content-Type", "application/json"); //Adds a label/value pair to the header to be sent.
    xhr.setRequestHeader("Authorization", "Bearer " + token);

    xhr.send(JSON.stringify({ age, currency, startDate, endDate, token })); //send the request to teh server.
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status;

        if (status === 0 || status == 200) {
          const response = JSON.parse(xhr.responseText); //Returns response data as a string.
          const { isAuth, message, result, currency, quote_id } = response;
          if (isAuth) {
            $("#quote-modal").modal("toggle");
            modalBodyEl.innerHTML = `<p class='m-3'>${message} <span class='text-success'>${result} ${currency}</span></p>
            <p>Here is your <span class='text-info'>Quote ID</span>: <span class='text-success'>${quote_id}</span></p>
            <p>Please reach out to us with your <span class='text-info'>Quote ID</span> if you have any questions.</p>
            <p>Email: <a href='mailto:questions@besttrip.com'>question@besttrip.com</a></p>
            `;
          } else {
            localStorage.removeItem("token");
            finalQuoteEl.innerHTML = `<p> Please <a href='/'>login</a> firstly to get the quote!</p>`;
          }
        } else {
          localStorage.removeItem("token");
          finalQuoteEl.innerHTML = `<p> Please <a href='/'>resign</a>, something went wrong.</p>`;
        }
      }
    };
  }
}

function setStartingDateToday(inputName) {
  var today = new Date().toISOString().split("T")[0];
  var later = new Date(new Date().setDate(new Date().getDate() + 7))
    .toISOString()
    .split("T")[0];
  document.getElementsByName(inputName)[0].setAttribute("min", today);
  if (inputName == "start-date") {
    document.getElementsByName(inputName)[0].defaultValue = today;
  } 
  if (inputName == "end-date") {
    document.getElementsByName(inputName)[0].defaultValue = later;
  } 
  
}

function isValidAge() {
  let val = document.querySelector("input[name='age']").value.trim();
  let error = document.getElementById("age_err");
  var regex = /^[0-9, \b]+$/;
  if (!regex.test(val)) {
    error.innerHTML =
      "Invalid input. Please enter ages separated by comma. Ex: 24,34";
    return false;
  } else {
    error.innerHTML = "";
  }

  var age_array = val.split(",");
  if (
    parseInt(age_array[0]) < 18 ||
    parseInt(age_array[0]) > 70 ||
    age_array[0].trim() == ""
  ) {
    error.innerHTML =
      "First member age in the list should be between 18 and 70. Ex: 24,34";
    return false;
  } else {
    error.innerHTML = "";
  }

  for (i = 1; i < age_array.length; i++) {
    if (
      parseInt(age_array[i]) < 0 ||
      parseInt(age_array[i]) > 70 ||
      age_array[i].trim() == ""
    ) {
      error.innerHTML =
        "Starting with second member of the list the age should be between 1 and 70. Ex: 24,34";
      return false;
    } else {
      error.innerHTML = "";
    }
  }
  return true;
}

function logOut() {
  localStorage.removeItem("token");
  document.location.replace("/");
}

function displayHelpSettings() {
  $("#quote-help-modal").modal("toggle");
}
