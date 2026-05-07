function goHome(){
      }
    }

    container.innerHTML = `
      <div class="recipe-container">

        <img src="${meal.strMealThumb}">

        <div class="recipe-content">

          <h1>${meal.strMeal}</h1>

          <p><strong>Category:</strong> ${meal.strCategory}</p>

          <p><strong>Cuisine:</strong> ${meal.strArea}</p>

          <h2>Instructions</h2>

          <p class="instructions">
            ${meal.strInstructions}
          </p>

          <h2>Ingredients</h2>

          <ul>
            ${ingredients}
          </ul>

          <a
            href="${meal.strYoutube}"
            target="_blank"
            class="video-btn"
          >
            Watch Tutorial
          </a>

        </div>

      </div>
    `;

  }catch(error){

    container.innerHTML =
    `<p>Failed to load recipe.</p>`;
  }
}

loadMeal();