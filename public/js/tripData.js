async function tripDataFormHandler(event) {
  event.preventDefault();

  const age = document.getElementById("age").value;
  const currency = document.getElementById("currency");
  const currencyOption = currency.options[currency.selectedIndex].value;
  const startDate = document.getElementById("#start-date").value;
  const endDate = document.getElementById("#end-date").value;

  const response = await fetch("", {
    method: "POST",
    body: JSON.stringify({
      age,
      currencyOption,
      startDate,
      endDate
    }),
    header: {
      'Content-Type': 'application/json'
    }
  });

  if(response.ok) {
    document.location.replace('/quote')
  }
  console.log(age);
}

document
  .querySelector(".submit-trip-data")
  .addEventListener("submit", tripDataFormHandler);
