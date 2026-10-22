document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".verify-form");
  const input = document.getElementById("certificate-code");

  if (!form || !input) return;

  form.addEventListener("submit", function () {
    input.value = input.value.trim().toLowerCase();
  });
});
