import DslParser from "../render/DslParser.js";
import CompTreePanel from "./CompTreePanel.js";
import ConfigFactory from "./ConfigFactory.js";
import DataRender from "./DataRender.js";
import DslPanel from "./DslPanel.js";
import EventRender from "./EventRender.js";
import PropRender from "./PropRender.js";
import StyleRender from "./StyleRender.js";
import TemplatePanel from "./TemplatePanel.js";

/**
 * 设计器
 */
export default class Designer {
  constructor() {
    // 组件数量计数
    this.compCount = 0;
    // 选中的组件
    this.sldComp = null;
    // 组件map，用于通过ID快速查找组件
    this.compMap = {};
    // 模板列表
    this.templates = [];
    // 根节点
    this.root = null;
    // DOM 元素引用，避免重复查询
    this.elements = {};
    // 面板元素集合引用
    this.leftPanels = [];
    this.rightPanels = [];
    // 剪贴板
    this.clipboard = null;
  }

  /**
   * 初始化
   */
  init() {
    // 创建页面结构
    this.createPage();
    // 创建组件
    this.createComp("page");
  }

  /**
   * 创建设计器页面
   */
  createPage() {
    // 创建主容器
    this.elements.mainDiv = this.createElement("div", { className: "main" });
    // 创建面板
    this.createLeftPanel();
    this.createCenterPanel();
    this.createRightPanel();
    // 添加到body
    document.body.appendChild(this.elements.mainDiv);
  }

  /**
   * 创建左侧面板
   */
  createLeftPanel() {
    this.elements.leftPanel = this.createElement("div", { id: "left-panel" });
    // 创建切换按钮容器
    this.elements.leftToggleBtns = this.createElement("div", {
      className: "toggle-btns",
    });
    this.elements.leftPanel.appendChild(this.elements.leftToggleBtns);

    // 创建组件树面板
    this.compTreePanel = new CompTreePanel(this);
    // 创建组件树展示面板切换按钮
    this.elements.compBtn = this.createElement("button", {
      className: "btn toggle-btn active",
      id: "compBtn",
      textContent: "组件树",
    });
    this.elements.compBtn.addEventListener("click", () => {
      this.switchPanel("left", "comp");
    });
    this.elements.leftToggleBtns.appendChild(this.elements.compBtn);
    this.elements.compPanel = this.compTreePanel.createPanel();
    this.elements.leftPanel.appendChild(this.elements.compPanel);

    // 创建DSL面板
    this.dslPanel = new DslPanel(this);
    // 创建DSL面板展示切换按钮
    this.elements.dslBtn = this.createElement("button", {
      className: "btn toggle-btn",
      id: "dslBtn",
      textContent: "DSL",
    });
    this.elements.dslBtn.addEventListener("click", () => {
      this.switchPanel("left", "dsl");
    });
    this.elements.leftToggleBtns.appendChild(this.elements.dslBtn);
    this.elements.dslPanel = this.dslPanel.createPanel();
    this.elements.leftPanel.appendChild(this.elements.dslPanel);
    // 创建模板面板
    this.templatePanel = new TemplatePanel(this);
    // 创建模板面板展示切换按钮
    this.elements.templateBtn = this.createElement("button", {
      className: "btn toggle-btn",
      id: "templateBtn",
      textContent: "模板",
    });
    this.elements.templateBtn.addEventListener("click", () => {
      this.switchPanel("left", "template");
    });
    this.elements.leftToggleBtns.appendChild(this.elements.templateBtn);
    this.elements.templatePanel = this.templatePanel.createPanel();
    this.elements.leftPanel.appendChild(this.elements.templatePanel);
    this.leftPanels.push(this.elements.compPanel);
    this.leftPanels.push(this.elements.dslPanel);
    this.leftPanels.push(this.elements.templatePanel);
    this.elements.mainDiv.appendChild(this.elements.leftPanel);
    // 初始化模板列表
    this.templatePanel.query();
  }

  /**
   * 创建中间面板
   */
  createCenterPanel() {
    this.elements.centerPanel = this.createElement("div", {
      id: "center-panel",
    });
    // 保存预览面板引用
    this.elements.previewPanel = this.createElement("div", {
      id: "previewPanel",
    });
    this.elements.previewPanel.appendChild(
      this.createElement("p", { textContent: "组件预览" })
    );
    this.elements.centerPanel.appendChild(this.elements.previewPanel);
    this.elements.mainDiv.appendChild(this.elements.centerPanel);
  }

  /**
   * 创建右侧面板
   */
  createRightPanel() {
    this.elements.rightPanel = this.createElement("div", { id: "right-panel" });
    // 创建右侧切换按钮
    this.elements.rightToggleBtns = this.createElement("div", {
      className: "toggle-btns",
    });
    this.elements.rightPanel.appendChild(this.elements.rightToggleBtns);
    [
      { prop: "prop", name: "属性" },
      { prop: "style", name: "样式" },
      { prop: "event", name: "事件" },
      { prop: "data", name: "数据" },
    ].forEach((i) => {
      this.createPropPanel(i.prop, i.name);
    });
    this.switchPanel("right", "prop");
    this.elements.mainDiv.appendChild(this.elements.rightPanel);
  }

