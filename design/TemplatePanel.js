import Http from "../util/Http.js";

/**
 * 模板面板
 */
export default class TemplatePanel {
  constructor(designer) {
    this.designer = designer;
    this.elements = {};
  }

  /**
   * 创建模板面板
   * @returns 模板面板元素
   */
  createPanel() {
    const panel = this.designer.createElement("div", {
      id: "templatePanel",
      className: "panel hidden",
    });
    // 创建模板操作按钮组
    this.elements.templateBtns = this.designer.createElement("div", {
      className: "btns",
    });
    panel.appendChild(this.elements.templateBtns);
    // 保存模板内容区域引用
    this.elements.templateContent = this.designer.createElement("div", {
      id: "templateContent",
      className: "template-content",
    });
    panel.appendChild(this.elements.templateContent);
    // 创建组件树操作按钮组
    const compBtns = this.designer.createElement("div", {
      className: "btns",
    });

    // 创建清空操作按钮
    const refreshBtn = this.designer.createElement("button", {
      className: "btn",
      id: "refreshTemplates",
      textContent: "刷新",
    });
    refreshBtn.addEventListener("click", () => {
      this.query();
    });
    compBtns.appendChild(refreshBtn);
    panel.appendChild(compBtns);
    return panel;
  }

  /**
   * 渲染模板列表
   */
  renderList() {
    // 清空现有内容
    this.elements.templateContent.innerHTML = "";
    // 创建列表容器
    const listContainer = this.designer.createElement("div", {
      className: "template-list",
    });
    // 为每个模板创建列表项
    this.designer.templates.forEach((template) => {
      const item = this.createItem(template);
      listContainer.appendChild(item);
    });
    this.elements.templateContent.appendChild(listContainer);
  }

