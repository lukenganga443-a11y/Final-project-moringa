function reloadPage() {
  location.reload();
}

document
  .getElementById("searchInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchRecipes();
    }
  });

let cache = {};

async function searchRecipes() {
  const query = document.getElementById("searchInput").value.trim();

  const results = document.getElementById("results");

  if (!query) return;

  results.innerHTML = `
    <p style="text-align:center">
      Loading recipes...
    </p>
  `;

  if (cache[query]) {
    renderMeals(cache[query]);
    return;
  }

  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
    );

    const data = await res.json();

    cache[query] = data.meals;

    renderMeals(data.meals);
  } catch (error) {
    results.innerHTML = `
      <p>Error loading recipes.</p>
    `;
  }
}

function renderMeals(meals) {
  const results = document.getElementById("results");

  if (!meals) {
    results.innerHTML = `
      <p>No recipes found.</p>
    `;
    return;
  }

  results.innerHTML = "";

  meals.forEach((meal) => {
    results.innerHTML += `
      <div class="meal-card">

        <img
          src="${meal.strMealThumb}/preview"
          loading="lazy"
        >

        <div class="meal-info">

          <h3>${meal.strMeal}</h3>

          <p class="category">
            ${meal.strCategory}
          </p>

          <p>
            ${meal.strArea} Cuisine
          </p>

          <button
            class="favorite-btn"
            onclick='addFavorite(${JSON.stringify(meal)})'
          >
             Add to Favorites
          </button>

        </div>

      </div>
    `;
  });
}

function addFavorite(meal) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = favorites.some((f) => f.idMeal === meal.idMeal);

  if (exists) {
    alert("Already added");
    return;
  }

  favorites.push(meal);

  localStorage.setItem("favorites", JSON.stringify(favorites));

  alert("Added to favorites");
}

const form = document.getElementById("recipeForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    const recipe = {
      id: Date.now(),
      title: title.value,
      ingredients: ingredients.value,
      steps: steps.value,
    };

    recipes.push(recipe);

    localStorage.setItem("recipes", JSON.stringify(recipes));

    form.reset();

    displayRecipes();
  });
}

function displayRecipes() {
  const list = document.getElementById("recipeList");

  if (!list) return;

  list.innerHTML = "";

  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

  recipes.forEach((r) => {
    list.innerHTML += `
      <div class="recipe-card">
        <h3>${r.title}</h3>
        <p>${r.ingredients}</p>

        <button onclick="deleteRecipe(${r.id})">
          Delete
        </button>

        <button onclick="editRecipe(${r.id})">
          Edit
        </button>
      </div>
    `;
  });
}

function deleteRecipe(id) {
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

  recipes = recipes.filter((r) => r.id !== id);

  localStorage.setItem("recipes", JSON.stringify(recipes));

  displayRecipes();
}

function editRecipe(id) {
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

  let recipe = recipes.find((r) => r.id === id);

  title.value = recipe.title;
  ingredients.value = recipe.ingredients;
  steps.value = recipe.steps;

  deleteRecipe(id);
}

displayRecipes();
