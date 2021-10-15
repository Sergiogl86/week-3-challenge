class Component {
  element;
  constructor(parentElement, className, tag) {
    this.element = document.createElement(tag);
    const position = document.querySelector(parentElement);
    this.element.className = className;
    position.append(this.element);
  }
}

export default Component;
