class Service {
  pokemon;
  url;
  constructor(url) {
    this.url = url;
  }

  async getService(url) {
    //async function busquedaFetch() {
    console.log(url);
    try {
      const response = await fetch(url);
      console.log(response);
      if (response.ok) {
        const dataResponse = await response.json();
        return dataResponse;
      } else {
        throw new error("Error provocado :(");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async createElement(element, url) {
    const data = {
      method: "POST", // or 'PUT'
      body: JSON.stringify(element), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, data);
    const newElement = await response.json();
  }
}

export default Service;
