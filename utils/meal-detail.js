const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get('i');

axios
  .get(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  .then(res => {
    const result = res.data.meals;
    if (result.length > 0) {
      const data = result[result.length - 1];

      const pageTitle = document.getElementById('title');
      const breadCrumbsMeals = document.getElementById('breadcrumbs-meals');

      const imgMeal = document.getElementById('meal-image');
      const instructionsContainer = document.getElementById('instructions');
      const titleMeal = document.getElementById('title-meal');
      const recipesListContainer = document.getElementById('recipes-list');
      const youtubeFrame = document.getElementById('youtubeFrame');

      const instructionsFormated = data.strInstructions.replace(
        /\r\n|\r|\n/g,
        '<br/> '
      );

      const dataRecipes = [];
      for (let i = 1; i <= 20; i++) {
        const measure = data[`strMeasure${i}`];
        const ingredient = data[`strIngredient${i}`];
        if (measure && ingredient) {
          dataRecipes.push({ measure, ingredient });
        }
      }
      let recipesList;
      if (dataRecipes.length > 0) {
        recipesList = dataRecipes
          .map(item => `<li>${item.measure} ${item.ingredient}</li>`)
          .join('');
        recipesListContainer.innerHTML = recipesList;
      }

      const youtubeLink = data.strYoutube.split('=');
      const videoId = youtubeLink[youtubeLink.length - 1];

      pageTitle.textContent = `${data.strMeal} Recipes`;
      breadCrumbsMeals.innerHTML = `${data.strMeal}`;

      imgMeal.src = data.strMealThumb;
      imgMeal.alt = data.strMeal + ' Meal';
      instructionsContainer.innerHTML = instructionsFormated;
      titleMeal.innerHTML = data.strMeal;
      youtubeFrame.src = `https://www.youtube.com/embed/${videoId}`;
    } else {
      alert('data kosong');
    }
  })
  .catch(err => {
    alert(err);
  });
