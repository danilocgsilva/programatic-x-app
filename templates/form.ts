const form = document.querySelector("#my-form");
const secondsInput = document.querySelector("#seconds");
const countdownStatus = document.querySelector("#countdown-status");

if (
  !(form instanceof HTMLFormElement) ||
  !(secondsInput instanceof HTMLInputElement) ||
  !(countdownStatus instanceof HTMLElement)
) {
  throw new Error("Could not initialize the countdown form.");
}

let countdownStarted = false;
let countdownFinished = false;

form.addEventListener("submit", (event) => {
  if (countdownFinished) {
    return;
  }

  event.preventDefault();
  if (countdownStarted) {
    return;
  }

  const seconds = Number(secondsInput.value);
  if (!Number.isFinite(seconds) || !Number.isInteger(seconds) || seconds < 0) {
    countdownStatus.textContent = "Enter a non-negative whole number of seconds.";
    secondsInput.focus();
    return;
  }

  countdownStarted = true;
  form.querySelectorAll("textarea, input").forEach((field) => {
    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
      field.readOnly = true;
    }
  });

  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton instanceof HTMLButtonElement) {
    submitButton.disabled = true;
  }

  const submitAfterCountdown = () => {
    countdownFinished = true;
    countdownStatus.textContent = "Countdown finished. Typing now.";
    form.requestSubmit();
  };

  if (seconds === 0) {
    submitAfterCountdown();
    return;
  }

  let remaining = seconds;
  const updateCountdown = () => {
    const unit = remaining === 1 ? "second" : "seconds";
    countdownStatus.textContent =
      `Typing starts in ${remaining} ${unit}. Switch to the target window now.`;
  };

  updateCountdown();
  const interval = window.setInterval(() => {
    remaining -= 1;
    if (remaining === 0) {
      window.clearInterval(interval);
      submitAfterCountdown();
      return;
    }
    updateCountdown();
  }, 1000);
});
