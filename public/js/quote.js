document.getElementById("age").addEventListener("change", isValidAge);

document.querySelector(".trip-data-form").addEventListener("click", tripDataFormHandler);


function tripDataFormHandler(event) {
  event.preventDefault();
  // if(!isValidAge()){
  //   return
  // }

  const age = document.querySelector("input[name='age']").value.trim();
  const currencySection = document.getElementById("currency").selectedIndex;
  const currency =
    document.getElementsByTagName("option")[currencySection].value;
  const startDate = document.querySelector("input[name='start-date']").value;
  const endDate = document.querySelector("input[name='end-date']").value;
  const token = localStorage.getItem("token");

  if (age && currency && startDate && endDate && token) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/quote", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.send(JSON.stringify({ age, currency, startDate, endDate, token }));
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status;

        if (status === 0 || status == 200) {
          const response = JSON.parse(xhr.responseText).result;
          // const { age, currency, startDate, endDate } = response;
        } else {
          console.log(JSON.parse(xhr.responseText));
        }
      }
    };
  }
}

function isValidAge(){
  let val = document.querySelector("input[name='age']").value.trim();
  let error = document.getElementById("age_err");
  var regex = /^[0-9, \b]+$/;
  if (!regex.test(val)) {
    error.innerHTML =
        "Invalid input. Please enter ages separated by comma. Ex: 24,34";
        return false;
  } else {
    error.innerHTML = ""
  }

  var age_array = val.split(',');
  if (parseInt(age_array[0]) < 18 || parseInt(age_array[0])> 110 || age_array[0].trim()=='') {
    error.innerHTML =
      "First member age in the list should be between 18 and 110. Ex: 24,34";
      return false;
  } else {
    error.innerHTML = ""
  }

  for (i = 1; i < age_array.length; i++) {
    if ((parseInt(age_array[i]) < 0) || (parseInt(age_array[i]) > 110) || age_array[i].trim()=='') {
      error.innerHTML =
      "Starting with second member of the list the age should be between 1 and 110. Ex: 24,34";
      return false;
    } else {
      error.innerHTML = ""
    }
  }
  return true;
}