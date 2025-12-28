import ConfigFactory from "./ConfigFactory.js";

/**
 * 事件渲染器
 */
export default class EventRender {
  constructor(component, designer) {
    this.designer = designer;
    this.defList = ConfigFactory.getDef(component.type).configEvents;
    this.events = component.events;
    this.nameMap = {
      click: "点击",
      input: "输入",
      change: "变更",
      focus: "聚焦",
      blur: "失焦",
      load: "加载",
    };
  }

  /**
   * 渲染
   * @returns 渲染内容
   */
  render() {
    if (!this.defList) {
      return [];
    }
    // 把组件的事件定义内容转换为事件配置操作界面内容
    return this.defList.map((i) => this.build(this.events, i, this.nameMap[i]));
  }

  /**
   * 构建
   * @param {*} obj 对象
   * @param {*} prop 属性
   * @param {*} label 标签
   * @returns
   */
  build(obj, prop, label) {
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
    const inputEl = document.createElement("textarea");
    inputEl.id = prop + "Prop";
    inputEl.rows = 5;
    inputEl.innerText = obj[prop] || "";
    inputEl.placeholder =
      "输入JavaScript代码，例如: alert('" + label + "事件')";
    const btnEl = document.createElement("button");
    btnEl.textContent = "生效";
    btnEl.addEventListener("click", () => {
      // 更新组件属性
      obj[prop] = inputEl.value;
      // 重新渲染预览
      this.designer.renderPreview();
      // 给用户一个反馈
      btnEl.textContent = "已生效";
      setTimeout(() => {
        btnEl.textContent = "生效";
      }, 1000);
    });
    groupEl.appendChild(labelEl);
    groupEl.appendChild(inputEl);
    groupEl.appendChild(btnEl);
    rowEl.appendChild(colEl);
    return rowEl;
  }
}
