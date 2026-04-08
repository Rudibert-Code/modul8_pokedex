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
    document.getElementById('error-message').close();
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
    renderAttributes(pokemonID);
    checkForEevee(pokemonID);
    document.getElementById('detail-viewer').showModal();
    document.documentElement.classList.add("scroll-stopper");
}

async function renderStats(){
    document.getElementById('pokemon-stats').innerHTML="";
    document.getElementById('stats-title').classList.toggle("text-bold");
    document.getElementById('attributes-title').classList.remove("text-bold");   
    for (let i = 0; i < 6; i++) {
        let statName = detailViewer.stats[i].stat.name;
        let statInfo = detailViewer.stats[i].base_stat;
        let barValue = (30 + (statInfo / 255 * 100)).toFixed(0);
        document.getElementById('pokemon-stats').innerHTML += statBarTemplate(statName,statInfo);
        document.getElementById(statName).style.width = barValue + "%";
        colorBar(statName, statInfo);
    }
}

function checkForEevee(pokemonID){
    if (pokemonID >= 134 && pokemonID <= 136) {
        renderEeveelution(pokemonID);
    } else{
        renderEvolution(pokemonID);
    }
}

async function renderEeveelution(pokemonID){
    let pokemonXP = detailViewer.base_experience;
    for (let index = 3; index > 0; index--) {
        pokemonID--
        if (pokemonID <= 0) {
            return
        }
        response = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
        let pokemonJSON = await response.json();
        let currentXP = pokemonJSON.base_experience;
        if (currentXP < pokemonXP) {
            document.getElementById('previousEvolution').innerHTML = `<img class="evo-chain-img" src="${pokemonJSON.sprites.front_default}">`;
            index = 0;
        }
    }
}

async function renderEvolution(pokemonID){
    let pokemonXP = detailViewer.base_experience;
    let pokemonType = detailViewer.types[0].type.name;
        pokemonID--
        if (pokemonID <= 0) {
            return
        }
        response = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
        let pokemonJSON = await response.json();
        let currentXP = pokemonJSON.base_experience;
        let currenType = pokemonJSON.types[0].type.name;
        if (currentXP < pokemonXP && currenType == pokemonType) {
            document.getElementById('previousEvolution').innerHTML = `<img class="evo-chain-img" src="${pokemonJSON.sprites.front_default}">`;
        } else{
            return
        }
}

async function renderAttributes(pokemonID){
    document.getElementById('pokemon-stats').innerHTML="";
    document.getElementById('attributes-title').classList.toggle("text-bold");
    document.getElementById('stats-title').classList.remove("text-bold");
    response = await fetch (`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`);
    let pokemonJSON = await response.json();
    let pokemonDescription = pokemonJSON.flavor_text_entries[0].flavor_text;
    let pokemonDescriptionFixed = pokemonDescription.replace("\f", " ");
    let pokemonHeight = detailViewer.height;
    let displayHeight = "Height: " + (pokemonHeight / 10) + "m";
    let pokemonWeight = detailViewer.weight;
    let displayWeight = "Weight: " + (pokemonWeight / 10) + "kg";
    document.getElementById('pokemon-stats').innerHTML=`<div class="attribute-box"><p>${displayHeight}</p>
    <p>${displayWeight}</p><span>${pokemonDescriptionFixed}</span></div>`;
}

function colorBar(targetID, barValue){
        if (barValue >= 99 ) {
            document.getElementById(targetID).classList.add("stat-high");
        } else if(barValue <= 33 ){
            document.getElementById(targetID).classList.add("stat-low");
        } else{
            document.getElementById(targetID).classList.add("stat-mid");
        }
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
        document.getElementById('block-list-start-small').classList.toggle("hidden");
        document.getElementById('arrow-list-previous').classList.toggle("hidden");
        document.getElementById('arrow-list-previous-small').classList.toggle("hidden");
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

function getSuggestions(){
    let inputID = document.getElementById('search-bar-input').value;
    if (inputID.length >= 3) {
        document.getElementById('search-suggestions').open = true;
        findSuggestions(inputID);
    }
        if (inputID.length < 3) {
        numberOfSuggestions = 0
        document.getElementById('search-suggestions').open = false;
        document.getElementById('search-suggestions').innerHTML = "";
    }
}

let nameSuggestions;

async function findSuggestions(inputID){
    document.getElementById('search-suggestions').innerHTML = "";
    let allData;
    response = await fetch (`https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`);
    allData = await response.json();
    for (let i = 0; i < allData.results.length; i++) {
        let nameSuggestions = allData.results[i].name;
        let ergebnis = nameSuggestions.includes(inputID);
        console.log(ergebnis);
        if (ergebnis == true) {    
                renderSuggestions(nameSuggestions, i);   
        }   
    }
}

let numberOfSuggestions = 0;

function renderSuggestions(nameSuggestions, suggestionID){
    if (numberOfSuggestions == 3) {
        return
    } else{
        document.getElementById('search-suggestions').innerHTML += `<a class="suggestion-text clickable" onclick="addSuggestion(${suggestionID})" id="suggestion-${suggestionID}">${nameSuggestions}</a><br>`;
        numberOfSuggestions++
    }
}

function addSuggestion(suggestionID){
    let newSuggestion = document.getElementById("suggestion-" + suggestionID).innerHTML;
    document.getElementById('search-bar-input').value = newSuggestion;
    document.getElementById('search-suggestions').innerHTML = "";
    document.getElementById('search-suggestions').open = false;
}

async function searchPokemon(){
    let searchName = document.getElementById('search-bar-input').value;
    response = await fetch (`https://pokeapi.co/api/v2/pokemon/${searchName}`);
    let tempArray = await response.json();
    if (tempArray.id > offset) {
        document.getElementById('error-message').showModal();
        document.documentElement.classList.add("scroll-stopper");
        document.getElementById('error-next-min').innerHTML = offset + 1;
        document.getElementById('error-next-max').innerHTML = offset + renderLimit;
    } else{
        document.getElementById('search-bar-input').value = "";
        openDetailViewer(tempArray.id);
    }
}

