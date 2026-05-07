function reloadPage() {
  location.reload();
}

const form = document.getElementById("contactForm");

const toast = document.getElementById("toast");

const messageList = document.getElementById("messageList");


function loadMessages() {
  let messages = JSON.parse(localStorage.getItem("messages")) || [];

  messageList.innerHTML = "";

  messages.forEach((msg) => {
    messageList.innerHTML += `
      <div class="message-card">

        <h4>${msg.name}</h4>
        <p>${msg.email}</p>
        <p>${msg.message}</p>

      </div>
    `;
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let messages = JSON.parse(localStorage.getItem("messages")) || [];

  const newMessage = {
    name: name.value,
    email: email.value,
    message: message.value,
  };

  messages.push(newMessage);

  localStorage.setItem("messages", JSON.stringify(messages));

  // toast
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);

  form.reset();

  loadMessages();
});

loadMessages();