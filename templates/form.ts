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

form.addEventListener("submit", (event) => {
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

  const releaseForm = () => {
    countdownStarted = false;
    form.querySelectorAll("textarea, input").forEach((field) => {
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
        field.readOnly = false;
      }
    });
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = false;
    }
  };

  const submitAfterCountdown = async () => {
    form.querySelectorAll("textarea").forEach((textarea) => {
      textarea.readOnly = false;
    });
    countdownStatus.textContent = "Submitting...";
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
      });
      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}.`);
      }

      releaseForm();
      countdownStatus.textContent = "Submission complete.";
    } catch (error) {
      releaseForm();
      countdownStatus.textContent = "Submission failed. Please try again.";
      console.error("Could not submit the form.", error);
    }
  };

  if (seconds === 0) {
    void submitAfterCountdown();
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
      void submitAfterCountdown();
      return;
    }
    updateCountdown();
  }, 1000);
});
