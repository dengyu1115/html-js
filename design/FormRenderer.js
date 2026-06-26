import Id from "../util/Id.js";

const SIZE_PROPS = [
  "width", "height", "margin", "padding",
  "borderWidth", "borderRadius", "fontSize",
];

export default class FormRenderer {
  constructor(obj, onChange) {
    this.obj = obj;
    this.onChange = onChange;
  }

  render(rows) {
    return rows.map((cols) => {
      const list = cols.map((col) => this._renderColumn(col));
      return this._buildRow(list);
    });
  }

  _renderColumn(col) {
    const input = this._createInput(col);
    input.addEventListener("input", () => {
      this.obj[col.prop] = this._parseValue(col.prop, input.value);
      if (this.onChange) {
        this.onChange();
      }
    });
    return this._buildColumn(col.label, input);
  }

  _createInput(col) {
    switch (col.type) {
      case "select":
        return this._buildSelect(col);
      case "textarea":
        return this._buildTextarea(col);
      default:
        return this._buildInput(col);
    }
  }

  _buildRow(list) {
    const div = document.createElement("div");
    div.classList.add("form-row");
    list.forEach((el) => div.appendChild(el));
    return div;
  }

  _buildColumn(label, input) {
    const colEl = document.createElement("div");
    colEl.classList.add("form-col");
    const groupEl = document.createElement("div");
    groupEl.classList.add("form-group");
    colEl.appendChild(groupEl);

    const labelEl = document.createElement("label");
    const id = Id.random();
    labelEl.htmlFor = id;
    input.id = id;
    labelEl.innerText = label;
    groupEl.appendChild(labelEl);
    groupEl.appendChild(input);
    return colEl;
  }

  _buildTextarea(col) {
    const input = document.createElement("textarea");
    if (col.inputType === "json") {
      input.value = this.obj[col.prop] ? JSON.stringify(this.obj[col.prop]) : col.defVal;
    } else {
      input.value = this.obj[col.prop] != null ? this.obj[col.prop] : (col.defVal || "");
    }
    input.rows = col.rows || 9;
    return input;
  }

  _buildInput(col) {
    const input = document.createElement("input");
    if (col.inputType === "json") {
      input.type = "text";
      input.value = this.obj[col.prop] ? JSON.stringify(this.obj[col.prop]) : col.defVal;
    } else {
      input.type = col.inputType || "text";
      input.value = this.obj[col.prop] != null ? this.obj[col.prop] : (col.defVal || "");
    }
    return input;
  }

  _buildSelect(col) {
    const select = document.createElement("select");
    col.options.forEach((op) => {
      const option = document.createElement("option");
      option.innerText = op.label;
      option.value = op.prop;
      option.selected = op.prop === this.obj[col.prop];
      select.add(option);
    });
    return select;
  }

  _parseValue(prop, value) {
    if (value && value.trim() !== "" && !isNaN(Number(value)) && SIZE_PROPS.includes(prop)) {
      return value + "px";
    }
    return value;
  }
}