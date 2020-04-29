fetch("http://localhost:8088/food")
.then(r => r.json())
.then(foodArray => {
    console.table(foodArray);
    foodArray.forEach(food => {
        fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
        .then(response => response.json())
        .then(productInfo => {
            console.log(food.barcode)
            if (productInfo.product.ingredients_text) {
                food.ingredients = productInfo.product.ingredients_text
              } else {
                food.ingredients = "No ingredients listed"
              }

              if (productInfo.product.nutriments["energy-kcal"]) {
                food.calories = `${productInfo.product.nutriments["energy-kcal"]} kcal`
              } else {
                food.calories = "No calories listed"
              }

              if (productInfo.product.nutriments["fat"]) {
                food.fat = `${productInfo.product.nutriments["fat"]} g fat`
              } else {
                food.fat = "No fat listed"
              }

              if (productInfo.product.nutriments["sugars_value"]) {
                food.sugar = `${productInfo.product.nutriments["sugars_value"]} g sugar`
              } else {
                food.sugar = "No sugar listed"
              }


              document.querySelector(".food-container").innerHTML += `
              <div class="food-list"><h2>${food.name}</h2>
              ${food.ethnicity}, ${food.category} 
              <br> ${food.calories} 
              <br> ${food.fat}
              <br> ${food.sugar}
              <br><h4>Ingredients</h4>${food.ingredients} 
              </div>`
        })
        
    })
})



