async function displayAlerts(message, user) {
  window.testApi.handleAlert({ message: message, user: user });
  const catFact = confirm(
    message + "\n\nWould you like to see a random cat fact?"
  );
  if (catFact) {
    alert(await fetchCatFact());
  } else {
    alert("That's a shame");
  }
  return;
}

async function fetchCatFact() {
  const response = await fetch("https://catfact.ninja/fact");
  const data = await response.json();
  return data.fact;
}
