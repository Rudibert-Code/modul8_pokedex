let pokedexData = [];
let pokemonDetails = [];
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
        pokemonDetails = [];
        response = await fetch (pokedexData.results[i].url);
        pokemonDetails = await response.json(); 
        document.getElementById('main-container').innerHTML += cardTemplate(pokemonDetails);     
    }

}

function cardTemplate(pokemon){
    return `<div class="pokemon-card bg-normal">
        <section class="pokemon-header">
            <p>${getNumber(pokemon.id)}</p>
            <h2>${pokemon.name}</h2>
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

function getNumber(index){
    let number;
    if(index < 10){
        number = "00"+index;
    } else if(index >=10 && index < 100 ){
        number = "0"+index;
    } else{
        number = index;
    }
    return number
}

function getTypes(numberOfTypes){
}

