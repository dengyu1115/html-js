import Id from "../util/Id.js";

/**
 * 表单渲染器
 */
export default class FormRender {
  /**
   * 构造函数
   * @param {*} obj 属性对象
   */
  constructor(designer, obj) {
    this.designer = designer;
    this.obj = obj;
  }

  /**
   * 渲染
   * @param {*} rows 行数据
   * @returns 内容
   */
  render(rows) {
    return rows.map((cols) => {
      const list = cols.map((col) => {
        let input;
        if (col.type === "select") {
          const options = col.options.map((op) => {
            return this.buildOption(this.obj, col.prop, op.label, op.prop);
          });
          input = this.buildSelect(col.prop, options);
        } else if (col.type === "textarea") {
          input = this.buildTextarea(
            this.obj,
            col.prop,
            col.inputType,
            col.defVal,
            col.rows
          );
        } else {
          input = this.buildInput(
            this.obj,
            col.prop,
            col.inputType,
            col.defVal
          );
        }
        input.addEventListener("input", () => {
          // 更新组件属性
          this.obj[col.prop] = this.getPropVal(col.prop, input.value);
          // 根据当前视图更新显示
          this.designer.renderPreview();
        });
        return this.buildCol(col.label, input);
      });
      return this.buildRow(list);
    });
  }

  /**
   * 构建表单行
   * @param {*} list
   * @returns
   */
  buildRow(list) {
    const div = document.createElement("div");
    div.classList.add("form-row");
    list.forEach((el) => {
      div.appendChild(el);
    });
    return div;
  }

  /**
   * 构建表单列
   * @param {*} prop
   * @param {*} label
   * @param {*} input
   * @returns
   */
  buildCol(label, input) {
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

  /**
   * 构建文本域
   * @param {*} obj
   * @param {*} prop
   * @param {*} type
   * @param {*} defVal
   * @param {*} rows
   * @returns
   */
  buildTextarea(obj, prop, type, defVal, rows) {
    const input = document.createElement("textarea");
    if (type === "json") {
      input.value = obj[prop] ? JSON.stringify(obj[prop]) : defVal;
    } else {
      input.value = obj[prop] || defVal;
    }
    input.rows = rows || 9;
    return input;
  }

  /**
   * 构建输入框
   * @param {*} obj
   * @param {*} prop
   * @param {*} type
   * @param {*} defVal
   * @returns
   */
  buildInput(obj, prop, type, defVal) {
    const input = document.createElement("input");
    if (type === "json") {
      input.type = "text";
      input.value = obj[prop] ? JSON.stringify(obj[prop]) : defVal;
    } else {
      input.type = type;
      input.value = obj[prop] || defVal;
    }
    return input;
  }

  /**
   * 构建下拉选择框
   * @param {*} prop
   * @param {*} options
   * @returns
   */
  buildSelect(prop, options) {
    const input = document.createElement("select");
    options.forEach((el) => {
      input.add(el);
    });
    return input;
  }

  /**
   * 构建下拉选项
   * @param {*} obj
   * @param {*} prop
   * @param {*} label
   * @param {*} value
   * @returns
   */
  buildOption(obj, prop, label, value) {
    const option = document.createElement("option");
    option.innerText = label;
    option.value = value;
    option.selected = value === obj[prop];
    return option;
  }

  getPropVal(prop, value) {
    // 处理数值属性（宽度、高度、内外边距、边框宽度、圆角大小）,如果值是纯数字，自动添加px单位
    if (
      value &&
      !isNaN(value) &&
      value.trim() !== "" &&
      [
        "width",
        "height",
        "margin",
        "padding",
        "borderWidth",
        "borderRadius",
        "fontSize",
      ].includes(prop)
    ) {
      return value + "px";
    }
    return value;
  }
}