  /**
   * 创建属性面板
   * @param {*} prop 属性
   * @param {*} name 名称
   */
  createPropPanel(prop, name) {
    // 创建面板展示切换按钮
    this.elements[prop + "Btn"] = this.createElement("button", {
      className: "btn toggle-btn",
      id: prop + "Btn",
      textContent: name,
    });
    this.elements[prop + "Btn"].addEventListener("click", () => {
      this.switchPanel("right", prop);
    });
    this.elements.rightToggleBtns.appendChild(this.elements[prop + "Btn"]);
    // 创建与按钮对应的面板
    this.elements[prop + "Panel"] = this.createElement("div", {
      id: prop + "Panel",
      className: "panel",
    });
    this.elements[prop + "Panel"].appendChild(
      this.createElement("p", { textContent: "组件" + name })
    );
    this.elements.rightPanel.appendChild(this.elements[prop + "Panel"]);
    this.rightPanels.push(this.elements[prop + "Panel"]);
  }

  /**
   * 创建DOM元素的辅助方法
   */
  createElement(tag, properties = {}) {
    const element = document.createElement(tag);
    Object.keys(properties).forEach((key) => {
      if (key === "textContent" || key === "innerHTML") {
        element[key] = properties[key];
      } else {
        element.setAttribute(key, properties[key]);
        element[key] = properties[key];
      }
    });
    return element;
  }

  /**
   * 切换面板
   * @param {*} area 区域
   * @param {*} item 项目
   */
  switchPanel(area, item) {
    // 当前点击按钮active其他不
    Array.from(this.elements[area + "ToggleBtns"].children).forEach((el) => {
      el.classList.toggle("active", el === this.elements[item + "Btn"]);
    });
    // 当前项目面板展示，其他隐藏
    this[area + "Panels"].forEach((el) => {
      el.classList.toggle("hidden", el !== this.elements[item + "Panel"]);
    });
  }

  /**
   * 创建组件
   * @param {*} type 组件类型
   * @param {*} parentComp 父级组件
   */
  createComp(type, parentComp = null) {
    this.compCount++;
    const compId = `comp${this.compCount.toString().padStart(4, "0")}`;
    const compDef = ConfigFactory.getDef(type);
    // 创建组件对象
    const comp = {
      id: compId,
      type: type,
      props: { ...compDef.props },
      styles: { ...compDef.styles },
      events: { ...compDef.events },
      data: compDef.data,
      children: [],
      parentId: parentComp ? parentComp.id : null,
    };
    this.compMap[compId] = comp;
    if (parentComp) {
      parentComp.children.push(comp);
    } else {
      this.root = comp;
    }
    // 更新组件树
    this.compTreePanel.renderCompTree();
    // 默认选中新创建的组件
    this.compTreePanel.selectComp(compId);
    // 预览区域渲染
    this.renderPreview();
  }

  /**
   * 显示属性表单
   * @param {*} comp 组件
   */
  showPropView(comp) {
    this.renderProp(
      this.elements.propPanel,
      new PropRender(comp, this).render()
    );
    this.renderProp(
      this.elements.stylePanel,
      new StyleRender(comp, this).render()
    );
    this.renderProp(
      this.elements.eventPanel,
      new EventRender(comp, this).render()
    );
    this.renderProp(
      this.elements.dataPanel,
      new DataRender(comp, this).render()
    );
  }

  /**
   * 渲染属性表单
   * @param {*} element DOM元素
   * @param {*} children 下级内容
   */
  renderProp(element, children) {
    element.innerHTML = "";
    children.forEach((child) => {
      element.appendChild(child);
    });
  }

  /**
   * 删除组件
   * @param {*} compId 组件ID
   * @returns
   */
  deleteComp(compId) {
    const comp = this.compMap[compId];
    if (!comp) return;
    // 从父组件或根组件列表中移除
    if (comp.parentId) {
      const parent = this.compMap[comp.parentId];
      if (!parent) {
        return;
      }
      const index = parent.children.indexOf(comp);
      if (index > -1) {
        parent.children.splice(index, 1);
      }
      this.sldComp = parent;
    } else {
      this.sldComp = this.root;
    }
    // 删除子组件
    this.deleteChildren([comp]);
    // 更新组件树
    this.compTreePanel.renderCompTree();
    // 根据当前视图更新显示
    this.renderPreview();
  }

  /**
   * 递归删除子组件
   * @param {*} children 子组件集合
   */
  deleteChildren(children) {
    children.forEach((child) => {
      delete this.compMap[child.id];
      if (child.children && child.children.length > 0) {
        this.deleteChildren(child.children);
      }
    });
  }

