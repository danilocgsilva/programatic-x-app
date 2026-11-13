const form = document.getElementById("my-form") as HTMLFormElement | null;

form?.addEventListener("submit", (event) => {
  const nameInput = document.getElementById("name") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;

  if (!nameInput.value.trim() || !emailInput.value.trim()) {
    event.preventDefault();
    alert("Please fill in all fields.");
    return;
  }

  const button = form.querySelector("button") as HTMLButtonElement;
  button.disabled = true;
  button.textContent = "Submitting...";
});
