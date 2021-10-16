import Component from "./Component.js";
import Pokemon from "./Pokemon.js";
import Service from "./Service.js";
import Button from "./Button.js";

class Page extends Component {
  paginaPokemons;
  urlPokemonsPagina;
  constructor(parentElement, className, tag, url) {
    super(parentElement, className, tag);
    this.urlPokemonsPagina = url;
    this.createHTML();
    new Button(
      ".componente__navegacion",
      "componente_boton-pagina",
      "button",
      "|Pagina Anterior|",
      this.paginaAnterior
    );
    new Button(
      ".componente__navegacion",
      "componente_boton-pagina",
      "button",
      "|Pagina Siguiente|",
      this.paginaSiguiente
    );

    (async () => {
      let servicePokemon = new Service(this.urlPokemonsPagina);
      let mostrarPokemon = await servicePokemon.getService(
        this.urlPokemonsPagina
      );
      console.log(mostrarPokemon);
      this.paginaPokemons = mostrarPokemon.results;
      this.paginaPokemons.map(
        (pokemon) =>
          new Pokemon(".pokemonBox", "pokemonBox__pokemon", "li", pokemon.url)
      );
    })();
  }
  createHTML() {
    const textHTML = `
        <nav class="componente__navegacion"></nav>
        <ul class="pokemonBox"></ul>
      `;
    this.element.innerHTML = textHTML;
  }

  paginaSiguiente() {
    console.log("Siguiente!");
  }

  paginaAnterior() {
    console.log("Anterior!");
  }
}

export default Page;
