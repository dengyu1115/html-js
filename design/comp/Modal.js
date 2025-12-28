import Base from "./Base.js";

/**
 * 模态框组件配置
 */
export default class Modal extends Base {
  /**
   * 获取模态框组件类型定义
   * @returns 组件类型定义
   */
  static getDef() {
    return {
      name: "模态框",
      props: {
        className: "component modal",
      },
      styles: {
        width: "50%",
        height: "50%",
        backgroundColor: "#ffffff",
        borderWidth: "1px",
        borderColor: "#bebaba",
        borderStyle: "solid",
        borderRadius: "5px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        zIndex: "1000",
      },
      events: {},
      data: {
        show: {
          path: "",
          data: false,
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
                type: "input",
                prop: "prop",
                label: "数据属性",
                defVal: "",
                inputType: "text",
              },
            ],
          ],
        },
      ],
      configStyles: ["size", "border"],
      configData: [
        {
          label: "是否展示",
          prop: "show",
          callback: "refreshShow",
        },
      ],
      configChildren: [
        "container",
        "panel",
        "text",
        "input",
        "select",
        "radio",
        "checkbox",
        "button",
        "table",
        "tree",
        "linechart",
        "klinechart",
      ],
    };
  }
}
