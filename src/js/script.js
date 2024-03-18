const ol = document.getElementById("container-pokemons");
const btnNext = document.getElementById("btn-pagination-next");
const btnBack = document.getElementById("btn-pagination-back");
const counter = document.getElementById("counter");
let offset = 0;
let limit = 8; // Quantos pokémon vamos buscar por vez.

const createListPokemon = (pokemon) => {
  return `
    <li class="cards-pokemons ${pokemon.type}">
      <span class="number">#0${pokemon.order}</span>
      <span class="name">${pokemon.name}</span>

      <div class="detail">
        <ol class="types">
          ${pokemon.types
            .map((type) => `<li class="type type-${pokemon.type}">${type}</li>`)
            .join("")}
        </ol>
        <img src=${pokemon.imgSrc} alt=${pokemon.name} class="pokemons-images" />
      </div>
    </li>`;
};

function counterPageNext(){
  let sum = Number(counter.innerHTML);
  
  counter.innerHTML = sum + 1;
};

function counterPageBack(){
  let sum = Number(counter.innerHTML);
  
  counter.innerHTML = sum - 1;
};

function buttons(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const listItens = pokemons
      .map((pokemon) => {
        // console.log(pokemon.url);
        return createListPokemon(pokemon);
      })
      .join("");

    ol.innerHTML = listItens;
  });
}

buttons(offset, limit);

btnNext.addEventListener("click", () => {
  offset += limit;

  if (btnBack.disabled === true && offset > 0) {
    btnBack.disabled = false;
  }

  buttons(offset, limit);
  counterPageNext();
});

btnBack.addEventListener("click", () => {
  if (offset <= 8) {
    btnBack.disabled = true;
  }

  offset -= limit;

  buttons(offset, limit);
  counterPageBack();
});
