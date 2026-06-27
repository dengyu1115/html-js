import Reactive from "../../util/Reactive.js";
import Showable from "./Showable.js";
import Base from "./Base.js";

export default class Text extends Showable(Base) {
  render() {
    const element = this.createElement(this.props.tag);
    this.element = element;
    this.refreshShow();
    this.refreshText();
    return element;
  }

  refreshText() {
    const path = this.data.text?.path;
    if (path) {
      const text = Reactive.get(data, path);
      this.element.textContent = text;
    } else {
      this.element.textContent = this.props.text;
    }
  }
}