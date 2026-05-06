function showOnScroll() {
  const cards = document.querySelectorAll(".slide");

  cards.forEach((card) => {
    const top = card.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (top < screenHeight - 80) {
      card.classList.add("show");
    }
  });
}

window.addEventListener("scroll", showOnScroll);
showOnScroll();

// smooth page feel (simple trick)
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "1";
});

console.log("RecipeVault loaded");
