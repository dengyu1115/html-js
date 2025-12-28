import ConfigFactory from "./ConfigFactory.js";
import FormRender from "./FormRender.js";

/**
 * 样式展示
 */
export default class StyleRender {
  constructor(component, designer) {
    this.designer = designer;
    this.defList = ConfigFactory.getDef(component.type).configStyles;
    this.styles = component.styles;
    this.defMap = this.buildDefMap();
  }

  /**
   * 展示
   * @returns 展示内容
   */
  render() {
    if (!this.defList) {
      return [];
    }
    // 解析组件配置类的样式属性
    return this.defList.flatMap((i) =>
      new FormRender(this.designer, this.styles).render(this.defMap[i])
    );
  }

  /**
   * 构建全部可用的样式配置集合
   * @returns 样式配置集合
   */
  buildDefMap() {
    return {
      direction: [
        [
          {
            type: "select",
            prop: "gridAutoFlow",
            label: "子元素排列方向",
            options: [
              { label: "水平排列", prop: "column" },
              { label: "垂直排列", prop: "row" },
            ],
          },
        ],
      ],
      size: [
        [
          {
            type: "input",
            prop: "width",
            label: "宽度",
            defVal: "",
            inputType: "text",
          },
          {
            type: "input",
            prop: "height",
            label: "高度",
            defVal: "",
            inputType: "text",
          },
        ],
      ],
      border: [
        [
          {
            type: "input",
            prop: "borderWidth",
            label: "边框大小",
            defVal: "",
            inputType: "text",
          },
          {
            type: "input",
            prop: "borderColor",
            label: "边框颜色",
            defVal: "#000000",
            inputType: "color",
          },
        ],
        [
          {
            type: "select",
            prop: "borderStyle",
            label: "边框样式",
            options: [
              { label: "无", prop: "" },
              { label: "实线", prop: "solid" },
              { label: "虚线", prop: "dashed" },
              { label: "点线", prop: "dotted" },
            ],
          },
          {
            type: "input",
            prop: "borderRadius",
            label: "圆角大小",
            defVal: "",
            inputType: "text",
          },
        ],
      ],
      spacing: [
        [
          {
            type: "input",
            prop: "margin",
            label: "外边距",
            defVal: "",
            inputType: "text",
          },
          {
            type: "input",
            prop: "padding",
            label: "内边距",
            defVal: "",
            inputType: "text",
          },
        ],
      ],
      alignment: [
        [
          {
            type: "select",
            prop: "alignH",
            label: "水平对齐",
            options: [
              { label: "无", prop: "" },
              { label: "左对齐", prop: "start" },
              { label: "居中", prop: "center" },
              { label: "右对齐", prop: "end" },
            ],
          },
          {
            type: "select",
            prop: "alignV",
            label: "垂直对齐",
            options: [
              { label: "无", prop: "" },
              { label: "顶部", prop: "start" },
              { label: "居中", prop: "center" },
              { label: "底部", prop: "end" },
            ],
          },
        ],
        [
          {
            type: "select",
            prop: "textAlign",
            label: "文本对齐",
            options: [
              { label: "无", prop: "" },
              { label: "左对齐", prop: "start" },
              { label: "居中", prop: "center" },
              { label: "右对齐", prop: "end" },
            ],
          },
          {
            type: "select",
            prop: "overflow",
            label: "内容超出",
            options: [
              { label: "默认", prop: "" },
              { label: "可见", prop: "visible" },
              { label: "隐藏", prop: "hidden" },
              { label: "滚动", prop: "overlay" },
              { label: "自动", prop: "auto" },
            ],
          },
        ],
      ],
      font: [
        [
          {
            type: "input",
            prop: "fontSize",
            label: "字体大小",
            defVal: "",
            inputType: "text",
          },
          {
            type: "input",
            prop: "color",
            label: "字体颜色",
            defVal: "#000000",
            inputType: "color",
          },
        ],
        [
          {
            type: "select",
            prop: "borderStyle",
            label: "字体样式",
            options: [
              { label: "默认", prop: "" },
              { label: "正常", prop: "normal" },
              { label: "粗体", prop: "bold" },
              { label: "比父级粗", prop: "bolder" },
              { label: "比父级细", prop: "lighter" },
            ],
          },
          {
            type: "input",
            prop: "backgroundColor",
            label: "背景颜色",
            defVal: "#FFFFFF",
            inputType: "color",
          },
        ],
      ],
    };
  }
}
