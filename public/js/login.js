let modalBodyEl = document.getElementById("login-modal-body");

function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("input[name='username']").value;
  const password = document.querySelector("input[name='password']").value;

  const loginCredentials = {
    username,
    password,
  };

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/login", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(loginCredentials));
  xhr.onreadystatechange = function () {
    // In local files, status is 0 upon success in Mozilla Firefox
    if (xhr.readyState === XMLHttpRequest.DONE) {
      var status = xhr.status;
      if (status === 0 || status == 200) {
        // The request has been completed successfully
        let response = JSON.parse(xhr.response);
        
        if(response.isAuth){
          localStorage.setItem("token", response.token);
          document.location.replace("/quote");
        } else {
        $('#login-message-modal').modal('toggle');
        modalBodyEl.innerHTML = `${response.message}`
        }
      } else {
        $('#login-message-modal').modal('toggle');
        console.log(JSON.parse(xhr.responseText));
      }
    }
  };
}

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
