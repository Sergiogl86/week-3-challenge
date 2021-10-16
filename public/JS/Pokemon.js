import Component from "./Component.js";
import Service from "./Service.js";

class Pokemon extends Component {
  name;
  imgUrl;
  url;
  pokemon;
  constructor(parentElement, className, tag, url) {
    super(parentElement, className, tag);
    this.url = url;

    (async () => {
      let servicePokemon = new Service(this.url);
      let mostrarPokemon = await servicePokemon.getService(this.url);
      console.log(mostrarPokemon);
      this.pokemon = mostrarPokemon;
      this.name = mostrarPokemon.name;
      this.imgUrl = mostrarPokemon.sprites.other.dream_world.front_default;
      this.createHTML();
    })();
  }
  createHTML() {
    const textHTML = `
        <h2 class="pokemonBox__namePokemon">${this.name}</h2>
        <img
          class="pokemonBox__imagPokemon"
          src="${this.imgUrl}"
          alt=""
        />
        
        <div><button class="pokemonBox__button-fav">|Añadir a Favoritos|</button>
        <div><button class="pokemonBox__button">Info Pokemon</button></div>
      `;
    this.element.innerHTML = textHTML;
    let button = this.element.querySelector(".pokemonBox__button-fav");
    button.addEventListener("click", () => this.enviarInformacion());
  }

  enviarInformacion() {
    debugger;
    console.log(this.name);
    console.log(this.url);
    let datos = { name: this.name, url: this.url };
    let enviarPokemon = new Service(this.url);
    enviarPokemon.createElement(datos, "http://localhost:3001/posts");
  }
}

export default Pokemon;
