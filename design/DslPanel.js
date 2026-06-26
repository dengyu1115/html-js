import Http from "../util/Http.js";
import { API_PAGE_CONFIGS } from "./api.js";
import { createElement } from "./utils/dom.js";
import { initCompMap, getMaxCompId } from "./utils/clone.js";

export default class DslPanel {
  constructor({ state, actions }) {
    this.state = state;
    this.actions = actions;
    this.elements = {};
  }

  createPanel() {
    const panel = createElement("div", {
      id: "dslPanel",
      className: "panel hidden",
    });

    this.elements.dslContent = createElement("textarea", {
      id: "dslContent",
      readOnly: true,
    });
    panel.appendChild(this.elements.dslContent);

    const dslBtns = createElement("div", { className: "btns" });

    const actions = [
      { id: "select", text: "查询", handler: () => this._query() },
      { id: "save", text: "保存", handler: () => this._save() },
      { id: "update", text: "更新", handler: () => this._update() },
      { id: "delete", text: "删除", handler: () => this._delete() },
    ];

    actions.forEach((action) => {
      const btn = createElement("button", {
        className: "btn",
        id: action.id,
        textContent: action.text,
      });
      btn.addEventListener("click", action.handler);
      dslBtns.appendChild(btn);
    });

    panel.appendChild(dslBtns);
    return panel;
  }

  updateDslContent() {
    if (this.state.root) {
      this.elements.dslContent.value = JSON.stringify(this.state.root, null, 2);
    }
  }

  _getPageId() {
    return this.state.root?.props?.pageId;
  }

  _request(method, onSuccess) {
    const pageId = this._getPageId();
    if (!pageId) return;

    const url = method === "POST"
      ? API_PAGE_CONFIGS
      : `${API_PAGE_CONFIGS}/${pageId}`;

    const body = method === "GET" || method === "DELETE" ? null : {
      id: pageId,
      name: pageId,
      config: JSON.stringify(this.state.root),
    };

    Http.request(url, method, body, onSuccess);
  }

  _query() {
    this._request("GET", (data) => {
      if (!data.config) return;
      this.state.root = JSON.parse(data.config);
      this.state.compCount = getMaxCompId(this.state.root);
      this.state.compMap = {};
      initCompMap(this.state.root, this.state.compMap);
      this.state.sldComp = this.state.root;
      this.actions.loadData(this.state.root);
      this.actions.refreshTree();
      this.actions.renderPreview();
    });
  }

  _save() {
    this._request("POST", () => alert("保存成功"));
  }

  _update() {
    this._request("PUT", () => alert("更新成功"));
  }

  _delete() {
    if (!confirm("确定要删除该页面配置吗？")) return;
    this._request("DELETE", () => {
      alert("删除成功");
      this.state.root = null;
      this.state.compCount = 0;
      this.state.compMap = {};
      this.state.sldComp = null;
      this.actions.refreshTree();
      this.actions.clearPreview();
      this.actions.clearDslContent();
    });
  }
}