function reloadPage() {
  document.body.style.opacity = "0.2";

  setTimeout(() => {
    location.reload();
  }, 200);
}
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});
