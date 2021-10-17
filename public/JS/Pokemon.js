import Component from "./Component.js";
import Service from "./Service.js";

class Pokemon extends Component {
  name;
  imgUrl;
  url;
  id;
  posicionId;
  pokemon;
  constructor(parentElement, className, tag, url, posicionId = 0) {
    super(parentElement, className, tag);
    this.url = url;
    this.posicionId = posicionId;

    (async () => {
      let servicePokemon = new Service(this.url);
      let mostrarPokemon = await servicePokemon.getService(this.url);
      console.log(mostrarPokemon);
      this.pokemon = mostrarPokemon;
      this.name = mostrarPokemon.name;
      this.imgUrl = mostrarPokemon.sprites.other.dream_world.front_default;
      this.id = mostrarPokemon.id;
      this.createHTML();
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
        
        <div><button class="pokemonBox__button-fav">|Añadir a Favoritos|</button>
        <div><button class="pokemonBox__button-info">Info Pokemon</button></div>
      `;
    this.element.innerHTML = textHTML;
    let button = this.element.querySelector(".pokemonBox__button-fav");
    button.addEventListener("click", () => this.enviarInformacion());
    button = this.element.querySelector(".pokemonBox__button-info");
    button.addEventListener("click", () => this.mostrarInformacion());
  }

  enviarInformacion() {
    debugger;
    let datos = { name: this.name, url: this.url };
    let enviarPokemon = new Service(this.url);
    enviarPokemon.createElement(
      datos,
      "https://week-3-challenge-api.herokuapp.com/pokemon/"
    );
  }
  mostrarInformacion() {
    console.log(this.name);
    console.log(this.url);
    console.log(this.posicionId);
  }
}

export default Pokemon;
