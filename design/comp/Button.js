import Base from "./Base.js";

/**
 * 按钮组件配置
 */
export default class Button extends Base {
  /**
   * 获取按钮组件类型定义
   * @returns 组件类型定义
   */
  static getDef() {
    return {
      name: "按钮",
      props: {
        className: "component button",
        text: "按钮",
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
      events: { click: "" },
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
                prop: "text",
                label: "按钮文本",
                defVal: "",
                inputType: "text",
              },
            ],
          ],
        },
      ],
      configStyles: ["font", "size", "border", "spacing", "alignment"],
      configEvents: ["click"],
      configData: [
        {
          prop: "text",
          pathLabel: "文本绑定",
          noData: true,
          callback: "refreshText",
        },
        {
          prop: "show",
          pathLabel: "显示绑定",
          noData: true,
          callback: "refreshShow",
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
