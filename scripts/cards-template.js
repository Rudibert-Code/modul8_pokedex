function cardTemplate(pokemon){
    return `<div class="pokemon-card bg-${pokemon.types[0].type.name}" onclick="openDetailViewer(${pokemon.id})">
        <section class="pokemon-header">
            <p>${getNumber(pokemon.id)}</p>
            <h2>${pokemon.name}</h2>
        </section>
        <section class="pokemon-canvas">
            <img class="pokemon-img" src="${pokemon.sprites.front_default}">
        </section>
        <section class="pokemon-type">
            <img class="iconType" id="${pokemon.name}-type-1" src="">
            <img class="iconType" id="${pokemon.name}-type-2" src="">
        </section>
    </div>`;
}

function detailViewerTemplate(pokemon){
    return `<div class="flip-img clickable">
            <img class="hidden" src="./assets/icons/icon-end.png" id="block-list-start">
            <img class="" src="./assets/icons/icon-arrow.png" onclick="renderPrevious(${pokemon.id})" id="arrow-list-previous">
        </div>
        <section class="pokemon-detail-viewer bg-${pokemon.types[0].type.name}">
        <section class="pokemon-header detail-header">
            <p>${getNumber(pokemon.id)}</p>
            <h2>${pokemon.name}</h2>
            <p class="clickable" onclick="closeDetailViewer()">X</p>
        </section>
        <img class="detail-viewer-icon" src="./assets/icons/icon-sound.png" onclick="playCrie()">
        <section class="detail-viewer-canvas">
            <img class="detail-img" src="${pokemon.sprites.front_default}">
        </section>
        <section class="detail-viewer-info-box">
            <section class="detail-viewer-info-selection"></section>
            <section id="details"></section>
        </section>
    </section>
    <div class="clickable">
        <img class="hidden" src="./assets/icons/icon-end.png" id="block-list-end">
        <img class="" src="./assets/icons/icon-arrow.png" onclick="renderNext(${pokemon.id})" id="arrow-list-next">
    </div>`;
}