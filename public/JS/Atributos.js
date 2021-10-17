import Component from "./Component.js";
import Service from "./Service.js";

class Atributos extends Component {
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
    })();
  }
  createHTML() {
    const textHTML = `
        <h2 class="atributosBox__namePokemon">${this.name} #${this.id}</h2>
        <img
          class="atributosBox__imagPokemon"
          src="${this.imgUrl}"
          alt=""
        />
        
        <div><button class="borrar atributosBox__button-cerrar">|Cerrar|</button>
      `;
    this.element.innerHTML = textHTML;
    let button = this.element.querySelector(".atributosBox__button-cerrar");
    button.addEventListener("click", () => this.cerrarAtributos());
  }

  cerrarAtributos() {
    let borrarPokemons = document.querySelector(".atributosBox_atributos");
    while (borrarPokemons.firstChild) {
      borrarPokemons.removeChild(borrarPokemons.firstChild);
    }
  }
}

export default Atributos;
