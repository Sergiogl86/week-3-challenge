import Component from "./Component.js";
import Pokemon from "./Pokemon.js";
import Service from "./Service.js";
import Button from "./Button.js";

class Page extends Component {
  paginaPokemons;
  urlPokemonsPagina;
  numeroPagina = 0;
  constructor(
    parentElement,
    className,
    tag,
    url = "https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0"
  ) {
    super(parentElement, className, tag);
    this.urlPokemonsPagina = url;
    this.createHTML();
    new Button(
      ".componente__navegacion",
      "componente__boton-pagina-anterior",
      "button",
      "|Pagina Anterior|",
      () => this.paginaAnterior()
    );
    new Button(
      ".componente__navegacion",
      "componente__boton-pagina-posterior",
      "button",
      "|Pagina Siguiente|",
      () => this.paginaSiguiente()
    );

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
      <h2>Pokemons - Pokemon API</h2>
        <nav class="componente__navegacion">
        <div class="componente__indice"> 14 / 1118</div>
        </nav>
        <div class="atributosBox"> 
        <h2 class="atributosBox_titulo"> Atributos</h2>
        <ul class="atributosBox_atributos"></ul>
        </div>
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
      this.paginaPokemons = mostrarPokemon.results;
      this.paginaPokemons.map(
        (pokemon) =>
          new Pokemon(".pokemonBox", "pokemonBox__pokemon", "li", pokemon.url)
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
    this.urlPokemonsPagina = `https://pokeapi.co/api/v2/pokemon/?limit=14&offset=${
      this.numeroPagina * 14
    }`;
    let indice = this.element.querySelector(".componente__indice");
    indice.innerHTML = `${14 + this.numeroPagina * 14} / 1118`;
  }
}

export default Page;
