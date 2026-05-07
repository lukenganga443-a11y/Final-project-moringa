function reloadPage() {
  location.reload();
}

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;

  alert(`Thanks ${name}! Your message has been sent successfully.`);

  form.reset();
});
