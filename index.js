function reloadPage() {
  document.body.style.opacity = "0.2";
  setTimeout(() => location.reload(), 200);
}
async function loadTrending() {
  const container = document.getElementById("trendingResults");

  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=",
  );

  const data = await res.json();

  container.innerHTML = "";

  data.meals.slice(0, 8).forEach((meal) => {
    container.innerHTML += `
      <div class="trend-card" onclick="openMeal('${meal.idMeal}')">
        <img src="${meal.strMealThumb}">
        <p style="padding:10px">${meal.strMeal}</p>
      </div>
    `;
  });
}
function openMeal(id) {
  localStorage.setItem("selectedMeal", id);
  window.location.href = "recipe.html";
}
loadTrending();
