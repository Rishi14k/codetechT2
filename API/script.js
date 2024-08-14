document.getElementById('searchButton').addEventListener('click', fetchRecipes);

function fetchRecipes() {
    const query = document.getElementById('searchInput').value;
    const appId = '3fc05ae3';  
    const appKey = '48d5ba85fa8f099c3a0e92624d27956c';

    fetch(`https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`)
        .then(response => response.json())
        .then(data => displayRecipes(data.hits))
        .catch(error => console.error('Error fetching data:', error));
}

function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipeContainer');
    recipeContainer.innerHTML = '';

    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;

        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe';

        recipeDiv.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.label}">
            <h2>${recipe.label}</h2>
            <p>Calories: ${Math.round(recipe.calories)}</p>
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        `;

        recipeContainer.appendChild(recipeDiv);
    });
}
