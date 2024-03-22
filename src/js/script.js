const input_text = document.getElementById("search");
const button = document.getElementById("btn-filter");
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
        <img src=${pokemon.imgSrc} alt=${
    pokemon.name
  } class="pokemons-images" />
      </div>
    </li>`;
};

async function buttonFilterPokemon() {
  const name = input_text.value.toLowerCase();
  const pokemon = await pokeApi.getPokemosName(name);
  
  console.log(pokemon);
  ol.innerHTML = pokemon;
};

button.addEventListener("click", buttonFilterPokemon);

function counterPageNext() {
  let sum = Number(counter.innerHTML);

  counter.innerHTML = sum + 1;
};

function counterPageBack() {
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
};

function checkEmptyInput() {
  if (!input_text.value) {
    buttons(offset, limit);
  };
};

input_text.addEventListener("input", checkEmptyInput);

buttons(offset, limit);

btnNext.addEventListener("click", () => {
  offset += limit;

  if (btnBack.disabled === true && offset > 0) {
    btnBack.disabled = false;
  };

  buttons(offset, limit);
  counterPageNext();
});

btnBack.addEventListener("click", () => {
  if (offset <= 8) {
    btnBack.disabled = true;
  };

  offset -= limit;

  buttons(offset, limit);
  counterPageBack();
});

window.onload = () => {
  buttons(offset, limit);
};
