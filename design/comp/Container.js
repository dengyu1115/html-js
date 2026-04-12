import Base from "./Base.js";

/**
 * 容器组件配置
 */
export default class Container extends Base {
  /**
   * 获取容器组件类型定义
   * @returns 组件类型定义
   */
  static getDef() {
    return {
      name: "容器",
      props: {
        className: "component container",
        tag: "div",
        show: "true",
      },
      styles: {
        gridAutoFlow: "column",
        borderWidth: "1px",
        borderColor: "#bebaba",
        borderStyle: "solid",
        borderRadius: "3px",
        overflow: "auto",
        margin: "0px",
        width: "50%",
        height: "50%",
        padding: "0px",
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
          ],
        },
      ],
      configStyles: ["direction", "size", "border", "spacing", "alignment"],
      configEvents: [],
      configChildren: [
        "container",
        "panel",
        "text",
        "input",
        "textarea",
        "date",
        "time",
        "select",
        "radio",
        "checkbox",
        "button",
        "table",
        "tree",
        "linechart",
        "klinechart",
        "tabheader",
        "tabbody",
      ],
      configData: [
        {
          prop: "show",
          pathLabel: "显示绑定",
          noData: true,
          callback: "refreshShow",
        },
      ],
    };
  }
}
