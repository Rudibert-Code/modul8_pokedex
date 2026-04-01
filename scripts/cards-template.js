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
    return `<section class="pokemon-detail-viewer bg-${pokemon.types[0].type.name}">
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
            <section id="details">
                <div class="stat-bar" id="stat-bar-hp">HP</div>
            </section>
        </section>
    </section>`;
}