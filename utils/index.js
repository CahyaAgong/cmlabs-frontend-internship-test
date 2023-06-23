axios
  .get('https://www.themealdb.com/api/json/v1/1/categories.php')
  .then(response => {
    const result = response.data.categories;
    if (result.length > 0) {
      const dataContainer = document.getElementById('dataContainer');

      const dataHTML = result
        .map(
          item => `<a href="./../pages/category-detail/index.html?c=${item.strCategory}">
              <div
                class="w-full px-4 py-2 text-center rounded-xl flex items-center justify-center overflow-hidden relative"
              >
                <img
                  src="${item.strCategoryThumb}"
                  alt="meals category"
                  class="bg-cover bg-[150%]"
                />
                <div
                  class="absolute z-10 w-full h-full bg-black bg-opacity-40 flex items-center justify-center hover:bg-opacity-25 hover:cursor-pointer"
                >
                  <h2 class="text-white text-center font-semibold text-2xl opacity-100">
                    ${item.strCategory}
                  </h2>
                </div>
              </div>
            </a>`
        )
        .join('');
      dataContainer.innerHTML = dataHTML;
    } else {
      alert('data kosong');
    }
  })
  .catch(error => {
    console.error(error);
  });
