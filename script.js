const POKE_API = "https://pokeapi.co/api/v2/pokemon/";
let container = document.querySelector(".container");
let filterBtn = document.getElementById("filter_btn")
let resetBtn = document.getElementById("reset_btn")

let search = document.getElementById("search")
let errorMsg = document.querySelector(".error-msg")

let loading = true; 


function hideShimmer() {
    const shimmers = document.querySelectorAll(".shimmer-card");
    shimmers.forEach((item) => item.style.display = "none");
    loading = false;
}

function pokeCard(data) {
    let itemCard = document.createElement("div");
    itemCard.classList.add("card");
    // itemCard.classList.add(`${data.types[0].type.name}`);
    itemCard.innerHTML = `
        <div class="card-inner">
            <div class="card-front ">
                <div class="id">${data.id}</div>
                <div class="image">
                    <img src=${data.sprites.front_default} alt="img">
                </div>
                <h2 class="name">${data.name}</h2>
                <h4> -special moves-</h4>
                <h5 class="move">${data?.moves[1]?.move?.name}, ${data?.moves[0]?.move?.name}</h5>
                <h4 class="abilities">${data.abilities[0]?.ability?.name}</h4>
            </div>

            <div class="card-back">
                <div class="id">${data.id}</div>
                <div class="image">
                    <img src=${data.sprites.back_default} alt="img">
                </div>
                <h2 class="name">${data.name}</h2>
                <h3 class="height">Height: ${data.height} cm</h3>
                <h4 class="weight">Weight: ${data.weight} gms</h4>
                <h5 class="exp">Base Exp: ${data.base_experience} XP</h5>
            </div>
        </div>
    `;
    let innerCard = itemCard.querySelector(".card-inner");
    innerCard.classList.add(`${data.types[0].type.name}`);

    return itemCard;
}

async function fetchPokeData() {
    for (let i = 1; i < 151; i++) {
        if (i === 15) hideShimmer();
        const response = await fetch(`${POKE_API}${i}`);
        const data = await response.json();
        console.log(data);
        // console.log(data.abilities[0].ability.name);
        console.log(data.name);
        let pokemonCard = pokeCard(data);
        container.appendChild(pokemonCard);
    }
}

function filterCards() {
    let allCards = document.querySelectorAll(".card");
    let filterValue = document.getElementById("pokemon-types").value;

    allCards.forEach(card => {
        let type = card.querySelector(".card-inner").classList[1]; // Get Pokémon type from class (e.g., "grass", "fire")

        if (filterValue === "all") {
            card.style.display = "block";
            search.value = "";
        } else if (type === filterValue) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

function resetAll() {
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(card => {
        card.style.display = "block";
    })
    search.value = "";
    document.getElementById("pokemon-types").value = "all"; 
}

function searchFilter() {
    let searchValue = search.value.toLowerCase();
    let allCards = document.querySelectorAll(".card");

    allCards.forEach((card) => {
        let naam = card.querySelector(".name").textContent;
        if (naam.startsWith(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";

        }
    })
}

fetchPokeData();

filterBtn.addEventListener("click", filterCards);
resetBtn.addEventListener("click", resetAll);
search.addEventListener("keyup", searchFilter);
