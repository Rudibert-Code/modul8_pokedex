function cardTemplate(pokemon){
    return `<div class="pokemon-card bg-${pokemon.types[0].type.name}">
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