  /**
   * 清空所有组件
   */
  clearAllComp() {
    if (confirm("确定要清空所有组件吗？")) {
      this.root.children = [];
      this.compMap = {};
      this.compMap[this.root.id] = this.root;
      this.sldComp = this.root;
      // 更新组件树展示
      this.compTreePanel.renderCompTree();
      // 根据当前视图更新显示
      this.renderPreview();
    }
  }

  /**
   * 渲染预览
   */
  renderPreview() {
    // 如果有聚焦的组件，则只渲染该组件
    let dsl;
    if (this.focusedComp) {
      const units = new DslParser(
        JSON.parse(JSON.stringify(this.root))
      ).transferUnit();
      dsl = JSON.parse(JSON.stringify(this.focusedComp));
      const { width, height } = units[this.focusedComp.id];
      dsl.styles.width = width;
      dsl.styles.height = height;
    } else {
      // 否则渲染完整页面
      dsl = JSON.parse(JSON.stringify(this.root));
    }
    this.elements.previewPanel.innerHTML = "";
    this.elements.previewPanel.appendChild(new DslParser(dsl).parse().render());
    this.dslPanel.updateDslContent();
  }

  /**
   * 移动组件
   * @param {*} compId 组件ID
   * @param {*} direction 移动方向(-1:上移, 1:下移)
   */
  moveComp(compId, direction) {
    const comp = this.compMap[compId];
    if (!comp || !comp.parentId) return;
    const parent = this.compMap[comp.parentId];
    const children = parent.children;
    const index = children.indexOf(comp);
    if (
      (direction === -1 && index > 0) ||
      (direction === 1 && index < children.length - 1)
    ) {
      // 交换位置
      const newIndex = index + direction;
      [children[index], children[newIndex]] = [
        children[newIndex],
        children[index],
      ];
      // 更新组件树
      this.compTreePanel.renderCompTree();
      // 重新渲染预览
      this.renderPreview();
    }
  }

  /**
   * 复制组件
   * @param {*} compId 组件ID
   */
  copyComp(compId) {
    const comp = this.compMap[compId];
    if (!comp || !comp.parentId) return;
    const parent = this.compMap[comp.parentId];
    // 深度复制组件
    const clonedComp = this.cloneComp(comp);
    const index = parent.children.indexOf(comp);
    // 添加到父组件中
    parent.children.splice(index + 1, 0, clonedComp);
    // 更新组件映射
    this.initCompMap(clonedComp);
    // 更新组件树
    this.compTreePanel.renderCompTree();
    // 重新渲染预览
    this.renderPreview();
  }

  /**
   * 聚焦组件 - 只在预览区显示指定组件
   * @param {*} compId 组件ID
   */
  focusComp(compId) {
    const comp = this.compMap[compId];
    if (!comp) return;
    // 设置当前聚焦的组件
    this.focusedComp = comp;
    this.renderPreview();
  }

  /**
   * 深度克隆组件
   * @param {*} comp 要克隆的组件
   * @returns 克隆的组件
   */
  cloneComp(comp) {
    // 生成新的ID
    this.compCount++;
    const newId = `comp${this.compCount.toString().padStart(4, "0")}`;
    // 创建新组件
    const clonedComp = {
      id: newId,
      type: comp.type,
      props: this.deepClone(comp.props),
      styles: this.deepClone(comp.styles),
      events: this.deepClone(comp.events),
      data: this.deepClone(comp.data),
      children: [],
      parentId: comp.parentId,
    };
    // 递归克隆子组件
    if (comp.children && comp.children.length > 0) {
      comp.children.forEach((child) => {
        const clonedChild = this.cloneComp(child);
        clonedChild.parentId = newId;
        clonedComp.children.push(clonedChild);
      });
    }
    return clonedComp;
  }

  /**
   * 深度克隆对象
   * @param {*} obj 要克隆的对象
   * @returns 克隆的对象
   */
  deepClone(obj) {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }
    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }
    if (obj instanceof Array) {
      return obj.map((item) => this.deepClone(item));
    }
    if (typeof obj === "object") {
      const clonedObj = {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = this.deepClone(obj[key]);
        }
      }
      return clonedObj;
    }
    return obj;
  }

  /**
   * 获取组件ID
   * @param {*} comp
   * @returns
   */
  getCompId(comp) {
    let id = 0;
    const match = comp.id.match(/(\d+)$/);
    if (match && match[1]) {
      const num = parseInt(match[1], 10);
      if (num > id) {
        id = num;
      }
    }
    if (comp.children) {
      comp.children.forEach((child) => {
        const num = this.getCompId(child);
        if (num > id) {
          id = num;
        }
      });
    }
    return id;
  }

  /**
   * 初始化组件map
   * @param {*} comp
   */
  initCompMap(comp) {
    this.compMap[comp.id] = comp;
    if (comp.children) {
      comp.children.forEach((child) => {
        this.initCompMap(child);
      });
    }
  }
}

// 初始化
document.addEventListener("DOMContentLoaded", () => {
  new Designer().init();
});
