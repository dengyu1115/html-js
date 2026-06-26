import ConfigFactory from "./ConfigFactory.js";
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
      rows.push(this._buildTitle(def.title));
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

  _buildTitle(title) {
    const div = document.createElement("div");
    div.classList.add("form-row");
    div.innerText = title;
    return div;
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

  _buildRemoveBtn(def, data, index, parentStack) {
    const btn = document.createElement("button");
    btn.textContent = "删除";
    btn.addEventListener("click", () => {
      data.splice(index, 1);
      this._refreshList(def, data, parentStack);
      this.onChange();
    });
    return btn;
  }

  _buildCopyBtn(def, data, index, parentStack) {
    const btn = document.createElement("button");
    btn.textContent = "复制";
    btn.addEventListener("click", () => {
      const copied = JSON.parse(JSON.stringify(data[index]));
      data.splice(index + 1, 0, copied);
      this._refreshList(def, data, parentStack);
      this.onChange();
    });
    return btn;
  }

  _buildAddBtn(def, data, defVal, parentStack) {
    const btn = document.createElement("button");
    btn.textContent = "添加";
    btn.addEventListener("click", () => {
      data.push({ ...defVal });
      this._refreshList(def, data, parentStack);
      this.onChange();
    });
    return btn;
  }

  _buildChildBtn(def, datum, parentStack) {
    const btn = document.createElement("button");
    btn.textContent = "下级";
    btn.addEventListener("click", () => {
      if (!datum[def.child]) {
        datum[def.child] = [];
      }
      this._refreshList(def, datum[def.child], parentStack);
    });
    return btn;
  }

  _buildParentBtn(def, parentStack) {
    const btn = document.createElement("button");
    btn.textContent = "上级";
    btn.addEventListener("click", () => {
      const popped = parentStack.pop();
      this._refreshList(def, popped, parentStack);
    });
    return btn;
  }
}