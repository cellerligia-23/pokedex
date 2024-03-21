/*
API Pokémons
URL: https://pokeapi.co/api/v2/pokemon/
*/

const pokeApi = {
  convertPokemonModel: (pokemonsDetail) => {
    const pokemons = new Pokemon();

    pokemons.order = pokemonsDetail.order;
    pokemons.name = pokemonsDetail.name;
    pokemons.types = pokemonsDetail.types.map(
      (pokemonTypes) => pokemonTypes.type.name
    );
    pokemons.type = pokemons.types[0];
    pokemons.imgSrc = pokemonsDetail.sprites.other.dream_world.front_default;

    // console.log(pokemons);
    return pokemons;
  },
  getPokemonsDetail: (pokemon) => {
    return fetch(pokemon.url)
      .then((response) => response.json())
      .then(pokeApi.convertPokemonModel)
      .catch((error) => console.error(error));
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
      .catch((error) => console.error(error));
    // .finally(() => console.log('Requisição getPokemos executa!'))
  },
};
