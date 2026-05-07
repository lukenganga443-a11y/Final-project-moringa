function goHome() {
  window.location.href = "index.html";
}

const mealId = localStorage.getItem("selectedMeal");

/* LOAD RECIPE */
async function loadMeal() {
  const container = document.getElementById("mealDetails");

  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
    );

    const data = await res.json();

    const meal = data.meals[0];

    let ingredients = "";

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];

      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients += `
          <li>
            ${measure} ${ingredient}
          </li>
        `;
      }
    }

    container.innerHTML = `

      <div class="recipe-container">

        <img
          src="${meal.strMealThumb}"
          alt="${meal.strMeal}"
        >

        <div class="recipe-content">

          <h1>${meal.strMeal}</h1>

          <div class="recipe-meta">

            <div class="meta-box">
              Category: ${meal.strCategory}
            </div>

            <div class="meta-box">
              Cuisine: ${meal.strArea}
            </div>

          </div>

          <h2>Instructions</h2>

          <p class="instructions">
            ${meal.strInstructions}
          </p>

          <div class="ingredients">

            <h2>Ingredients</h2>

            <ul>
              ${ingredients}
            </ul>

          </div>

          ${
            meal.strYoutube
              ? `
            <a
              href="${meal.strYoutube}"
              target="_blank"
              class="video-btn"
            >
              Watch Tutorial
            </a>
            `
              : ""
          }

        </div>

      </div>

    `;
  } catch (error) {
    container.innerHTML = `
      <p class="loading">
        Failed to load recipe.
      </p>
    `;
  }
}

loadMeal();
