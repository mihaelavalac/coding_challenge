async function tripDataFormHandler(event) {
  event.preventDefault();

  const age = document.querySelector("input[name='age']").value;
  const currency = document.querySelector("select[name='currency']");
  const currencyOption = currency.options[currency.selectedIndex].value;
  const startDate = document.querySelector("input[name='start-date']").value;
  const endDate = document.querySelector("input[name='end-date']").value;


  const response = await fetch("/quote", {
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

  if (response.ok) {
    console.log(response.data);
  }


}

document
  .querySelector(".trip-data-form")
  .addEventListener("click", tripDataFormHandler);

