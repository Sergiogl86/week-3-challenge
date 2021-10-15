class Service {
  pokemon;
  url;
  constructor(url) {
    this.url = url;
  }

  async getService(url) {
    //async function busquedaFetch() {
    console.log(url);
    debugger;
    try {
      const response = await fetch(url);
      console.log(response);
      if (response.ok) {
        debugger;
        const dataResponse = await response.json();
        return dataResponse;
      } else {
        throw new error("Error provocado :(");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default Service;
