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
  order;
  type;
  xp;
  height;
  weight;
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
      this.pokemon = mostrarPokemon;
      this.name = mostrarPokemon.name;
      this.imgUrl = mostrarPokemon.sprites.other.dream_world.front_default;
      this.id = mostrarPokemon.id;
      this.order = mostrarPokemon.order;
      this.type = mostrarPokemon.types;
      this.xp = mostrarPokemon.base_experience;
      this.height = mostrarPokemon.height;
      this.weight = mostrarPokemon.weight;
      this.createHTML();
    })();
  }
  createHTML() {
    const textHTML = `
        <h2 class="atributosBox__namePokemon">${this.name}</h2>
        <img
          class="atributosBox__imagPokemon"
          src="${this.imgUrl}"
          alt=""
        />
        <div class="atributosBox__atributos">
        <p> Order: ${this.order} </p>
        <p class="atributosBox__type"> Type: ${this.type[0].type.name} </p>
        <p> XP: ${this.xp} </p>
        <p> Height: ${this.height} </p>
        <p> Weight: ${this.weight} </p>

        </div>
        
        <div><button class="atributosBox__button--boton atributosBox__button-cerrar">|Cerrar|</button></div>
      `;
    this.element.innerHTML = textHTML;
    if (this.type.length > 1) {
      this.element.querySelector(
        ".atributosBox__type"
      ).textContent += ` - ${this.type[1].type.name}`;
    }

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