  /**
   * 创建模板列表项
   * @param {*} template 模板数据
   * @returns 列表项元素
   */
  createItem(template) {
    const itemDiv = this.designer.createElement("div", {
      className: "template-item",
      "data-id": template.id,
    });
    // 模板名称
    const nameDiv = this.designer.createElement("div", {
      className: "template-name",
      textContent: template.name,
    });
    // 模板描述
    const descDiv = this.designer.createElement("div", {
      className: "template-desc",
      textContent: template.description,
    });
    // 操作按钮容器
    const btnContainer = this.designer.createElement("div", {
      className: "template-item-btns",
    });
    // 复制按钮
    const copyBtn = this.designer.createElement("button", {
      className: "btn btn-sm",
      textContent: "❐",
      title: "复制模板",
    });
    copyBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      // 将模板ID存储到剪贴板状态中
      this.designer.clipboard = {
        type: "template",
        data: template,
      };
      // 重新渲染组件树以更新下拉选项
      this.designer.compTreePanel.renderCompTree();
      alert("模板已复制，可以在组件下拉列表中选择并添加");
    });
    btnContainer.appendChild(copyBtn);
    // 编辑按钮
    const editBtn = this.designer.createElement("button", {
      className: "btn btn-sm",
      textContent: "✎",
      title: "编辑模板",
    });
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.showEditModal(template);
    });
    btnContainer.appendChild(editBtn);
    // 删除按钮
    const deleteBtn = this.designer.createElement("button", {
      className: "btn btn-sm",
      textContent: "x",
      title: "删除模板",
    });
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.delete(template.id);
    });
    btnContainer.appendChild(deleteBtn);
    itemDiv.appendChild(nameDiv);
    itemDiv.appendChild(descDiv);
    itemDiv.appendChild(btnContainer);
    return itemDiv;
  }

  /**
   * 显示保存模板表单
   * @param {*} config 组件
   */
  showSaveModal(config) {
    // 创建模态框
    const modal = this.createModal(
      "保存",
      config,
      "tpl" + Date.now(),
      "",
      "",
      this.save.bind(this)
    );
    document.body.appendChild(modal);
  }

  /**
   * 显示编辑模板表单
   * @param {*} template 模板
   */
  showEditModal(template) {
    // 创建模态框
    const modal = this.createModal(
      "编辑",
      template.config,
      template.id,
      template.name,
      template.description,
      this.edit.bind(this)
    );
    document.body.appendChild(modal);
  }

  /**
   * 创建模板模态框
   * @param {*} title 模态框标题
   * @param {*} config 组件
   * @param {*} id 模板ID
   * @param {*} name 模板名称
   * @param {*} desc 模板描述
   * @param {*} callback 提交回调函数
   * @returns 模态框元素
   */
  createModal(title, config, id, name, desc, callback) {
    // 创建遮罩层
    const overlay = this.designer.createElement("div", {
      className: "modal-overlay",
      style:
        "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 1000; display: block;",
    });
    // 创建模态框容器
    const container = this.designer.createElement("div", {
      className: "modal-container",
      style:
        "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border-radius: 5px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); z-index: 1001; width: 500px; display: block;",
    });
    // 创建模态框头部
    const header = this.designer.createElement("div", {
      className: "modal-header",
      style:
        "padding: 15px; border-bottom: 1px solid #e5e5e5; display: flex; justify-content: space-between; align-items: center;",
    });
    const titleElement = this.designer.createElement("h3", {
      textContent: title + "模板",
      style: "margin: 0;",
    });
    const closeBtn = this.designer.createElement("button", {
      innerHTML: "&times;",
      style:
        "background: none; border: none; font-size: 24px; cursor: pointer; padding: 0; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;",
    });
    closeBtn.addEventListener("click", () => {
      document.body.removeChild(modal);
    });
    header.appendChild(titleElement);
    header.appendChild(closeBtn);
    // 创建模态框内容
    const content = this.designer.createElement("div", {
      className: "modal-content",
      style: "padding: 15px;",
    });
    // ID输入框
    const idFormGroup = this.designer.createElement("div", {
      className: "form-group",
      style: "margin-bottom: 15px;",
    });
    const idLabel = this.designer.createElement("label", {
      textContent: "模板ID:",
      style: "display: block; margin-bottom: 5px; font-weight: bold;",
    });
    const idInput = this.designer.createElement("input", {
      type: "text",
      className: "form-control",
      value: id || "",
      style:
        "width: 100%; padding: 8px; border: 1px solid #d9d9d9; border-radius: 4px;",
    });
    idFormGroup.appendChild(idLabel);
    idFormGroup.appendChild(idInput);
    // 名称输入框
    const nameFormGroup = this.designer.createElement("div", {
      className: "form-group",
      style: "margin-bottom: 15px;",
    });
    const nameLabel = this.designer.createElement("label", {
      textContent: "模板名称:",
      style: "display: block; margin-bottom: 5px; font-weight: bold;",
    });
    const nameInput = this.designer.createElement("input", {
      type: "text",
      className: "form-control",
      value: name || "",
      style:
        "width: 100%; padding: 8px; border: 1px solid #d9d9d9; border-radius: 4px;",
      placeholder: "请输入模板名称",
    });
    nameFormGroup.appendChild(nameLabel);
    nameFormGroup.appendChild(nameInput);
    // 描述输入框
    const descFormGroup = this.designer.createElement("div", {
      className: "form-group",
      style: "margin-bottom: 15px;",
    });
    const descLabel = this.designer.createElement("label", {
      textContent: "模板描述:",
      style: "display: block; margin-bottom: 5px; font-weight: bold;",
    });
    const descInput = this.designer.createElement("textarea", {
      className: "form-control",
      value: desc || "",
      style:
        "width: 100%; padding: 8px; border: 1px solid #d9d9d9; border-radius: 4px; min-height: 80px;",
      placeholder: "请输入模板描述",
    });
    descFormGroup.appendChild(descLabel);
    descFormGroup.appendChild(descInput);
    content.appendChild(idFormGroup);
    content.appendChild(nameFormGroup);
    content.appendChild(descFormGroup);
    // 创建模态框底部
    const footer = this.designer.createElement("div", {
      className: "modal-footer",
      style:
        "padding: 15px; border-top: 1px solid #e5e5e5; display: flex; justify-content: flex-end; gap: 10px;",
    });
    const cancelBtn = this.designer.createElement("button", {
      textContent: "取消",
      className: "btn btn-default",
      style:
        "padding: 6px 12px; font-size: 14px; border: 1px solid #d9d9d9; background: white; border-radius: 4px; cursor: pointer; color: #333;",
    });
    cancelBtn.addEventListener("click", () => {
      document.body.removeChild(modal);
    });
    const submitBtn = this.designer.createElement("button", {
      textContent: title,
      className: "btn btn-primary",
      style:
        "padding: 6px 12px; font-size: 14px; border: 1px solid #1890ff; background: #1890ff; border-radius: 4px; cursor: pointer; color: white;",
    });
    // 提交事件处理
    submitBtn.addEventListener("click", () => {
      const idText = idInput.value.trim();
      const nameText = nameInput.value.trim();
      const descText = descInput.value.trim();
      if (!idText) {
        alert("模板ID不能为空");
        return;
      }
      if (!nameText) {
        alert("请输入模板名称");
        return;
      }
      callback(config, idText, nameText, descText);
      document.body.removeChild(modal);
    });
    footer.appendChild(cancelBtn);
    footer.appendChild(submitBtn);
    // 组装模态框
    container.appendChild(header);
    container.appendChild(content);
    container.appendChild(footer);
    const modal = this.designer.createElement("div");
    modal.appendChild(overlay);
    modal.appendChild(container);
    // 点击遮罩层关闭模态框
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        document.body.removeChild(modal);
      }
    });
    return modal;
  }

  /**
   * 从模板创建组件
   */
  createFromTemplate() {
    const template = this.designer.clipboard.data;
    if (!template) return;
    // 克隆模板中的组件
    const templateComp = JSON.parse(template.config);
    const clonedComp = this.designer.cloneComp(templateComp);
    // 如果当前没有选中组件，则添加到根组件
    const parentComp = this.designer.sldComp || this.designer.root;
    // 设置父组件ID
    clonedComp.parentId = parentComp.id;
    // 添加到父组件的子组件中
    parentComp.children.push(clonedComp);
    // 更新组件映射
    this.designer.initCompMap(clonedComp);
    // 更新组件树
    this.designer.compTreePanel.renderCompTree();
    // 重新渲染预览
    this.designer.renderPreview();
  }

  /**
   * 初始化模板列表
   */
  query() {
    Http.request(
      "http://localhost:8080/api/components",
      "GET",
      null,
      (data) => {
        this.designer.templates = data;
        this.renderList();
      }
    );
  }

  /**
   * 保存模板配置
   * @param {*} comp 模板组件
   * @param {*} id 模板ID
   * @param {*} name 模板名称
   * @param {*} desc 模板描述
   */
  save(comp, id, name, desc) {
    // 创建模板对象
    Http.request(
      "http://localhost:8080/api/components",
      "POST",
      {
        id: id,
        name: name,
        description: desc,
        config: JSON.stringify(comp),
      },
      (data) => {
        this.query();
        alert("模板保存成功");
      }
    );
  }

  /**
   * 编辑模板
   * @param {*} comp 模板组件
   * @param {*} id 模板ID
   * @param {*} name 模板名称
   * @param {*} desc 模板描述
   */
  edit(comp, id, name, desc) {
    // 发送到服务器更新
    Http.request(
      "http://localhost:8080/api/components/" + id,
      "PUT",
      {
        id: id,
        name: name,
        description: desc,
        config: comp,
      },
      (data) => {
        // 更新模板列表显示
        alert("模板更新成功");
        this.query();
      }
    );
  }

  /**
   * 删除模板
   * @param {*} templateId 模板ID
   */
  delete(templateId) {
    if (!confirm("确定要删除这个模板吗？")) {
      return;
    }
    // 从服务器删除
    Http.request(
      "http://localhost:8080/api/components/" + templateId,
      "DELETE",
      null,
      (data) => {
        alert("模板删除成功");
        // 更新模板列表显示
        this.query();
      }
    );
  }
}
