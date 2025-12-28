import ConfigFactory from "./ConfigFactory.js";
import FormRender from "./FormRender.js";

/**
 * 属性展示
 */
export default class PropRender {
  constructor(component, designer) {
    this.component = component;
    this.defList = ConfigFactory.getDef(component.type).configProps;
    this.props = component.props;
    this.designer = designer;
  }

  /**
   * 展示
   * @returns 展示内容
   */
  render() {
    if (!this.defList) {
      return [];
    }
    return this.defList.flatMap((i) => this.renderProp(i, this.props));
  }
  /**
   * 展示属性
   * @param {*} def 属性定义对象
   * @param {*} props 属性数据
   * @returns 展示元素集合
   */
  renderProp(def, props) {
    const rows = [];
    if (def.title) {
      rows.push(this.buildRow(def.title));
    }
    if (def.type === "list") {
      if (!props[def.prop]) {
        props[def.prop] = [];
      }
      const data = props[def.prop];
      this.refreshData(def, data);
      rows.push(this[def.prop + "_list_div"]);
    } else {
      rows.push(...new FormRender(this.designer, props).render(def.config));
    }
    return rows;
  }

  /**
   * 构建表单行
   * @param {*} title
   * @returns
   */
  buildRow(title) {
    const div = document.createElement("div");
    div.classList.add("form-row");
    div.innerText = title;
    return div;
  }

  /**
   * 刷新数据
   * @param {*} def 属性定义对象
   * @param {*} data 属性数据
   * @param {*} parent 父级栈
   */
  refreshData(def, data, parent = []) {
    if (!this[def.prop + "_list_div"]) {
      this[def.prop + "_list_div"] = document.createElement("div");
    }
    this[def.prop + "_list_div"].innerHTML = "";
    const elements = data.flatMap((datum, index) => {
      // 渲染本条数据的属性
      const rows = new FormRender(this.designer, datum).render(def.config);
      // 添加删除按钮
      rows.push(this.buildRemoveBtn(def, data, index, parent));
      // 添加复制按钮
      rows.push(this.buildCopyBtn(def, data, index, parent));
      // 如果支持配置下级
      if (def.child) {
        // 添加配置下级按钮
        const pList = [...parent];
        pList.push(data);
        rows.push(this.buildConfigChildBtn(def, datum, pList));
      }

      return rows;
    });
    if (parent.length > 0) {
      // 添加返回上级按钮
      elements.push(this.buildReturnParentBtn(def, parent));
    }
    // 添加添加按钮
    elements.push(this.buildAddBtn(def, data, def.defVal, parent));
    elements.forEach((element) => {
      this[def.prop + "_list_div"].appendChild(element);
    });
  }

  /**
   * 构建删除按钮
   * @param {*} def 属性定义对象
   * @param {*} data 属性数据
   * @param {*} index 索引
   * @param {*} parent 父级栈
   * @returns 删除按钮
   */
  buildRemoveBtn(def, data, index, parent) {
    const button = document.createElement("button");
    button.textContent = "删除";
    button.addEventListener("click", (e) => {
      data.splice(index, 1);
      this.refreshData(def, data, parent);
      this.designer.renderPreview();
    });
    return button;
  }

  /**
   * 构建复制按钮
   * @param {*} def 属性定义对象
   * @param {*} data 属性数据
   * @param {*} index 索引
   * @param {*} parent 父级栈
   * @returns 复制按钮
   */
  buildCopyBtn(def, data, index, parent) {
    const button = document.createElement("button");
    button.textContent = "复制";
    button.addEventListener("click", (e) => {
      // 使用深拷贝复制指定索引的数据项并添加到被复制项之后
      const copiedData = JSON.parse(JSON.stringify(data[index]));
      data.splice(index + 1, 0, copiedData);
      this.refreshData(def, data, parent);
      this.designer.renderPreview();
    });
    return button;
  }

  /**
   * 构建添加按钮
   * @param {*} def 属性定义对象
   * @param {*} data 属性数据
   * @param {*} value 默认值
   * @param {*} parent 父级栈
   * @returns 添加按钮
   */
  buildAddBtn(def, data, value, parent) {
    const button = document.createElement("button");
    button.textContent = "添加";
    button.addEventListener("click", (e) => {
      // 复制为新对象，避免重复添加同一个对象问题
      data.push({ ...value });
      this.refreshData(def, data, parent);
      this.designer.renderPreview();
    });
    return button;
  }

  /**
   * 构建配置下级按钮
   * @param {*} def 配置定义对象
   * @param {*} datum 下级数据
   * @param {*} parent 父级栈
   * @returns 配置下级按钮
   */
  buildConfigChildBtn(def, datum, parent) {
    const button = document.createElement("button");
    button.textContent = "下级";
    button.addEventListener("click", (e) => {
      if (!datum[def.child]) {
        datum[def.child] = [];
      }
      this.refreshData(def, datum[def.child], parent);
    });
    return button;
  }

  /**
   * 构建返回上级按钮
   * @param {*} def 配置定义对象
   * @param {*} parent 上级栈
   * @returns 返回上级按钮
   */
  buildReturnParentBtn(def, parent) {
    const button = document.createElement("button");
    button.textContent = "上级";
    button.addEventListener("click", (e) => {
      // 弹出上级返回展示
      this.refreshData(def, parent.pop(), parent);
    });
    return button;
  }
}
