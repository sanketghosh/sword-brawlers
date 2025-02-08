document.addEventListener("DOMContentLoaded", () => {
  const modal1 = document.getElementById("modal") as HTMLDivElement;
  const modal2 = document.getElementById("modal2") as HTMLDivElement;
  const nameInput = document.getElementById("nameInput") as HTMLInputElement;
  const submitButton = document.getElementById(
    "submitName"
  ) as HTMLButtonElement;
  const closeButton = document.getElementById("closeModal2") as HTMLSpanElement;
  const displayName = document.getElementById(
    "displayName"
  ) as HTMLHeadingElement;

  // Ensure the first modal is visible on page load
  modal1.style.display = "flex";
  modal2.style.display = "none"; // Ensure second modal is hidden

  // Handle form submission
  submitButton.addEventListener("click", () => {
    const name = nameInput.value.trim();

    if (name) {
      modal1.style.display = "none"; // Hide first modal
      modal2.style.display = "flex"; // Show second modal
    } else {
      alert("Please enter your name!");
    }
  });

  // Handle closing of second modal
  closeButton.addEventListener("click", () => {
    modal2.style.display = "none"; // Hide second modal
    displayName.textContent = `Hello, ${nameInput.value}!`; // Show name on page
  });
});
