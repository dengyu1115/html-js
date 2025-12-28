import Base from "./Base.js";

/**
 * 面板组件
 */
export default class Panel extends Base {
  // 获取面板组件类型定义
  static getDef() {
    return {
      name: "面板",
      props: {
        className: "component panel",
        title: "面板标题",
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
      data: {
        show: {
          path: "",
          data: true,
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
                prop: "title",
                label: "面板标题",
                defVal: "",
                inputType: "text",
              },
            ],
          ],
        },
      ],
      configStyles: ["direction", "size", "border", "spacing", "alignment"],
      configEvents: [],
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
        "tabheader",
        "tabbody",
      ],
    };
  }
}
