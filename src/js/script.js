const input_text = document.getElementById("search");
const button = document.getElementById("btn-filter");
const ol = document.getElementById("container-pokemons");
const btnNext = document.getElementById("btn-pagination-next");
const btnBack = document.getElementById("btn-pagination-back");
const counter = document.getElementById("counter");
let offset = 0;
let limit = 8; // Quantos pokémon vamos buscar por vez.

/****** FUNÇÃO PARA CRIAR A LISTA DE POKÉMONS *******/
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

/****** FUNÇÃO PARA FILTRAR OS POKÉMONS ***************/
async function buttonFilterPokemon() {
  const name = input_text.value.toLowerCase();
  const pokemon = await pokeApi.getPokemosName(name);
  
  console.log(pokemon);
  ol.innerHTML = pokemon;
};

button.addEventListener("click", buttonFilterPokemon);

/****** FUNÇÃO PARA O CONTADOR DE PÁGINAS *************/
function counterPageNext() {
  let sum = Number(counter.innerHTML);

  counter.innerHTML = sum + 1;
};

function counterPageBack() {
  let sum = Number(counter.innerHTML);

  counter.innerHTML = sum - 1;
};

/****** FUNÇÃO PARA PEGAR OS POKÉMONS NA API E COLOCAR NA PÁGINA *******/
function getListPokemons(offset, limit) {
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

/****** FUNÇÃO QUANDO O INPUT ESTVER VAZIO *******/
function checkEmptyInput() {
  if (!input_text.value) {
    getListPokemons(offset, limit);
  };
};

input_text.addEventListener("input", checkEmptyInput);

/****** FUNÇÃO PARA FAZER A BUSCA USANDO O BOTÃO ENTER DO TELCADO *******/
input_text.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonFilterPokemon();
  }
});

/****** FUNÇÕES PARA OS BOTÕES VOLTAR E PRÓXIMO *******/
function nextButtonFunction() {
  offset += limit;

  if (btnBack.disabled === true && offset > 0) {
    btnBack.disabled = false;
  };

  getListPokemons(offset, limit);
  counterPageNext();
};

function backButtonFunction() {
  if (offset <= 8) {
    btnBack.disabled = true;
  }

  offset -= limit;

  getListPokemons(offset, limit);
  counterPageBack();
};

btnNext.addEventListener("click", nextButtonFunction);
btnBack.addEventListener("click", backButtonFunction);

/****** FUNÇÕES PARA OS BOTÕES VOLTAR E PRÓXIMO USANDO AS TECLAS: SETA PARA A DIREITA/ESQUERDA *******/
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    nextButtonFunction();
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    backButtonFunction();
  }
});

/****** FUNÇÃO PARA BUSCAR OS POKÉMONS ASSIM QUE A PÁGINA CARREGAR *******/
window.onload = () => {
  getListPokemons(offset, limit);
};
