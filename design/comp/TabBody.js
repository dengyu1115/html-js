import Base from "./Base.js";

/**
 * Tab内容区组件配置
 */
export default class TabBody extends Base {
  /**
   * 获取Tab内容区组件类型定义
   * @returns 组件类型定义
   */
  static getDef() {
    return {
      name: "Tab内容区",
      props: {
        className: "component tab-body",
        prop: "",
      },
      styles: {
        gridAutoFlow: "column",
        borderWidth: "1px",
        borderColor: "#bebaba",
        borderStyle: "solid",
        borderRadius: "3px",
        overflow: "auto",
        margin: "0px",
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
      configChildren: ["container"],
      configData: [
        {
          pathLabel: "激活路径",
          noData: false,
          prop: "active",
          callback: "refreshActive",
        },
      ],
    };
  }
}
