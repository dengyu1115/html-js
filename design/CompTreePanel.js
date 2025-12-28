import ConfigFactory from "./ConfigFactory.js";

/**
 * 组件树面板
 */
export default class CompTreePanel {
  constructor(designer) {
    this.designer = designer;
    this.elements = {};
  }

  /**
   * 创建组件树面板
   * @returns 组件树面板元素
   */
  createPanel() {
    const panel = this.designer.createElement("div", {
      id: "compPanel",
      className: "panel",
    });

    // 保存大纲容器引用
    this.elements.compContent = this.designer.createElement("div", {
      id: "compContent",
    });
    panel.appendChild(this.elements.compContent);

    // 创建组件树操作按钮组
    const compBtns = this.designer.createElement("div", {
      className: "btns",
    });

    // 创建清空操作按钮
    const clearAllBtn = this.designer.createElement("button", {
      className: "btn",
      id: "clearAll",
      textContent: "清空",
    });
    clearAllBtn.addEventListener("click", () => {
      this.designer.clearAllComp();
    });
    compBtns.appendChild(clearAllBtn);
    panel.appendChild(compBtns);

    return panel;
  }

  /**
   * 渲染组件树
   */
  renderCompTree() {
    this.elements.compContent.innerHTML = "";
    this.elements.compContent.appendChild(this.createItem(this.designer.root));
  }

  /**
   * 创建组件树元素
   * @param {*} comp 组件
   * @returns 组件树元素
   */
  createItem(comp) {
    const itemDiv = this.designer.createElement("div", {
      className: "comp-item",
      "data-id": comp.id,
    });

    const nameRow = this.designer.createElement("div", {
      className: "comp-item-row",
    });
    const textDiv = this.designer.createElement("div", {
      className: "comp-item-row-main",
      innerText: ConfigFactory.getDef(comp.type).name,
    });
    nameRow.appendChild(textDiv);

    // 添加操作按钮容器
    const btnContainer = this.designer.createElement("div", {
      className: "comp-item-row-btns",
    });

    if (comp.parentId) {
      // 获取父组件和当前组件在父组件中的索引
      const parent = this.designer.compMap[comp.parentId];
      const index = parent.children.indexOf(comp);

      // 上移按钮
      if (index > 0) {
        const upBtn = this.designer.createElement("button", {
          className: "comp-item-row-btn",
          innerText: "↑",
          title: "上移",
        });
        upBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.designer.moveComp(comp.id, -1);
        });
        btnContainer.appendChild(upBtn);
      }

      // 下移按钮
      if (index < parent.children.length - 1) {
        const downBtn = this.designer.createElement("button", {
          className: "comp-item-row-btn",
          innerText: "↓",
          title: "下移",
        });
        downBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.designer.moveComp(comp.id, 1);
        });
        btnContainer.appendChild(downBtn);
      }

      // 复制按钮
      const copyBtn = this.designer.createElement("button", {
        className: "comp-item-row-btn",
        innerText: "❐",
        title: "复制",
      });
      copyBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.designer.copyComp(comp.id);
      });
      btnContainer.appendChild(copyBtn);

      // 删除按钮
      const delBtn = this.designer.createElement("button", {
        className: "comp-item-row-btn",
        innerText: "x",
        title: "删除",
      });
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.designer.deleteComp(comp.id);
      });
      btnContainer.appendChild(delBtn);
    }

    // 聚焦按钮
    const focusBtn = this.designer.createElement("button", {
      className: "comp-item-row-btn",
      innerText: "◉",
      title: "聚焦",
    });
    focusBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.designer.focusComp(comp.id);
    });
    btnContainer.appendChild(focusBtn);

    // 保存为模板按钮
    const templateBtn = this.designer.createElement("button", {
      className: "comp-item-row-btn",
      innerText: "📄",
      title: "保存为模板",
    });
    templateBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.designer.templatePanel.showSaveModal(comp);
    });
    btnContainer.appendChild(templateBtn);

    nameRow.appendChild(btnContainer);
    itemDiv.appendChild(nameRow);

    // 添加点击事件
    itemDiv.addEventListener("click", (e) => {
      if (e.target.closest(".comp-item-row-btn")) {
        return; // 让操作按钮处理自己的事件
      }
      e.stopPropagation();
      this.selectComp(comp.id);
    });

    // 如果有子组件，递归创建
    if (comp.children && comp.children.length > 0) {
      const childDiv = this.designer.createElement("div", {
        className: "children",
      });
      comp.children.forEach((child) => {
        childDiv.appendChild(this.createItem(child));
      });
      itemDiv.appendChild(childDiv);
    }
    return itemDiv;
  }

  /**
   * 创建组件选择器
   * @returns 组件选择器
   */
  createCompSelect(comp) {
    const container = this.designer.createElement("div", {
      className: "comp-item-row comp-select",
    });
    const select = this.designer.createElement("select", {
      className: "comp-item-row-main",
    });
    this.createCompOptions(select, comp.type);
    const addBtn = this.designer.createElement("button", {
      className: "comp-item-row-btn",
      textContent: "+",
    });
    addBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const type = select.value;
      if (type) {
        // 检查是否是模板
        if (type.startsWith("template:")) {
          // 从模板创建组件
          const templateId = type.split(":")[1];
          this.designer.templatePanel.createFromTemplate(templateId);
        } else {
          // 创建普通组件
          this.designer.createComp(type, comp);
        }
        select.value = ""; // 重置选择
      }
    });
    container.appendChild(select);
    container.appendChild(addBtn);
    return container;
  }

  createCompOptions(select, type) {
    const def = ConfigFactory.getDef(type);
    if (!(def.configChildren && def.configChildren.length > 0)) {
      return;
    }

    // 添加默认组件选项
    def.configChildren.forEach((i) => {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = ConfigFactory.getDef(i).name;
      select.appendChild(option);
    });

    // 如果有复制的模板，检查是否匹配
    if (
      this.designer.clipboard &&
      this.designer.clipboard.type === "template"
    ) {
      const template = this.designer.clipboard.data;
      const comp = JSON.parse(template.config);
      // 检查模板的顶级组件是否在可选组件列表中
      if (def.configChildren.includes(comp.type)) {
        const option = document.createElement("option");
        option.value = `template:${template.id}`;
        option.textContent = `模板: ${template.name}`;
        select.appendChild(option);
      }
    }
  }

  /**
   * 高亮组件树中的项目
   * @param {*} compId
   */
  highlightItem(compId) {
    const prev = document.querySelector(".comp-item.selected");
    const curr = document.querySelector(`.comp-item[data-id="${compId}"]`);
    if (prev === curr) {
      return;
    }
    // 清除之前选中状态
    if (prev) {
      prev.classList.remove("selected");
      prev.querySelector(".comp-select")?.remove();
    }
    // 设置新选中状态
    if (curr) {
      curr.classList.add("selected");
      const comp = this.designer.compMap[compId];
      if (!comp) {
        return;
      }
      const def = ConfigFactory.getDef(comp.type);
      if (!(def.configChildren && def.configChildren.length > 0)) {
        return;
      }
      curr.appendChild(this.createCompSelect(comp));
    }
  }

  /**
   * 选择组件
   * @param {*} compId
   */
  selectComp(compId) {
    this.designer.sldComp = this.designer.compMap[compId];
    this.designer.showPropView(this.designer.sldComp);
    this.highlightItem(compId);
  }
}
