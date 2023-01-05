import { climas } from "./climas.js";


let ascOrderedClimas = [];

const ascOrderList = () => {
    ascOrderedClimas = climas.sort((a, b) => a.price - b.price);
  };

const displayAllClima=()=>{
    ascOrderList();
   const climaContainer = document.getElementById("clima-container");
   ascOrderedClimas.map(clima=>{
        let card = document.createElement('div');
        card.className = 'clima-card';
        climaContainer.append(card)
        let climaPicsContainer = document.createElement('div');
        climaPicsContainer.className = "clima-pics-container";
        card.append(climaPicsContainer)
        let climaImage = document.createElement('img');
        climaImage.src = clima.src;
        climaImage.className = 'clima-card-pics';
        climaPicsContainer.append(climaImage)
        let detailsContainer = document.createElement('div');
        detailsContainer.className = "details-container";
        card.append(detailsContainer)
        let title = document.createElement('h3')
        title.innerText = clima?.brand.toUpperCase() + " " + clima?.type.toUpperCase()
        let price = document.createElement("p")
        price.innerText = clima.price+" "+"Ft"
        detailsContainer.append(title,price)
     }
   )
}

window.addEventListener('load', ()=>displayAllClima())