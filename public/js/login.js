async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

    if (username=='test' && password=='Test123!') {
      document.location.replace("/home");
    } else {
      alert('Invalid username or password');
    }

}

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);