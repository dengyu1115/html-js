import ConfigFactory from "./ConfigFactory.js";
import { createElement } from "./utils/dom.js";

export default class CompTreePanel {
  constructor({ state, actions }) {
    this.state = state;
    this.actions = actions;
    this.elements = {};
  }

  createPanel() {
    const panel = createElement("div", {
      id: "compPanel",
      className: "panel",
    });

    this.elements.compContent = createElement("div", { id: "compContent" });
    panel.appendChild(this.elements.compContent);

    const compBtns = createElement("div", { className: "btns" });
    const clearAllBtn = createElement("button", {
      className: "btn",
      id: "clearAll",
      textContent: "清空",
    });
    clearAllBtn.addEventListener("click", () => this.actions.clearAll());
    compBtns.appendChild(clearAllBtn);
    panel.appendChild(compBtns);

    return panel;
  }

  renderCompTree() {
    this.elements.compContent.innerHTML = "";
    if (this.state.root) {
      this.elements.compContent.appendChild(this._createItem(this.state.root));
    }
  }

  selectComp(compId) {
    this.actions.selectComp(compId);
    this._highlightItem(compId);
  }

  _createItem(comp) {
    const itemDiv = createElement("div", {
      className: "comp-item",
      "data-id": comp.id,
    });

    const nameRow = createElement("div", { className: "comp-item-row" });
    const textDiv = createElement("div", {
      className: "comp-item-row-main",
      innerText: ConfigFactory.getDef(comp.type).name,
    });
    nameRow.appendChild(textDiv);

    const btnContainer = this._createActionButtons(comp);
    nameRow.appendChild(btnContainer);
    itemDiv.appendChild(nameRow);

    itemDiv.addEventListener("click", (e) => {
      if (e.target.closest(".comp-item-row-btn")) {
        return;
      }
      e.stopPropagation();
      this.selectComp(comp.id);
    });

    if (comp.children && comp.children.length > 0) {
      const childDiv = createElement("div", { className: "children" });
      comp.children.forEach((child) => childDiv.appendChild(this._createItem(child)));
      itemDiv.appendChild(childDiv);
    }
    return itemDiv;
  }

  _createActionButtons(comp) {
    const btnContainer = createElement("div", { className: "comp-item-row-btns" });

    if (comp.parentId) {
      const parent = this.state.compMap[comp.parentId];
      const index = parent.children.indexOf(comp);

      if (index > 0) {
        btnContainer.appendChild(this._createBtn("↑", "上移", () => this.actions.moveComp(comp.id, -1)));
      }
      if (index < parent.children.length - 1) {
        btnContainer.appendChild(this._createBtn("↓", "下移", () => this.actions.moveComp(comp.id, 1)));
      }
      btnContainer.appendChild(this._createBtn("❐", "复制", () => this.actions.copyComp(comp.id)));
      btnContainer.appendChild(this._createBtn("x", "删除", () => this.actions.deleteComp(comp.id)));
    }

    btnContainer.appendChild(this._createBtn("◉", "聚焦", () => this.actions.focusComp(comp.id)));
    btnContainer.appendChild(this._createBtn("📄", "保存为模板", () => this.actions.saveAsTemplate(comp)));

    return btnContainer;
  }

  _createBtn(text, title, onClick) {
    const btn = createElement("button", {
      className: "comp-item-row-btn",
      innerText: text,
      title: title,
    });
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      onClick();
    });
    return btn;
  }

  _highlightItem(compId) {
    const prev = document.querySelector(".comp-item.selected");
    const curr = document.querySelector(`.comp-item[data-id="${compId}"]`);
    if (prev === curr) return;

    if (prev) {
      prev.classList.remove("selected");
      prev.querySelector(".comp-select")?.remove();
    }
    if (curr) {
      curr.classList.add("selected");
      const comp = this.state.compMap[compId];
      if (!comp) return;
      const def = ConfigFactory.getDef(comp.type);
      if (def.configChildren && def.configChildren.length > 0) {
        curr.appendChild(this._createCompSelect(comp));
      }
    }
  }

  _createCompSelect(comp) {
    const container = createElement("div", { className: "comp-item-row comp-select" });
    const select = createElement("select", { className: "comp-item-row-main" });
    this._fillCompOptions(select, comp.type);

    const addBtn = createElement("button", {
      className: "comp-item-row-btn",
      textContent: "+",
    });
    addBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const type = select.value;
      if (!type) return;
      if (type.startsWith("template:")) {
        const templateId = type.split(":")[1];
        this.state.clipboard = {
          type: "template",
          data: this.state.templates.find((t) => t.id === templateId),
        };
        this.actions.createFromTemplate();
      } else {
        this.actions.createComp(type, comp);
      }
      select.value = "";
    });

    container.appendChild(select);
    container.appendChild(addBtn);
    return container;
  }

  _fillCompOptions(select, type) {
    const def = ConfigFactory.getDef(type);
    if (!(def.configChildren && def.configChildren.length > 0)) return;

    def.configChildren.forEach((childType) => {
      const option = document.createElement("option");
      option.value = childType;
      option.textContent = ConfigFactory.getDef(childType).name;
      select.appendChild(option);
    });

    if (this.state.clipboard && this.state.clipboard.type === "template") {
      const template = this.state.clipboard.data;
      const comp = JSON.parse(template.config);
      if (def.configChildren.includes(comp.type)) {
        const option = document.createElement("option");
        option.value = `template:${template.id}`;
        option.textContent = `模板: ${template.name}`;
        select.appendChild(option);
      }
    }
  }
}