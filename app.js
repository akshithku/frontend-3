const main = document.getElementById("main");
const text = document.getElementById("text");
const button = document.getElementById("btn");
const container = document.querySelector("#food");
const p = document.getElementById("para");
let list = document.querySelector("#ingreList");
const bts = document.querySelector(".btn");
const call = document.querySelectorAll("#trs");
var source = "";
button.addEventListener("click", () => {
  if (text.value != "") {
    source = text.value;
    text.value = "";
    container.innerHTML = "";
    p.innerHTML = "Results for your search:";
    allmeals(source);
  }
  async function allmeals(alt) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${alt}`)
      .then((list) => list.json())
      .then((data) => {
        // console.log(data);
        let item = data.meals;
        // console.log(item);
        item.forEach((alt) => {
          // console.log(alt);
          container.innerHTML += `
            <div
             class="hood">
            <img class="img1" src='${alt.strMealThumb}' alt="">
            <h4>${alt.strMeal}</h4>
            <button class="${alt.idMeal}" id="trs">ingrediants</button>
            </div>
            `;
        });
        const number = document.querySelectorAll("#trs");
        
        number.forEach((alt) => {
          alt.addEventListener("click", () => {
            
            fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${alt.className}`
            )
              .then((res) => res.json())
              .then((res) => {
                // console.log(res.meals[0])
                let result = res.meals[0]
                let Ingredient = [];
                for (let i = 1; i <= 20; i++) {
                  let igb = result[`strIngredient${i}`];
                  if (igb && igb != "") {
                    Ingredient.push(igb);
                  }
                }
                console.log(Ingredient);
                list.innerHTML="";
                
                Ingredient.forEach((elt) => {
                  
                  list.innerHTML+= `
                        <ul>
                        <li>${elt}</li>
                        </ul>
                        `;
                });

                console.log(list.innerHTML)

                // console.log(ingredient)

                // console.log(call);

                document.getElementById("myModal").style.display = "flex";
          
                document.getElementById("myModal").onclick = () => {
                  document.getElementById("myModal").style.display = "none";
                };
              }).catch(()=>{
                console.log("Invalid API")
              })
          });
        });
      })
      .catch(() => {
        p.innerHTML = `OOPS! Sorry the item is not Avalible`;
      });
  }
});

async function randomMeal() {
  await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((res) => {
      // console.log(res)
      // let data = res;
      let meal = document.createElement("div");
      meal.setAttribute("class", "meal");
      let img = document.createElement("img");
      img.setAttribute("src", `${res.meals[0].strMealThumb}`);
      img.setAttribute("class", "abc");
      let text = document.createElement("h3");
      text.innerHTML = `${res.meals[0].strMeal}`;
      let heading = document.createElement("h3");
      heading.innerHTML = `${res.meals[0].strArea}`;
      // let div=document.createElement("div")
      // let button=document.createElement("button")
      // button.innerHTML="Ingredients"
      // button.setAttribute("class","btn")

      // console.log(data.meals);
      meal.prepend(img);
      meal.append(text);
      meal.prepend(heading);
      // div.append(button)
      // meal.append(div)
      main.prepend(meal);

      let result = res.meals[0];
      let ingredients = [];
      for (let i = 1; i <= 20; i++) {
        let ing = result[`strIngredient${i}`];
        if (ing && ing != "") {
          ingredients.push(ing);
        }
      }
      list.innerHTML = "";
      ingredients.forEach((alt) => {
        list.innerHTML += `
            <ul>
            <li class="li">${alt}</li>
            </ul>
            `;
      });

      bts.onclick = () => {
        document.getElementById("myModal").style.display = "flex";
      };

      document.getElementById("myModal").onclick = () => {
        document.getElementById("myModal").style.display = "none";
      };
    })
    .catch(() => {
      console.log("Invalid API");
    });
}
randomMeal();
