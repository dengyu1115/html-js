import Base from "./Base.js";

/**
 * 多行输入框
 */
export default class TextArea extends Base {
  // 获取多行输入框组件类型定义
  static getDef() {
    return {
      name: "文本域",
      props: {
        className: "component textarea",
        value: "",
        placeholder: "请输入内容",
        rows: 3,
        cols: 20,
        readonly: "false",
        disabled: "false",
        maxlength: "",
        minlength: ""
      },
      styles: {
        borderWidth: "1px",
        borderColor: "#bebaba",
        borderStyle: "solid",
        borderRadius: "3px",
        overflow: "auto",
        margin: "0px",
        padding: "5px",
        resize: "vertical"
      },
      events: { input: "", focus: "", blur: "", change: "" },
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
                label: "占位符",
                defVal: "",
                inputType: "text",
              },
            ],
            [
              {
                type: "input",
                prop: "rows",
                label: "行数",
                defVal: "3",
                inputType: "number",
              },
              {
                type: "input",
                prop: "cols",
                label: "列数",
                defVal: "20",
                inputType: "number",
              },
            ],
            [
              {
                type: "input",
                prop: "maxlength",
                label: "最大长度",
                defVal: "",
                inputType: "number",
              },
              {
                type: "input",
                prop: "minlength",
                label: "最小长度",
                defVal: "",
                inputType: "number",
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
      configEvents: ["input", "focus", "blur", "change"],
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