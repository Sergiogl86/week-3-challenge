import Component from "./Component.js";
import Pokemon from "./Pokemon.js";
import Service from "./Service.js";
import Button from "./Button.js";

class FavoritosPage extends Component {
  paginaPokemons;
  urlPokemonsPagina;
  numeroPagina = 0;
  pagina = "personalAPI";
  constructor(
    parentElement,
    className,
    tag,
    url = "https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0"
  ) {
    super(parentElement, className, tag);
    this.urlPokemonsPagina = url;
    this.createHTML();

    this.imprimirPokemons();
  }
  createHTML() {
    const textHTML = `
    <header>
      <h1>Pokemon - Week 3 - Challenge WeekEnd</h1>
      <nav>
        <a href="./index.html"> Listado Pokemon/API</a>
        <a href="./favoritos.html"> Listado Pokemons favoritos</a>
      </nav>
    </header>
      <h2>Pokemons - Pokemons Favoritos</h2>
        <nav class="componente__navegacion">
        </nav>
        <ul class="pokemonBox"></ul>
        <footer class="componente__footer">
            <div class="componente__Logo">               
            </div>
            <div class="componente__Name">
              <p id='componente__Sergio'> Sergio García López  2021-09-precourse</p>                
            </div>    
        </footer>
      `;
    this.element.innerHTML = textHTML;
  }

  imprimirPokemons() {
    (async () => {
      let servicePokemon = new Service(this.urlPokemonsPagina);
      let mostrarPokemon = await servicePokemon.getService(
        this.urlPokemonsPagina
      );
      console.log(mostrarPokemon);
      this.paginaPokemons = mostrarPokemon;
      this.paginaPokemons.map(
        (pokemon) =>
          new Pokemon(
            ".pokemonBox",
            "pokemonBox__pokemon",
            "li",
            pokemon.url,
            pokemon.id,
            true
          )
      );
    })();
  }

  borrarPokemons() {
    let borrarPokemons = document.querySelector(".pokemonBox");
    while (borrarPokemons.firstChild) {
      borrarPokemons.removeChild(borrarPokemons.firstChild);
    }
  }

  paginaSiguiente() {
    console.log("Siguiente!");
    this.borrarPokemons();
    this.actualizar(1);
    this.imprimirPokemons();
  }

  paginaAnterior() {
    console.log("Anterior!");
    this.borrarPokemons();
    this.actualizar(-1);
    this.imprimirPokemons();
  }

  actualizar(a) {
    this.numeroPagina = this.numeroPagina + a;
    if (this.numeroPagina >= 1) {
      let mostrarBoton = this.element.querySelector(
        ".componente__boton-pagina-anterior"
      );
      mostrarBoton.style.display = "inline-block";
    } else {
      let mostrarBoton = this.element.querySelector(
        ".componente__boton-pagina-anterior"
      );
      mostrarBoton.style.display = "none";
    }
    this.urlPokemonsPagina = `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${
      this.numeroPagina * 10
    }`;
  }
}

export default FavoritosPage;
