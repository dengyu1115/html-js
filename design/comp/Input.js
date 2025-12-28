import Base from "./Base.js";

/**
 * 输入框
 */
export default class Input extends Base {
  // 获取文本组件类型定义
  static getDef() {
    return {
      name: "输入框",
      props: {
        className: "component input",
        value: "",
        placeholder: "请输入内容",
        type: "text",
        readonly: "false",
        disabled: "false",
      },
      styles: {
        borderWidth: "1px",
        borderColor: "#bebaba",
        borderStyle: "solid",
        borderRadius: "3px",
        overflow: "auto",
        margin: "0px",
        padding: "0px",
      },
      events: { input: "", focus: "", blur: "" },
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
                prop: "type",
                label: "类型",
                options: [
                  { label: "文本", prop: "text" },
                  { label: "数字", prop: "number" },
                  { label: "密码", prop: "password" },
                  { label: "颜色", prop: "color" },
                ],
              },
            ],
            [
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
                type: "input",
                prop: "placeholder",
                label: "placeholder",
                defVal: "",
                inputType: "text",
              },
            ],
            [
              {
                type: "select",
                prop: "readOnly",
                label: "只读",
                options: [
                  { label: "否", prop: "false" },
                  { label: "是", prop: "true" },
                ],
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
        },
      ],
      configStyles: ["font", "size", "border", "spacing", "alignment"],
      configEvents: ["input", "focus", "blur"],
      configData: [
        {
          prop: "value",
          pathLabel: "数据绑定",
          noData: true,
          callback: "refreshValue",
        },
        {
          prop: "show",
          pathLabel: "显示绑定",
          noData: true,
          callback: "refreshShow",
        },
        {
          prop: "readOnly",
          pathLabel: "只读绑定",
          noData: true,
          callback: "refreshReadOnly",
        },
        {
          prop: "disabled",
          pathLabel: "禁用绑定",
          noData: true,
          callback: "refreshDisabled",
        },
      ],
    };
  }
}
