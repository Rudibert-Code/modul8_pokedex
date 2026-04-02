let pokedexData = [];
let pokemonDetails = [];
let detailViewer = [];
let previewLimiter = 0;
let renderLimit = 20;
let offset = 0;

function init(){
    fetchData();
}

async function fetchData(){
    showLoadingSpinner()  
    response = await fetch (`https://pokeapi.co/api/v2/pokemon?limit=${renderLimit}&offset=${offset}`);

    pokedexData = await response.json();

    offset += renderLimit;
    renderList();
}

async function renderList(){
    for (let i = 0; i < renderLimit; i++) {
        if (previewLimiter == 151) {
            closeLoadingScreen();
            return
        }
        pokemonDetails = [];
        response = await fetch (pokedexData.results[i].url);
        pokemonDetails = await response.json(); 
        document.getElementById('main-container').innerHTML += cardTemplate(pokemonDetails);
        getType(pokemonDetails);     
        previewLimiter++
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
    detailViewer = [];
    response = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
    detailViewer = await response.json(); 
    document.getElementById('detail-viewer').innerHTML = detailViewerTemplate(detailViewer);
    document.getElementById('pokemonAudio').src = detailViewer.cries.latest;
    document.getElementById('pokemonAudio').volume = 0.03;
    listEnd(pokemonID);
    document.getElementById('detail-viewer').showModal();
    document.documentElement.classList.add("scroll-stopper");
}

function renderNext(pokemonID){
    pokemonID++
    if (pokemonID >= offset) {
        fetchData();        
    }
    openDetailViewer(pokemonID);
}

function renderPrevious(pokemonID){
    pokemonID--
    openDetailViewer(pokemonID);
}

function listEnd(pokemonID){
    if (pokemonID <= 1) {
        document.getElementById('block-list-start').classList.toggle("hidden");
        document.getElementById('arrow-list-previous').classList.toggle("hidden");
    }
    if (pokemonID >= 151) {
        document.getElementById('block-list-end').classList.toggle("hidden");
        document.getElementById('arrow-list-next').classList.toggle("hidden");
    }
}

function closeDetailViewer(){
    document.getElementById('detail-viewer').innerHTML = "";
    document.getElementById('detail-viewer').close();
    document.documentElement.classList.remove("scroll-stopper");
}

function playCrie(){
    document.getElementById('pokemonAudio').play();
}

// search suggestions
// starting with 3rd entrie, look for include() among pokemon names in JSON
// suggest options
// select option - mouse click - transfare to input text
// search button : open dialog window on selected pokemon 

//document.getElementById("search-bar-input").addEventListener("keyup", renderSuggestions);

function renderSuggestions(){
    let inputID = document.getElementById('search-bar-input').value;
    if (inputID.length >= 3) {
        findSuggestions(inputID);
    }
}

let nameSuggestions;

async function findSuggestions(inputID){
    console.clear();
    let allData;
    response = await fetch (`https://pokeapi.co/api/v2/pokemon?limit=1349&offset=0`);
    allData = await response.json();
    for (let i = 0; i < allData.results.length; i++) {
        let nameSuggestions = allData.results[i].name;
        let ergebnis = nameSuggestions.includes(inputID);
        console.log(ergebnis);
        if (ergebnis == true) {    
                console.table(nameSuggestions);    

        }   
    }
}