import Component from "./Component.js";
import Service from "./Service.js";

class Pokemon extends Component {
  name;
  imgUrl;
  url;
  id;
  posicionId;
  pokemon;
  favorito;
  constructor(
    parentElement,
    className,
    tag,
    url,
    posicionId = 0,
    favorito = false
  ) {
    super(parentElement, className, tag);
    this.url = url;
    this.posicionId = posicionId;
    this.favorito = favorito;

    (async () => {
      let servicePokemon = new Service(this.url);
      let mostrarPokemon = await servicePokemon.getService(this.url);
      console.log(mostrarPokemon);
      this.pokemon = mostrarPokemon;
      this.name = mostrarPokemon.name;
      this.imgUrl = mostrarPokemon.sprites.other.dream_world.front_default;
      this.id = mostrarPokemon.id;
      this.createHTML();
      (() => {
        if (this.favorito === true) {
          let ocultarBoton = this.element.querySelector(
            ".pokemonBox__button-fav"
          );
          ocultarBoton.style.display = "none";
        } else {
          let ocultarBoton = this.element.querySelector(
            ".pokemonBox__button-borrar"
          );
          ocultarBoton.style.display = "none";
        }
      })();
    })();
  }
  createHTML() {
    const textHTML = `
        <h2 class="pokemonBox__namePokemon">${this.name} #${this.id}</h2>
        <img
          class="pokemonBox__imagPokemon"
          src="${this.imgUrl}"
          alt=""
        />
        
        <div><button class="borrar pokemonBox__button-fav">|Añadir a Favoritos|</button>
        <div><button class="borrar pokemonBox__button-info">Info Pokemon</button></div>
        <div><button class="borrar pokemonBox__button-borrar">|Borrar|</button></div>
      `;
    this.element.innerHTML = textHTML;
    let button = this.element.querySelector(".pokemonBox__button-fav");
    button.addEventListener("click", () => this.enviarInformacion());
    button = this.element.querySelector(".pokemonBox__button-info");
    button.addEventListener("click", () => this.mostrarInformacion());
    button = this.element.querySelector(".pokemonBox__button-borrar");
    button.addEventListener("click", () => this.borrarPokemon());
  }

  enviarInformacion() {
    (async () => {
      let servicePokemon = new Service(
        "https://week-3-challenge-api.herokuapp.com/pokemon/"
      );
      let consultarDuplicidad = await servicePokemon.getService(
        "https://week-3-challenge-api.herokuapp.com/pokemon/"
      );
      console.log(consultarDuplicidad);
      let duplicado = consultarDuplicidad.find(
        (pokemon) => pokemon.name === this.name
      );
      console.log("consulta funcion duplicado");
      console.log(duplicado);

      if (duplicado === undefined) {
        let datos = { name: this.name, url: this.url };
        let enviarPokemon = new Service(this.url);
        enviarPokemon.createElement(
          datos,
          "https://week-3-challenge-api.herokuapp.com/pokemon/"
        );
      } else {
        console.log("Pokemon duplicado");
      }
    })();
  }

  mostrarInformacion() {
    console.log(this.name);
    console.log(this.url);
    console.log(this.posicionId);
  }

  borrarPokemon() {
    let enviarPokemon = new Service(this.url);
    enviarPokemon.borrarElement(
      `https://week-3-challenge-api.herokuapp.com/pokemon/${this.posicionId}/`
    );
    this.element.remove();
  }
}

export default Pokemon;
