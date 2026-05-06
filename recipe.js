function reloadPage() {
  document.body.style.opacity = "0.2";
  setTimeout(() => location.reload(), 200);
}

async function searchRecipes() {
  const query = document.getElementById("searchInput").value;

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
  );

  const data = await res.json();
  const results = document.getElementById("results");

  results.innerHTML = "";

  if (!data.meals) {
    results.innerHTML = "<p>No recipes found</p>";
    return;
  }

  data.meals.forEach((meal) => {
    results.innerHTML += `
      <div class="meal-card" onclick="openMeal('${meal.idMeal}')">
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

const form = document.getElementById("recipeForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    const newRecipe = {
      id: Date.now(),
      title: title.value,
      ingredients: ingredients.value,
      steps: steps.value,
    };

    recipes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));

    form.reset();
    displayRecipes();
  });
}

function displayRecipes() {
  const list = document.getElementById("recipeList");
  if (!list) return;

  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

  list.innerHTML = "";

  recipes.forEach((r) => {
    list.innerHTML += `
      <div class="recipe-card">
        <h3>${r.title}</h3>
        <p>${r.ingredients}</p>
        <p>${r.steps}</p>

        <button onclick="deleteRecipe(${r.id})">Delete</button>
        <button onclick="editRecipe(${r.id})">Edit</button>
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
