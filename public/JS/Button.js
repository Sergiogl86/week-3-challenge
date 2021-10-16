import Component from "./Component.js";
class Button extends Component {
  functionButton;
  text;
  constructor(parentElement, className, tag, text, functionButton) {
    super(parentElement, className, "button");

    this.functionButton = functionButton;
    this.text = text;
    this.element.innerHTML = this.text;

    this.element.addEventListener("click", this.functionButton);
  }
}

export default Button;
