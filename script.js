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
    renderAttributes(pokemonID);
    renderEvolution(pokemonID);
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

async function renderEvolution(pokemonID){
    let prevXP = detailViewer.base_experience;
        pokemonID--
        if (pokemonID <= 0) {
            return
        }
        response = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
        let pokemonJSON = await response.json();
        let currentXP = pokemonJSON.base_experience;
        if (currentXP <= prevXP) {
            document.getElementById('previousEvolution').innerHTML = `<img class="evo-chain-img" src="${pokemonJSON.sprites.front_default}">`;
            prevXP = currentXP;
        } else{
            return
        }
}

//let evolutionChain = [];
//
//async function renderEvolution(pokemonID){
//    evolutionChain = [];
//    document.getElementById('pokemon-stats').innerHTML="";
//    document.getElementById('evolution-title').classList.toggle("text-bold");
//    document.getElementById('attributes-title').classList.remove("text-bold");
//    document.getElementById('stats-title').classList.remove("text-bold");
//    let baseXP = detailViewer.base_experience;
//    evolutionChain. push (detailViewer.sprites.front_default);
//    compPreviousXP(pokemonID, baseXP);
//    compNextXP(pokemonID, baseXP);
//}
//
//async function compNextXP(nextID, nextXP){
//    let lastXP = nextXP;
//    for (let i = 0; i < 3; i++) {
//        nextID++
//        response = await fetch (`https://pokeapi.co/api/v2/pokemon/${nextID}`);
//        let pokemonJSON = await response.json();
//        let currentXP = pokemonJSON.base_experience;
//        if (currentXP >= lastXP) {
//            evolutionChain.push(pokemonJSON.sprites.front_default);
//            //document.getElementById('pokemon-stats').innerHTML += `<img class="detail-img evo-chain-img" src="${pokemonJSON.sprites.front_default}">`;
//            lastXP = currentXP;
//        } else{
//            renderEvolutionChain();
//            return
//        }
//    }
//}
//
//async function compPreviousXP(lastID, lastXP){
//    let prevXP = lastXP;
//    for (let i = 3; i > 0; i--) {
//        lastID--
//        //if (lastID <= 0) {
//        //    return
//        //}
//        response = await fetch (`https://pokeapi.co/api/v2/pokemon/${lastID}`);
//        let pokemonJSON = await response.json();
//        let currentXP = pokemonJSON.base_experience;
//        if (currentXP <= prevXP) {
//            evolutionChain.unshift(pokemonJSON.sprites.front_default);
//            //document.getElementById('pokemon-stats').innerHTML += `<img class="detail-img evo-chain-img" src="${pokemonJSON.sprites.front_default}">`;
//            prevXP = currentXP;
//        } else{
//            return
//        }
//    }
//}
//
//function renderEvolutionChain(){
//    for (let i = 0; i < evolutionChain.length; i++) {
//        document.getElementById('pokemon-stats').innerHTML += `<img class="detail-img evo-chain-img" src="${evolutionChain[i]}">`;
//    }
//}

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