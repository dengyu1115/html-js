import ConfigFactory from "./ConfigFactory.js";
import { createElement, createFormRow, createSubmitBtn } from "./utils/dom.js";

export default class DataPanel {
  constructor(component, onChange) {
    this.component = component;
    this.onChange = onChange;
    this.def = ConfigFactory.getDef(component.type).configData;
  }

  render() {
    if (!this.def || this.def.length === 0) {
      return [];
    }
    if (!this.component.data) {
      this.component.data = {};
    }
    return this.def.map((item) => this._buildItem(item));
  }

  _buildItem(item) {
    const data = this.component.data;
    if (!data[item.prop]) {
      data[item.prop] = {};
    }
    const obj = data[item.prop];

    const container = createElement("div");

    if (item.label) {
      container.appendChild(createElement("div", {
        className: "form-row",
        textContent: item.label,
      }));
    }

    const pathProp = item.prop + "Path";
    const pathEl = createElement("input", {
      id: pathProp + "Prop",
      type: "text",
      value: obj.path || "",
      placeholder: "输入aaa.bbb.ccc格式数据路径",
    });

    if (!item.noPath) {
      container.appendChild(createFormRow(item.pathLabel || "数据路径", pathEl));
    }

    const dataProp = item.prop + "Data";
    const dataEl = createElement("textarea", {
      id: dataProp + "Prop",
      rows: "15",
      value: obj.data ? JSON.stringify(obj.data, null, 2) : "",
      placeholder: "输入json格式数据",
    });

    if (!item.noData) {
      container.appendChild(createFormRow(item.dataLabel || "数据内容", dataEl));
    }

    container.appendChild(createSubmitBtn(() => {
      obj.path = pathEl.value || null;
      obj.callback = item.callback;
      try {
        obj.data = dataEl.value ? JSON.parse(dataEl.value) : null;
      } catch (e) {
        alert("数据内容格式错误，请输入有效的JSON格式");
        return;
      }
      this.onChange();
    }));
    return container;
  }
}