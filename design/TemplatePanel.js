import Http from "../util/Http.js";
import { API_TEMPLATES } from "./api.js";
import { createElement } from "./utils/dom.js";
import { cloneComp, initCompMap } from "./utils/clone.js";

export default class TemplatePanel {
  constructor({ state, actions }) {
    this.state = state;
    this.actions = actions;
    this.elements = {};
  }

  createPanel() {
    const panel = createElement("div", {
      id: "templatePanel",
      className: "panel hidden",
    });

    this.elements.templateContent = createElement("div", {
      id: "templateContent",
      className: "template-content",
    });
    panel.appendChild(this.elements.templateContent);

    const compBtns = createElement("div", { className: "btns" });
    const refreshBtn = createElement("button", {
      className: "btn",
      id: "refreshTemplates",
      textContent: "刷新",
    });
    refreshBtn.addEventListener("click", () => this.query());
    compBtns.appendChild(refreshBtn);
    panel.appendChild(compBtns);

    return panel;
  }

  query() {
    Http.request(API_TEMPLATES, "GET", null, (data) => {
      this.state.templates = data;
      this._renderList();
    });
  }

  showSaveModal(comp) {
    const modal = this._createModal("保存", comp, "tpl" + Date.now(), "", "", (config, id, name, desc) => {
      this._save(config, id, name, desc);
    });
    document.body.appendChild(modal);
  }

  showEditModal(template) {
    const modal = this._createModal("编辑", template.config, template.id, template.name, template.description, (config, id, name, desc) => {
      this._edit(config, id, name, desc);
    });
    document.body.appendChild(modal);
  }

  createFromTemplate() {
    const template = this.state.clipboard?.data;
    if (!template) return;

    const templateComp = JSON.parse(template.config);
    const compCount = { value: this.state.compCount };
    const clonedComp = cloneComp(templateComp, compCount);
    this.state.compCount = compCount.value;

    const parentComp = this.state.sldComp || this.state.root;
    clonedComp.parentId = parentComp.id;
    parentComp.children.push(clonedComp);
    initCompMap(clonedComp, this.state.compMap);
    this.actions.refreshTree();
    this.actions.renderPreview();
  }

  _renderList() {
    this.elements.templateContent.innerHTML = "";
    const listContainer = createElement("div", { className: "template-list" });
    this.state.templates.forEach((template) => {
      listContainer.appendChild(this._createItem(template));
    });
    this.elements.templateContent.appendChild(listContainer);
  }

  _createItem(template) {
    const itemDiv = createElement("div", { className: "template-item", "data-id": template.id });

    const nameDiv = createElement("div", { className: "template-name", textContent: template.name });
    const descDiv = createElement("div", { className: "template-desc", textContent: template.description });

    const btnContainer = createElement("div", { className: "template-item-btns" });

    const copyBtn = createElement("button", { className: "btn btn-sm", textContent: "❐", title: "复制模板" });
    copyBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.state.clipboard = { type: "template", data: template };
      this.actions.refreshTree();
      alert("模板已复制，可以在组件下拉列表中选择并添加");
    });

    const editBtn = createElement("button", { className: "btn btn-sm", textContent: "✎", title: "编辑模板" });
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.showEditModal(template);
    });

    const deleteBtn = createElement("button", { className: "btn btn-sm", textContent: "x", title: "删除模板" });
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this._delete(template.id);
    });

    btnContainer.appendChild(copyBtn);
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);
    itemDiv.appendChild(nameDiv);
    itemDiv.appendChild(descDiv);
    itemDiv.appendChild(btnContainer);
    return itemDiv;
  }

  _createModal(title, config, id, name, desc, onSubmit) {
    const modal = createElement("div");

    const overlay = createElement("div", { className: "modal-overlay" });
    const container = createElement("div", { className: "modal-container" });

    const header = createElement("div", { className: "modal-header" });
    const titleEl = createElement("h3", { textContent: title + "模板" });
    const closeBtn = createElement("button", { className: "modal-close-btn", innerHTML: "&times;" });
    closeBtn.addEventListener("click", () => document.body.removeChild(modal));
    header.appendChild(titleEl);
    header.appendChild(closeBtn);

    const content = createElement("div", { className: "modal-content" });

    const idGroup = this._createFormGroup("模板ID:", id, "text", "请输入模板ID");
    const nameGroup = this._createFormGroup("模板名称:", name, "text", "请输入模板名称");
    const descGroup = this._createFormGroup("模板描述:", desc, "textarea", "请输入模板描述");

    content.appendChild(idGroup);
    content.appendChild(nameGroup);
    content.appendChild(descGroup);

    const footer = createElement("div", { className: "modal-footer" });
    const cancelBtn = createElement("button", { className: "btn btn-default", textContent: "取消" });
    cancelBtn.addEventListener("click", () => document.body.removeChild(modal));

    const submitBtn = createElement("button", { className: "btn btn-primary", textContent: title });
    submitBtn.addEventListener("click", () => {
      const idText = idGroup.querySelector("input, textarea").value.trim();
      const nameText = nameGroup.querySelector("input, textarea").value.trim();
      const descText = descGroup.querySelector("input, textarea").value.trim();
      if (!idText) { alert("模板ID不能为空"); return; }
      if (!nameText) { alert("请输入模板名称"); return; }
      onSubmit(config, idText, nameText, descText);
      document.body.removeChild(modal);
    });

    footer.appendChild(cancelBtn);
    footer.appendChild(submitBtn);

    container.appendChild(header);
    container.appendChild(content);
    container.appendChild(footer);
    modal.appendChild(overlay);
    modal.appendChild(container);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) document.body.removeChild(modal);
    });

    return modal;
  }

  _createFormGroup(labelText, value, type, placeholder) {
    const group = createElement("div", { className: "form-group" });
    const label = createElement("label", { textContent: labelText });
    let input;
    if (type === "textarea") {
      input = createElement("textarea", {
        className: "form-control",
        value: value || "",
        placeholder: placeholder,
      });
    } else {
      input = createElement("input", {
        type: "text",
        className: "form-control",
        value: value || "",
        placeholder: placeholder,
      });
    }
    group.appendChild(label);
    group.appendChild(input);
    return group;
  }

  _save(config, id, name, desc) {
    Http.request(API_TEMPLATES, "POST", {
      id, name, description: desc,
      config: JSON.stringify(config),
    }, () => {
      this.query();
      alert("模板保存成功");
    });
  }

  _edit(config, id, name, desc) {
    Http.request(`${API_TEMPLATES}/${id}`, "PUT", {
      id, name, description: desc, config,
    }, () => {
      alert("模板更新成功");
      this.query();
    });
  }

  _delete(templateId) {
    if (!confirm("确定要删除这个模板吗？")) return;
    Http.request(`${API_TEMPLATES}/${templateId}`, "DELETE", null, () => {
      alert("模板删除成功");
      this.query();
    });
  }
}