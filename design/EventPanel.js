import ConfigFactory from "./ConfigFactory.js";
import { createElement, createFormRow, createSubmitBtn } from "./utils/dom.js";

const EVENT_NAME_MAP = {
  click: "点击",
  input: "输入",
  change: "变更",
  focus: "聚焦",
  blur: "失焦",
  load: "加载",
};

export default class EventPanel {
  constructor(component, onChange) {
    this.onChange = onChange;
    this.defList = ConfigFactory.getDef(component.type).configEvents;
    this.events = component.events;
  }

  render() {
    if (!this.defList) {
      return [];
    }
    return this.defList.map((eventName) => this._buildRow(eventName));
  }

  _buildRow(eventName) {
    const label = EVENT_NAME_MAP[eventName] || eventName;

    const inputEl = createElement("textarea", {
      id: eventName + "Prop",
      rows: "5",
      value: this.events[eventName] || "",
      placeholder: "输入JavaScript代码，例如: alert('${label}事件')",
    });

    const btnEl = createSubmitBtn(() => {
      this.events[eventName] = inputEl.value;
      this.onChange();
    });

    const rowEl = createFormRow(label, inputEl);
    rowEl.querySelector(".form-group").appendChild(btnEl);
    return rowEl;
  }
}