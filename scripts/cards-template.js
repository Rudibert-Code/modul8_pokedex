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
            <p class="clickable on-hover" onclick="closeDetailViewer()">X</p>
        </section>
        <img class="detail-viewer-icon" src="./assets/icons/icon-sound.png" onclick="playCrie()">
        <section class="detail-viewer-canvas">
            <img class="detail-img" src="${pokemon.sprites.front_default}">
        </section>
        <section class="detail-viewer-info-box">
            <nav class="detail-viewer-info-selection">
                <a onclick="renderAttributes(${pokemon.id})" id="attributes-title">Attributes</a>
                <p>|</p>
                <a onclick="renderStats(${pokemon.id})" id="stats-title">Stats</a>
            </nav>
            <section id="details">
                <section class="stats-window" id="pokemon-stats">
                </section>
            </section>
        </section>
    </section>
    <div class="clickable">
        <img class="hidden" src="./assets/icons/icon-end.png" id="block-list-end">
        <img class="" src="./assets/icons/icon-arrow.png" onclick="renderNext(${pokemon.id})" id="arrow-list-next">
    </div>`;
}

function statBarTemplate(statName,statInfo){
    return `<div class="stat-bar-max">
    <div class="stat-bar stat-high" id="${statName}"> <p class="stat-title">${statName}</p><p>${statInfo}</p></div>
    </div>`;
}