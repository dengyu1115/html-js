import Base from "./Base.js";

/**
 * 文本组件
 */
export default class Text extends Base {
  // 获取文本组件类型定义
  static getDef() {
    return {
      name: "文本",
      props: {
        className: "component text",
        text: "文本内容",
        tag: "div",
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
      events: { click: "" },
      data: {
        text: {
          path: "",
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
                prop: "text",
                label: "文本内容",
                defVal: "",
                inputType: "text",
              },
              {
                type: "input",
                prop: "tag",
                label: "HTML标签",
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
          pathLabel: "文本绑定",
          prop: "text",
          noData: true,
          callback: "refreshText",
        },
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
