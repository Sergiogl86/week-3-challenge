import Component from "./Component.js";
import Pokemon from "./Pokemon.js";
import Service from "./Service.js";

class Page extends Component {
  paginaPokemons;
  urlPokemonsPagina;
  constructor(parentElement, className, tag, url) {
    super(parentElement, className, tag);
    this.urlPokemonsPagina = url;

    (async () => {
      let servicePokemon = new Service(this.urlPokemonsPagina);
      let mostrarPokemon = await servicePokemon.getService(
        this.urlPokemonsPagina
      );
      console.log(mostrarPokemon);
      this.paginaPokemons = mostrarPokemon.results;
      this.paginaPokemons.map(
        (pokemon) =>
          new Pokemon(".componente", "pokemonBox__pokemon", "div", pokemon.url)
      );
    })();

    /*const pruebaPokemon = new Pokemon(
      ".componente",
      "pokemonBox__pokemon",
      "div",
      url
    );*/
  }
}

export default Page;
