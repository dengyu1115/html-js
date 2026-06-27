import DslParser from "../render/DslParser.js";
import CompTreePanel from "./CompTreePanel.js";
import PropPanel from "./PropPanel.js";
import StylePanel from "./StylePanel.js";
import EventPanel from "./EventPanel.js";
import DataPanel from "./DataPanel.js";
import DslPanel from "./DslPanel.js";
import TemplatePanel from "./TemplatePanel.js";
import ConfigFactory from "./ConfigFactory.js";
import { createElement, clearChildren, appendChildren } from "./utils/dom.js";
import { deepClone, cloneComp, initCompMap } from "./utils/clone.js";

export default class Designer {
  constructor() {
    this.state = {
      compCount: 0,
      sldComp: null,
      compMap: {},
      templates: [],
      root: null,
      focusedComp: null,
      clipboard: null,
    };
    this.elements = {};
    this.leftPanels = [];
    this.rightPanels = [];
  }

  init() {
    this.createPage();
    this.createComp("page");
  }

  createPage() {
    this.elements.mainDiv = createElement("div", { className: "main" });
    this.createLeftPanel();
    this.createCenterPanel();
    this.createRightPanel();
    document.body.appendChild(this.elements.mainDiv);
  }

  createLeftPanel() {
    this.elements.leftPanel = createElement("div", { id: "left-panel" });

    this.elements.leftToggleBtns = createElement("div", {
      className: "toggle-btns",
    });
    this.elements.leftPanel.appendChild(this.elements.leftToggleBtns);

    const sharedActions = {
      refreshTree: () => this.compTreePanel.renderCompTree(),
      renderPreview: () => this.renderPreview(),
    };

    this.compTreePanel = new CompTreePanel({
      state: this.state,
      actions: {
        ...sharedActions,
        clearAll: () => this.clearAllComp(),
        selectComp: (compId) => {
          this.state.sldComp = this.state.compMap[compId];
          if (this.state.sldComp) this.showInspector(this.state.sldComp);
        },
        moveComp: (compId, dir) => this.moveComp(compId, dir),
        copyComp: (compId) => this.copyComp(compId),
        deleteComp: (compId) => this.deleteComp(compId),
        focusComp: (compId) => this.focusComp(compId),
        saveAsTemplate: (comp) => this.templatePanel.showSaveModal(comp),
        createComp: (type, parentComp) => this.createComp(type, parentComp),
        createFromTemplate: () => this.templatePanel.createFromTemplate(),
      },
    });

    this.dslPanel = new DslPanel({
      state: this.state,
      actions: {
        ...sharedActions,
        loadData: (root) => this.showInspector(root),
        clearPreview: () => { this.elements.previewPanel.innerHTML = ""; },
        clearDslContent: () => { this.dslPanel.elements.dslContent.value = ""; },
      },
    });

    this.templatePanel = new TemplatePanel({
      state: this.state,
      actions: { ...sharedActions },
    });

    [
      { key: "comp", instanceKey: "compTreePanel", label: "组件树", active: true },
      { key: "dsl", instanceKey: "dslPanel", label: "DSL" },
      { key: "template", instanceKey: "templatePanel", label: "模板" },
    ].forEach(({ key, instanceKey, label, active }) => this._createLeftPanelItem(key, instanceKey, label, active));

    this.leftPanels.push(
      this.elements.compPanel,
      this.elements.dslPanel,
      this.elements.templatePanel,
    );
    this.elements.mainDiv.appendChild(this.elements.leftPanel);

    this.templatePanel.query();
  }

  _createLeftPanelItem(key, instanceKey, label, active) {
    const btn = createElement("button", {
      className: `btn toggle-btn${active ? " active" : ""}`,
      id: key + "Btn",
      textContent: label,
    });
    btn.addEventListener("click", () => this.switchPanel("left", key));
    this.elements.leftToggleBtns.appendChild(btn);
    this.elements[key + "Btn"] = btn;

    const panel = this[instanceKey].createPanel();
    this.elements[key + "Panel"] = panel;
    this.elements.leftPanel.appendChild(panel);
  }

  createCenterPanel() {
    this.elements.centerPanel = createElement("div", { id: "center-panel" });
    this.elements.previewPanel = createElement("div", { id: "previewPanel" });
    this.elements.previewPanel.appendChild(
      createElement("p", { textContent: "组件预览" }),
    );
    this.elements.centerPanel.appendChild(this.elements.previewPanel);
    this.elements.mainDiv.appendChild(this.elements.centerPanel);
  }

  createRightPanel() {
    this.elements.rightPanel = createElement("div", { id: "right-panel" });

    this.elements.rightToggleBtns = createElement("div", {
      className: "toggle-btns",
    });
    this.elements.rightPanel.appendChild(this.elements.rightToggleBtns);

    this.onChange = () => this.renderPreview();

    [
      { key: "prop", name: "属性" },
      { key: "style", name: "样式" },
      { key: "event", name: "事件" },
      { key: "data", name: "数据" },
    ].forEach(({ key, name }) => this.createPropPanel(key, name));

    this.switchPanel("right", "prop");
    this.elements.mainDiv.appendChild(this.elements.rightPanel);
  }

