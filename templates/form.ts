const form = document.getElementById("my-form") as HTMLFormElement | null;

form?.addEventListener("submit", (event) => {
  const dataInput = document.getElementById("data") as HTMLTextAreaElement;

  if (!dataInput.value.trim()) {
    event.preventDefault();
    alert("Please enter input data.");
    return;
  }

  const button = form.querySelector("button") as HTMLButtonElement;
  button.disabled = true;
  button.textContent = "Submitting...";
});
