const toast = document.createElement("div");
toast.className = "toast";
document.body.appendChild(toast);

function showToast(message, type = "success") {
  toast.textContent = message;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.className = "toast";
  }, 2500);
}

async function searchRecipes() {
  const query = document.getElementById("searchInput").value;
  const results = document.getElementById("results");

  if (!query) {
    showToast("Type something to search ⚠️", "warning");
    return;
  }

  results.innerHTML = "Loading...";

  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
    );

    const data = await res.json();

    if (!data.meals) {
      results.innerHTML = "No recipes found.";
      return;
    }

    results.innerHTML = "";

    data.meals.forEach((meal) => {
      results.innerHTML += `
        <div class="card">

          <img src="${meal.strMealThumb}" />

          <h3>${meal.strMeal}</h3>

          <button onclick='addToFavorites(${JSON.stringify(meal)})'>
            Add to Favorites
          </button>

        </div>
      `;
    });
  } catch (err) {
    results.innerHTML = "Error loading recipes.";
  }
}

function addToFavorites(meal) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = favorites.find((item) => item.idMeal === meal.idMeal);

  if (exists) {
    showToast("Already in favorites ⚠️", "warning");
    return;
  }

  favorites.push(meal);

  localStorage.setItem("favorites", JSON.stringify(favorites));

  showToast("Added to favorites ❤️", "success");
}

const form = document.getElementById("recipeForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let recipes = JSON.parse(localStorage.getItem("myRecipes")) || [];

  const newRecipe = {
    id: Date.now(),
    title: document.getElementById("title").value,
    ingredients: document.getElementById("ingredients").value,
    steps: document.getElementById("steps").value,
  };

  recipes.push(newRecipe);

  localStorage.setItem("myRecipes", JSON.stringify(recipes));

  showToast("Recipe saved successfully 🍲", "success");

  form.reset();

  displayRecipes();
});


function displayRecipes() {
  const list = document.getElementById("recipeList");

  let recipes = JSON.parse(localStorage.getItem("myRecipes")) || [];

  if (recipes.length === 0) {
    list.innerHTML = "<p>No recipes saved yet.</p>";
    return;
  }

  list.innerHTML = "";

  recipes.forEach((r) => {
    list.innerHTML += `
      <div class="card">

        <h3>${r.title}</h3>

        <p><b>Ingredients:</b> ${r.ingredients}</p>

        <p><b>Steps:</b> ${r.steps}</p>

      </div>
    `;
  });
}


displayRecipes();
