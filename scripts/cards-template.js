function cardTemplate(pokemon){
    return `<div class="pokemon-card bg-${pokemon.types[0].type.name}" onclick="openDetailViewer(${pokemon.id})">
        <section class="pokemon-header">
            <p>${getNumber(pokemon.id)}</p>
            <h2>${pokemon.name}</h2>
        </section>
        <section class="pokemon-canvas">
            <img class="pokemon-img" src="${pokemon.sprites.front_default}" alt="">
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
            <p onclick="closeDetailViewer()">X</p>
        </section>
        <section class="pokemon-canvas">
            <img class="detail-img" src="${pokemon.sprites.front_default}">
        </section>
        <section>
            <section></section>
            <section></section>
            <section></section>
        </section>
    </section>`;
}