let pokedexData = [];
let renderLimit = 20;

function init(){
    fetchData();
}

async function fetchData(){
    pokedexData = [];
    response = await fetch ("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
    pokedexData = await response.json(); 
    renderList();
}

async function renderList(){
    for (let i = 0; i < renderLimit; i++) {
        document.getElementById('main-container').innerHTML += cardTemplate(pokedexData[i]);       
    }
}

function cardTemplate(pokemonID){
    return `<div class="pokemon-card bg-fire">
        <section class="pokemon-header">
            <p>#132</p>
            <h2>Ditto</h2>
        </section>
        <section class="pokemon-canvas">
            <img class="pokemon-img" src="./assets/img/132.webp" alt="">
        </section>
        <section class="pokemon-type">
            <div class="placeholder"></div>
            <div class="placeholder"></div>
        </section>
    </div>`;
}