function reloadPage() {
  location.reload();
}

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const list = document.getElementById("favoritesList");

function displayFavorites() {
  if (favorites.length === 0) {
    list.innerHTML = `
      <div class="empty">

        <h2>No favorites yet</h2>

        <p>
          Start adding recipes you love.
        </p>

      </div>
    `;

    return;
  }

  list.innerHTML = "";

  favorites.forEach((meal) => {
    list.innerHTML += `

      <div
        class="favorite-card"
        onclick="openMeal('${meal.idMeal}')"
      >

        <img
          src="${meal.strMealThumb}"
          alt="${meal.strMeal}"
        >

        <div class="favorite-info">

          <h3>${meal.strMeal}</h3>

          <p class="category">
            ${meal.strCategory}
          </p>

          <p>
            ${meal.strArea} Cuisine
          </p>

          <button
            class="remove-btn"
            onclick="removeFavorite('${meal.idMeal}');event.stopPropagation();"
          >
            Remove Favorite
          </button>

        </div>

      </div>

    `;
  });
}

function removeFavorite(id) {
  favorites = favorites.filter((meal) => meal.idMeal !== id);

  localStorage.setItem("favorites", JSON.stringify(favorites));

  displayFavorites();
}

function openMeal(id) {
  localStorage.setItem("selectedMeal", id);

  window.location.href = "recipe.html";
}

displayFavorites();
