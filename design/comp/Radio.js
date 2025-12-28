import Base from "./Base.js";

/**
 * 单选框
 */
export default class Radio extends Base {
  // 组件定义
  static getDef() {
    return {
      type: "radio",
      name: "单选框",
      props: {
        className: "component radio",
        name: "radio1",
        options: [
          { label: "选项1", value: "1" },
          { label: "选项2", value: "2" },
        ],
      },
      styles: {
        gridAutoFlow: "column",
      },
      events: {},
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
                type: "input",
                prop: "name",
                label: "组名",
                defVal: "",
                inputType: "text",
              },
              {
                type: "input",
                prop: "prop",
                label: "数据属性",
                defVal: "",
                inputType: "text",
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
            ],
            [
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
          },
        },
      ],
      configStyles: ["size", "border", "spacing", "alignment"],
      configEvents: ["change"],
      configData: [
        { label: "选项数据", prop: "options", callback: "refreshOptions" },
        { label: "选中数据", prop: "value", callback: "refreshValue" },
      ],
    };
  }
}
