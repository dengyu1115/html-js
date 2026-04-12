import Base from "./Base.js";

/**
 * 下拉框
 */
export default class Select extends Base {
  // 获取下拉选项组件类型定义
  static getDef() {
    return {
      name: "下拉框",
      props: {
        className: "component select",
        options: [
          { label: "选项1", value: "1" },
          { label: "选项2", value: "2" },
          { label: "选项3", value: "3" },
        ],
        multiple: "false",
        readOnly: "false",
      },
      styles: {
        width: "100px",
        height: "30px",
        gridAutoFlow: "column",
        borderWidth: "1px",
        borderColor: "#bebaba",
        borderStyle: "solid",
        borderRadius: "3px",
        overflow: "auto",
        margin: "0px",
        padding: "0px",
      },
      events: { change: "" },
      data: {
        value: { path: "", data: null },
        options: { path: "", data: null },
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
                prop: "multiple",
                label: "是否多选",
                options: [
                  { label: "否", prop: "false" },
                  { label: "是", prop: "true" },
                ],
              },
            ],
            [
              {
                type: "select",
                prop: "readOnly",
                label: "是否只读",
                options: [
                  { label: "否", prop: "false" },
                  { label: "是", prop: "true" },
                ],
              },
            ],
          ],
        },
        {
          type: "list",
          prop: "options",
          config: [
            [
              {
                type: "input",
                prop: "label",
                label: "标签",
                defVal: "",
                inputType: "text",
              },
              {
                type: "input",
                prop: "value",
                label: "值",
                defVal: "",
                inputType: "text",
              },
              {
                type: "select",
                prop: "disabled",
                label: "禁用",
                options: [
                  { label: "否", prop: "false" },
                  { label: "是", prop: "true" },
                ],
              },
            ],
          ],
          defVal: {
            label: "新选项",
            value: "new_option",
            disabled: "false",
            selected: "false",
          },
        },
      ],
      configStyles: ["size", "border", "spacing", "alignment"],
      configEvents: ["change"],
      configData: [
        { label: "选项数据", prop: "options", callback: "refreshOptions" },
        { label: "选中数据", prop: "value", callback: "refreshValue" },
        {
          prop: "readOnly",
          pathLabel: "只读绑定",
          noData: true,
          callback: "refreshReadOnly",
        },
      ],
    };
  }
}