  createPropPanel(prop, name) {
    this.elements[prop + "Btn"] = createElement("button", {
      className: "btn toggle-btn",
      id: prop + "Btn",
      textContent: name,
    });
    this.elements[prop + "Btn"].addEventListener("click", () =>
      this.switchPanel("right", prop),
    );
    this.elements.rightToggleBtns.appendChild(this.elements[prop + "Btn"]);

    this.elements[prop + "Panel"] = createElement("div", {
      id: prop + "Panel",
      className: "panel",
    });
    this.elements[prop + "Panel"].appendChild(
      createElement("p", { textContent: "组件" + name }),
    );
    this.elements.rightPanel.appendChild(this.elements[prop + "Panel"]);
    this.rightPanels.push(this.elements[prop + "Panel"]);
  }

  showInspector(component) {
    const render = (id, children) => {
      const el = document.getElementById(id);
      if (el) {
        clearChildren(el);
        appendChildren(el, children);
      }
    };
    render("propPanel", new PropPanel(component, this.onChange).render());
    render("stylePanel", new StylePanel(component, this.onChange).render());
    render("eventPanel", new EventPanel(component, this.onChange).render());
    render("dataPanel", new DataPanel(component, this.onChange).render());
  }

  switchPanel(area, item) {
    Array.from(this.elements[area + "ToggleBtns"].children).forEach((el) => {
      el.classList.toggle("active", el === this.elements[item + "Btn"]);
    });
    this[area + "Panels"].forEach((el) => {
      el.classList.toggle("hidden", el !== this.elements[item + "Panel"]);
    });
  }

  createComp(type, parentComp = null) {
    this.state.compCount++;
    const compId = `comp${this.state.compCount.toString().padStart(4, "0")}`;
    const compDef = ConfigFactory.getDef(type);
    const comp = {
      id: compId,
      type: type,
      props: deepClone(compDef.props),
      styles: deepClone(compDef.styles),
      events: deepClone(compDef.events),
      data: compDef.data ? deepClone(compDef.data) : null,
      children: [],
      parentId: parentComp ? parentComp.id : null,
    };
    this.state.compMap[compId] = comp;
    if (parentComp) {
      parentComp.children.push(comp);
    } else {
      this.state.root = comp;
    }
    this.compTreePanel.renderCompTree();
    this.compTreePanel.selectComp(compId);
    this.renderPreview();
  }

  deleteComp(compId) {
    const comp = this.state.compMap[compId];
    if (!comp) return;
    if (comp.parentId) {
      const parent = this.state.compMap[comp.parentId];
      if (!parent) return;
      const index = parent.children.indexOf(comp);
      if (index > -1) parent.children.splice(index, 1);
      this.state.sldComp = parent;
    } else {
      this.state.sldComp = this.state.root;
    }
    this._deleteChildren([comp]);
    this.compTreePanel.renderCompTree();
    this.showInspector(this.state.sldComp);
    this.renderPreview();
  }

  _deleteChildren(children) {
    children.forEach((child) => {
      delete this.state.compMap[child.id];
      if (child.children && child.children.length > 0) {
        this._deleteChildren(child.children);
      }
    });
  }

  clearAllComp() {
    if (!confirm("确定要清空所有组件吗？")) return;
    this.state.root.children = [];
    this.state.compMap = {};
    this.state.compMap[this.state.root.id] = this.state.root;
    this.state.sldComp = this.state.root;
    this.compTreePanel.renderCompTree();
    this.showInspector(this.state.sldComp);
    this.renderPreview();
  }

  renderPreview() {
    let dsl;
    if (this.state.focusedComp) {
      const units = new DslParser(deepClone(this.state.root)).transferUnit();
      dsl = deepClone(this.state.focusedComp);
      const { width, height } = units[this.state.focusedComp.id];
      dsl.styles.width = width;
      dsl.styles.height = height;
    } else {
      dsl = deepClone(this.state.root);
    }
    this.elements.previewPanel.innerHTML = "";
    this.elements.previewPanel.appendChild(new DslParser(dsl).parse().render());
    this.dslPanel.updateDslContent();
  }

  moveComp(compId, direction) {
    const comp = this.state.compMap[compId];
    if (!comp || !comp.parentId) return;
    const parent = this.state.compMap[comp.parentId];
    const children = parent.children;
    const index = children.indexOf(comp);
    if (
      (direction === -1 && index > 0) ||
      (direction === 1 && index < children.length - 1)
    ) {
      const newIndex = index + direction;
      [children[index], children[newIndex]] = [
        children[newIndex],
        children[index],
      ];
      this.compTreePanel.renderCompTree();
      this.renderPreview();
    }
  }

  copyComp(compId) {
    const comp = this.state.compMap[compId];
    if (!comp || !comp.parentId) return;
    const parent = this.state.compMap[comp.parentId];
    const compCount = { value: this.state.compCount };
    const clonedComp = cloneComp(comp, compCount);
    this.state.compCount = compCount.value;
    const index = parent.children.indexOf(comp);
    parent.children.splice(index + 1, 0, clonedComp);
    initCompMap(clonedComp, this.state.compMap);
    this.compTreePanel.renderCompTree();
    this.renderPreview();
  }

  focusComp(compId) {
    const comp = this.state.compMap[compId];
    if (!comp) return;
    this.state.focusedComp = comp;
    this.renderPreview();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Designer().init();
});