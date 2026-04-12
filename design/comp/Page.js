import Base from "./Base.js";

/**
 * 页面配置
 */
export default class Page extends Base {
  /**
   * 获取页面组件配置定义
   * @returns 配置定义
   */
  static getDef() {
    return {
      name: "页面",
      props: {
        className: "component page",
        pageId: "page0001",
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
        width: "1280px",
        height: "768px",
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
                prop: "pageId",
                label: "页面ID",
                defVal: "",
                inputType: "text",
              },
            ],
          ],
        },
      ],
      configStyles: ["direction", "size", "border", "spacing", "alignment"],
      configEvents: ["load"],
      configData: [
        {
          label: "页面全局数据",
          prop: "global",
          noPath: true,
        },
      ],
      data: {},
      configChildren: [
        "container",
        "modal",
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
    };
  }
}
