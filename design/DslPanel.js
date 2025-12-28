import Http from "../util/Http.js";

/**
 * DSL面板
 */
export default class DslPanel {
  constructor(designer) {
    this.designer = designer;
    this.elements = {};
  }

  /**
   * 创建DSL面板
   * @returns DSL面板元素
   */
  createPanel() {
    const panel = this.designer.createElement("div", {
      id: "dslPanel",
      className: "panel hidden",
    });
    // 保存代码输出区域引用
    this.elements.dslContent = this.designer.createElement("textarea", {
      id: "dslContent",
      readOnly: true,
    });
    panel.appendChild(this.elements.dslContent);
    // 创建DSL操作按钮组
    const dslBtns = this.designer.createElement("div", { className: "btns" });
    // 创建查询操作按钮
    const selectBtn = this.designer.createElement("button", {
      className: "btn",
      id: "select",
      textContent: "查询",
    });
    selectBtn.addEventListener("click", () => {
      this.query();
    });
    // 创建保存操作按钮
    const saveBtn = this.designer.createElement("button", {
      className: "btn",
      id: "save",
      textContent: "保存",
    });
    saveBtn.addEventListener("click", () => {
      this.save();
    });
    // 创建更新操作按钮
    const updateBtn = this.designer.createElement("button", {
      className: "btn",
      id: "update",
      textContent: "更新",
    });
    updateBtn.addEventListener("click", () => {
      this.update();
    });
    // 创建删除操作按钮
    const deleteBtn = this.designer.createElement("button", {
      className: "btn",
      id: "delete",
      textContent: "删除",
    });
    deleteBtn.addEventListener("click", () => {
      this.delete();
    });
    dslBtns.appendChild(selectBtn);
    dslBtns.appendChild(saveBtn);
    dslBtns.appendChild(updateBtn);
    dslBtns.appendChild(deleteBtn);
    panel.appendChild(dslBtns);
    return panel;
  }

  /**
   * 更新DSL内容显示
   */
  updateDslContent() {
    this.elements.dslContent.value = JSON.stringify(this.designer.root, null, 2);
  }
  
  /**
   * 查询页面配置
   */
  query() {
    if (!this.designer.root || !this.designer.root.props || !this.designer.root.props.pageId) {
      return;
    }
    Http.request(
      "http://localhost:8080/api/page-configs/" + this.designer.root.props.pageId,
      "GET",
      null,
      (data) => {
        if (!data.config) {
          return;
        }
        this.designer.root = JSON.parse(data.config);
        this.designer.compCount = this.designer.getCompId(this.designer.root);
        this.designer.compMap = {};
        this.designer.initCompMap(this.designer.root);
        this.designer.sldComp = this.designer.root;
        this.designer.showPropView(this.designer.sldComp);
        // 更新组件树展示
        this.designer.compTreePanel.renderCompTree();
        // 根据当前视图更新显示
        this.designer.renderPreview();
      }
    );
  }

  /**
   * 保存页面配置
   */
  save() {
    if (!this.designer.root || !this.designer.root.props || !this.designer.root.props.pageId) {
      return;
    }
    Http.request(
      "http://localhost:8080/api/page-configs",
      "POST",
      {
        id: this.designer.root.props.pageId,
        name: this.designer.root.props.pageId,
        config: JSON.stringify(this.designer.root),
      },
      (data) => {
        alert("保存成功");
      }
    );
  }

  /**
   * 更新页面配置
   */
  update() {
    if (!this.designer.root || !this.designer.root.props || !this.designer.root.props.pageId) {
      return;
    }
    Http.request(
      "http://localhost:8080/api/page-configs/" + this.designer.root.props.pageId,
      "PUT",
      {
        id: this.designer.root.props.pageId,
        name: this.designer.root.props.pageId,
        config: JSON.stringify(this.designer.root),
      },
      (data) => {
        alert("更新成功");
      }
    );
  }

  /**
   * 删除页面配置
   */
  delete() {
    if (!this.designer.root || !this.designer.root.props || !this.designer.root.props.pageId) {
      return;
    }
    
    if (!confirm("确定要删除该页面配置吗？")) {
      return;
    }
    
    Http.request(
      "http://localhost:8080/api/page-configs/" + this.designer.root.props.pageId,
      "DELETE",
      null,
      (data) => {
        alert("删除成功");
        // 清空当前设计器内容
        this.designer.root = null;
        this.designer.compCount = 0;
        this.designer.compMap = {};
        this.designer.sldComp = null;
        this.designer.showPropView(null);
        this.designer.compTreePanel.renderCompTree();
        this.designer.renderPreview();
      }
    );
  }
}