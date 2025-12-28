import ConfigFactory from "./ConfigFactory.js";

/**
 * 数据配置渲染器
 */
export default class DataRender {
  constructor(component, designer) {
    this.component = component;
    this.designer = designer;
    this.def = ConfigFactory.getDef(component.type).configData;
  }

  /**
   * 渲染
   * @returns 渲染内容
   */
  render() {
    if (!this.def || this.def.length === 0) {
      return [];
    }
    if (!this.component.data) {
      this.component.data = {};
    }
    const data = this.component.data;
    return this.def.map((i) => {
      if (!data[i.prop]) {
        data[i.prop] = {};
      }
      return this.build(data[i.prop], i);
    });
  }

  /**
   * 构建
   * @param {*} obj 对象
   * @param {*} item 属性
   * @returns
   */
  build(obj, item) {
    const container = document.createElement("div");
    if (item.label) {
      const rowEl = document.createElement("div");
      rowEl.classList.add("form-row");
      rowEl.textContent = item.label;
      container.appendChild(rowEl);
    }
    const pathProp = item.prop + "Path";
    const pathEl = this.buildInput(pathProp, obj.path);
    const pathLabel = item.pathLabel || "数据路径";
    const pathRow = this.buildRow(pathLabel, pathProp, pathEl);
    if (!item.noPath) {
      container.appendChild(pathRow);
    }
    const dataProp = item.prop + "Data";
    const dataEl = this.buildTextarea(dataProp, obj.data);
    const dataLabel = item.dataLabel || "数据内容";
    const dataRow = this.buildRow(dataLabel, dataProp, dataEl);
    if (!item.noData) {
      container.appendChild(dataRow);
    }
    const btnEl = document.createElement("button");
    btnEl.textContent = "生效";
    btnEl.addEventListener("click", () => {
      obj.path = pathEl.value || null;
      // 更新组件属性
      obj.data = dataEl.value ? JSON.parse(dataEl.value) : null;
      obj.callback = item.callback;
      // 重新渲染预览
      this.designer.renderPreview();
      // 给用户一个反馈
      btnEl.textContent = "已生效";
      setTimeout(() => {
        btnEl.textContent = "生效";
      }, 1000);
    });
    container.appendChild(btnEl);
    return container;
  }

  buildRow(label, prop, input) {
    const rowEl = document.createElement("div");
    rowEl.classList.add("form-row");
    const colEl = document.createElement("div");
    colEl.classList.add("form-col");
    const groupEl = document.createElement("div");
    groupEl.classList.add("form-group");
    colEl.appendChild(groupEl);
    const labelEl = document.createElement("label");
    labelEl.htmlFor = prop + "Prop";
    labelEl.innerText = label;
    groupEl.appendChild(labelEl);
    groupEl.appendChild(input);
    rowEl.appendChild(colEl);
    return rowEl;
  }

  buildTextarea(prop, data) {
    const inputEl = document.createElement("textarea");
    inputEl.id = prop + "Prop";
    inputEl.rows = 15;
    inputEl.value = data ? JSON.stringify(data) : "";
    inputEl.placeholder = "输入json格式数据";
    return inputEl;
  }

  buildInput(prop, path) {
    const inputEl = document.createElement("input");
    inputEl.id = prop + "Prop";
    inputEl.type = "text";
    inputEl.value = path || "";
    inputEl.placeholder = "输入aaa.bbb.ccc格式数据路径";
    return inputEl;
  }
}
