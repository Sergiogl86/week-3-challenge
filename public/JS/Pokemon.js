import Component from "./Component.js";
import Service from "./Service.js";

class Pokemon extends Component {
  name;
  imgUrl;
  url;
  pokemon = [];
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
        pokemonBox
        <h2 class="pokemonBox__namePokemon">${this.name}</h2>
        <img
          class="pokemonBox__imagPokemon"
          src="${this.imgUrl}"
          alt=""
        />
      `;
    this.element.innerHTML = textHTML;
  }
}

export default Pokemon;