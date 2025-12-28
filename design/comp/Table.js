import Base from "./Base.js";

/**
 * 表格组件
 */
export default class Table extends Base {
  // 获取表格组件类型定义
  static getDef() {
    return {
      name: "表格",
      props: {
        className: "component table",
        headerColor: "#ffffff",
        bodyColor: "#ffffff",
        bodyRows: "10",
        columns: [
          { label: "列1", prop: "c1", width: "100px", sort: "true" },
          { label: "列2", prop: "c2", width: "100px" },
          { label: "列3", prop: "c3", width: "100px" },
        ],
        buttons: [],
        bindings: [],
      },
      styles: {
        borderWidth: "1px",
        borderColor: "#bebaba",
        borderStyle: "solid",
        borderRadius: "3px",
        overflow: "auto",
        margin: "0px",
        padding: "0px",
        width: "100%",
        height: "100%",
      },
      events: {},
      data: {
        rows: {
          path: "",
          data: [
            { c1: "数据1-1", c2: "数据1-2", c3: "数据1-3" },
            { c1: "数据2-1", c2: "数据2-2", c3: "数据2-3" },
            { c1: "数据3-1", c2: "数据3-2", c3: "数据3-3" },
            { c1: "数据4-1", c2: "数据4-2", c3: "数据4-3" },
          ],
        },
      },
      configProps: [
        {
          config: [
            [
              {
                type: "input",
                prop: "className",
                label: "样式类名",
                defVal: "",
                inputType: "text",
              },
            ],
            [
              {
                type: "select",
                prop: "stickyHeader",
                label: "表头固定",
                options: [
                  { label: "否", prop: "false" },
                  { label: "是", prop: "true" },
                ],
              },
              {
                type: "input",
                prop: "headerColor",
                label: "表头颜色",
                defVal: "",
                inputType: "color",
              },
            ],
            [
              {
                type: "input",
                prop: "bodyRows",
                label: "表体行数",
                defVal: "10",
                inputType: "number",
              },
              {
                type: "input",
                prop: "bodyColor",
                label: "表体颜色",
                defVal: "",
                inputType: "color",
              },
            ],
          ],
        },
        {
          title: "列信息",
          type: "list",
          prop: "columns",
          config: [
            [
              {
                type: "input",
                prop: "label",
                label: "列名",
                defVal: "",
                inputType: "text",
              },
              {
                type: "input",
                prop: "prop",
                label: "属性",
                defVal: "",
                inputType: "text",
              },
            ],
            [
              {
                type: "select",
                prop: "alignTh",
                label: "表头排布",
                options: [
                  { label: "无", prop: "" },
                  { label: "左对齐", prop: "start" },
                  { label: "居中", prop: "center" },
                  { label: "右对齐", prop: "end" },
                ],
              },
              {
                type: "select",
                prop: "alignTd",
                label: "数据排布",
                options: [
                  { label: "无", prop: "" },
                  { label: "左对齐", prop: "start" },
                  { label: "居中", prop: "center" },
                  { label: "右对齐", prop: "end" },
                ],
              },
              {
                type: "select",
                prop: "sticky",
                label: "列固定",
                options: [
                  { label: "无", prop: "" },
                  { label: "左", prop: "left" },
                  { label: "右", prop: "right" },
                ],
              },
            ],
            [
              {
                type: "input",
                prop: "width",
                label: "宽度",
                defVal: "",
                inputType: "text",
              },
              {
                type: "select",
                prop: "sort",
                label: "点击排序",
                options: [
                  { label: "否", prop: "false" },
                  { label: "是", prop: "true" },
                ],
              },
            ],
            [
              {
                type: "textarea",
                prop: "click",
                label: "点击事件",
                defVal: "",
                rows: 5,
              },
            ],
            [
              {
                type: "textarea",
                prop: "format",
                label: "格式化",
                defVal: "",
                rows: 3,
              },
            ],
          ],
          child: "children",
          defVal: { label: "新列", prop: "cn", width: "100px" },
        },
        {
          title: "按钮信息",
          type: "list",
          prop: "buttons",
          config: [
            [
              {
                type: "input",
                prop: "label",
                label: "名称",
                defVal: "",
                inputType: "text",
              },
              {
                type: "input",
                prop: "prop",
                label: "属性",
                defVal: "",
                inputType: "text",
              },
              {
                type: "select",
                prop: "style",
                label: "风格",
                options: [
                  { label: "默认", prop: "default" },
                  { label: "文本", prop: "text" },
                  { label: "主要", prop: "primary" },
                  { label: "成功", prop: "success" },
                  { label: "危险", prop: "danger" },
                ],
              },
            ],
            [
              {
                type: "textarea",
                prop: "click",
                label: "点击事件",
                defVal: "",
              },
            ],
          ],
          defVal: { label: "测试", prop: "test", style: "default", click: "" },
        },
        {
          title: "按钮绑定",
          type: "list",
          prop: "bindings",
          config: [
            [
              {
                type: "input",
                prop: "prop",
                label: "属性",
                defVal: "",
                inputType: "text",
              },
              {
                type: "input",
                prop: "buttons",
                label: "按钮集合",
                defVal: "",
                inputType: "text",
              },
            ],
          ],
          defVal: { prop: "c1", buttons: "test" },
        },
      ],
      configStyles: ["size", "border", "spacing"],
      configEvents: [],
      configData: [
        {
          label: "行数据",
          prop: "rows",
          callback: "refreshTbody",
        },
        {
          label: "列数据",
          prop: "columns",
          callback: "refreshTable",
        },
      ],
    };
  }
}
