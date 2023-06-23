const urlParams = new URLSearchParams(window.location.search);
const categoryName = urlParams.get('c');

axios
  .get(`http://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
  .then(res => {
    const result = res.data.meals;
    if (result.length > 0) {
      const pageTitle = document.getElementById('title');
      const dataContainer = document.getElementById('dataContainer');
      const breadCrumbsCategory = document.getElementById(
        'breadcrumbs-category'
      );

      const dataHTML = result
        .map(
          item => `<a href="./../meal-detail/index.html?i=${item.idMeal}">
        <div class="bg-white rounded-xl p-3 flex flex-col h-full hover:border border-[#F43A30]">
        <div class="rounded-lg overflow-hidden flex flex-shrink-0">
          <img
            src="${item.strMealThumb}"
            alt="${item.strMeal}"
            class="object-cover"
          />
        </div>
        <div class="mt-2 overflow-hidden">
          <h2 class="text-black font-semibold text-lg truncate">${
            item.strMeal
          }</h2>
          <p class="text-xs font-light mt-1 text-gray-800">
            <span class="font-semibold">${
              Math.floor(Math.random() * 11) + 1
            } people's</span>  like this recipes
          </p>
        </div>
      </div>
        </a>`
        )
        .join('');

      pageTitle.textContent = `Category Detail - ${categoryName}`;
      dataContainer.innerHTML = dataHTML;
      breadCrumbsCategory.innerHTML = categoryName;
    } else {
      alert('data kosong');
    }
  })
  .catch(err => {
    alert(err);
  });
