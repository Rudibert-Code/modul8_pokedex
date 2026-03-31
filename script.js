let pokedexData = [];
let pokemonDetails = [];
let detailViewer = [];
let renderLimit = 20;
let offset = 0;

function init(){
    fetchData();
}

async function fetchData(){
    showLoadingSpinner()  
    response = await fetch (`https://pokeapi.co/api/v2/pokemon?limit=${renderLimit}&offset=${offset}`);
    offset = offset + renderLimit;
    pokedexData = await response.json(); 
    renderList();
}

async function renderList(){
    for (let i = 0; i < renderLimit; i++) {
        pokemonDetails = [];
        response = await fetch (pokedexData.results[i].url);
        pokemonDetails = await response.json(); 
        document.getElementById('main-container').innerHTML += cardTemplate(pokemonDetails);
        getType(pokemonDetails);     
    }
    document.getElementById('next-min').innerHTML = offset + 1;
    document.getElementById('next-max').innerHTML = offset + renderLimit;
    closeLoadingScreen();
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

function getType(pokemon){
    if (pokemon.types.length == 2) {
        document.getElementById(`${pokemon.name}-type-2`).src=`./assets/icons/types/${pokemon.types[0].type.name}.png`;
        document.getElementById(`${pokemon.name}-type-1`).src=`./assets/icons/types/${pokemon.types[1].type.name}.png`;
    } else{
        document.getElementById(`${pokemon.name}-type-2`).src=`./assets/icons/types/${pokemon.types[0].type.name}.png`;
        document.getElementById(`${pokemon.name}-type-1`).classList.toggle("hidden");
    }
}

async function openDetailViewer(pokemonID){
    pokemonID--
    detailViewer = [];
    response = await fetch (pokedexData.results[pokemonID].url);
    detailViewer = await response.json(); 
    document.getElementById('detail-name').innerHTML = detailViewer.name;
    document.getElementById('detail-number').innerHTML = getNumber(detailViewer.id);
    document.getElementById('detail-image').src = detailViewer.sprites.front_default;

    document.getElementById('detail-viewer').showModal();
    document.documentElement.classList.add("scroll-stopper");
}

function closeDetailViewer(){
    document.getElementById('detail-viewer').close();
    document.documentElement.classList.remove("scroll-stopper");
}