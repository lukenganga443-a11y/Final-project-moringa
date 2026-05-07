function reloadPage() {
  location.reload();
}

async function loadTrending() {
  const container = document.getElementById("trendingRecipes");

  try {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken",
    );

    const data = await res.json();

    data.meals.slice(0, 6).forEach((meal) => {
      container.innerHTML += `
        <div class="card">
          <img src="${meal.strMealThumb}">
          <h3>${meal.strMeal}</h3>
        </div>
      `;
    });
  } catch (error) {
    container.innerHTML = "<p>Failed to load recipes.</p>";
  }
}

loadTrending();
