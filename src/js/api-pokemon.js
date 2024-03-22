/*
API Pokémons
URL: https://pokeapi.co/api/v2/pokemon/
*/

const pokeApi = {
  convertPokemonModel: (pokemonsDetail) => {
    try {
      const pokemons = new Pokemon();

      pokemons.order = pokemonsDetail.order;
      pokemons.name = pokemonsDetail.name;
      pokemons.types = pokemonsDetail.types.map(
        (pokemonTypes) => pokemonTypes.type.name
      );
      pokemons.type = pokemons.types[0];
      pokemons.imgSrc = pokemonsDetail.sprites.other.dream_world.front_default;

      return pokemons;
    } catch (error) {
      console.error(error);
      return "<h3 class='error'>O Pokémon que você busca não foi encontado... 😭</h3>";
    };
  },
  getPokemonsDetail: (pokemon) => {
    return fetch(pokemon.url)
      .then((response) => response.json())
      .then(pokeApi.convertPokemonModel)
      .catch((error) => {
        console.error(error);
        return "<h3 class='error'>O Pokémon que você busca não foi encontado... 😭</h3>";
      });
    // .finally(() => console.log('Requisição getPokemonsDetail executa!'))
  },
  getPokemons: (offset = 0, limit = 7) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
      .then((response) => response.json())
      .then((jsonBody) => jsonBody.results)
      .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
      .then((detailRequests) => Promise.all(detailRequests))
      .then((pokemonsDetail) => pokemonsDetail)
      .catch((error) => {
        console.error(error);
        return "<h3 class='error'>O Pokémon que você busca não foi encontado... 😭</h3>";
      });
    // .finally(() => console.log('Requisição getPokemos executa!'))
  },
  getPokemosName: async (name_pokemon) => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${name_pokemon}`;
      const data = await fetch(url);
      const response = await data.json();

      const pokemon = {
        type: response.types[0].type.name,
        order: response.order,
        name: response.name,
        types: response.types,
        imgSrc: response.sprites.other.dream_world.front_default,
      };

      return `<li class="cards-pokemons ${pokemon.type}">
        <span class="number">#0${pokemon.order}</span>
        <span class="name">${pokemon.name}</span>
  
        <div class="detail">
          <ol class="types">
            ${pokemon.types
              .map(
                (item) =>
                  `<li class="type type-${pokemon.type}">${item.type.name}</li>`
              )
              .join("")}
          </ol>
          <img src=${pokemon.imgSrc} alt=${
        pokemon.name
      } class="pokemons-images" />
        </div>
      </li>`;
    } catch (error) {

      console.error(error);
      return "<h3 class='error'>O Pokémon que você busca não foi encontado</h3>";
    };
  }
};
