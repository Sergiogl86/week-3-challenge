import Page from "./Page.js";
import Service from "./Service.js";

const pruebaPokemon = new Page(
  "body",
  "componente",
  "section",
  "https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0"
);

/*let prueba = {
  name: "minun",
  url: "https://pokeapi.co/api/v2/pokemon/312/",
};

let urlPrueba = "http://localhost:3001/posts";

let pruebaCreate = new Service(urlPrueba);
//pruebaCreate.getService(urlPrueba);
pruebaCreate.createElement(prueba, urlPrueba);

//createElement(prueba, urlPrueba);*/
