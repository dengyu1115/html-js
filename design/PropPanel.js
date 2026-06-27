import ConfigFactory from "./ConfigFactory.js";
import { createElement } from "./utils/dom.js";
import FormRenderer from "./FormRenderer.js";

export default class PropPanel {
  constructor(component, onChange) {
    this.component = component;
    this.onChange = onChange;
    this.defList = ConfigFactory.getDef(component.type).configProps;
    this.props = component.props;
    this._listContainers = {};
  }

  render() {
    if (!this.defList) {
      return [];
    }
    return this.defList.flatMap((def) => this._renderSection(def));
  }

  _renderSection(def) {
    const rows = [];
    if (def.title) {
      rows.push(createElement("div", { className: "form-row", textContent: def.title }));
    }
    if (def.type === "list") {
      if (!this.props[def.prop]) {
        this.props[def.prop] = [];
      }
      const data = this.props[def.prop];
      const container = this._getListContainer(def.prop);
      this._refreshList(def, data, []);
      rows.push(container);
    } else {
      rows.push(...new FormRenderer(this.props, () => this.onChange()).render(def.config));
    }
    return rows;
  }

  _getListContainer(prop) {
    if (!this._listContainers[prop]) {
      this._listContainers[prop] = document.createElement("div");
    }
    return this._listContainers[prop];
  }

  _refreshList(def, data, parentStack) {
    const container = this._getListContainer(def.prop);
    container.innerHTML = "";

    const elements = data.flatMap((datum, index) => {
      const rows = new FormRenderer(datum, () => this.onChange()).render(def.config);
      rows.push(this._buildRemoveBtn(def, data, index, parentStack));
      rows.push(this._buildCopyBtn(def, data, index, parentStack));
      if (def.child) {
        rows.push(this._buildChildBtn(def, datum, [...parentStack, data]));
      }
      return rows;
    });

    if (parentStack.length > 0) {
      elements.push(this._buildParentBtn(def, parentStack));
    }
    elements.push(this._buildAddBtn(def, data, def.defVal, parentStack));

    elements.forEach((el) => container.appendChild(el));
  }

  _buildBtn(text, onClick) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.addEventListener("click", onClick);
    return btn;
  }

  _buildRemoveBtn(def, data, index, parentStack) {
    return this._buildBtn("删除", () => {
      data.splice(index, 1);
      this._refreshList(def, data, parentStack);
      this.onChange();
    });
  }

  _buildCopyBtn(def, data, index, parentStack) {
    return this._buildBtn("复制", () => {
      const copied = JSON.parse(JSON.stringify(data[index]));
      data.splice(index + 1, 0, copied);
      this._refreshList(def, data, parentStack);
      this.onChange();
    });
  }

  _buildAddBtn(def, data, defVal, parentStack) {
    return this._buildBtn("添加", () => {
      data.push({ ...defVal });
      this._refreshList(def, data, parentStack);
      this.onChange();
    });
  }

  _buildChildBtn(def, datum, parentStack) {
    return this._buildBtn("下级", () => {
      if (!datum[def.child]) {
        datum[def.child] = [];
      }
      this._refreshList(def, datum[def.child], parentStack);
    });
  }

  _buildParentBtn(def, parentStack) {
    return this._buildBtn("上级", () => {
      const popped = parentStack.pop();
      this._refreshList(def, popped, parentStack);
    });
  }
}