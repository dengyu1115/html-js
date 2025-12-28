import Base from "./Base.js";

/**
 * Tab页头组件配置
 */
export default class TabHeader extends Base {
  /**
   * 获取Tab页头组件类型定义
   * @returns 组件类型定义
   */
  static getDef() {
    return {
      name: "Tab页头",
      props: {
        className: "component tab-header",
        prop: "",
        styleType: "classic", // classic: 经典, card: 卡片, simple: 简约
        tabs: [
          {
            label: "标签1",
            value: "tab1",
            disable: "false",
          },
          {
            label: "标签2",
            value: "tab2",
            disable: "false",
          },
        ],
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
      events: { change: "" },
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
                prop: "styleType",
                label: "按钮风格",
                options: [
                  { label: "经典", prop: "classic" },
                  { label: "卡片", prop: "card" },
                  { label: "简约", prop: "simple" },
                ],
              },
            ],
          ],
        },
        {
          type: "list",
          prop: "tabs",
          config: [
            [
              {
                type: "input",
                prop: "label",
                label: "标签名称",
                defVal: "",
                inputType: "text",
              },
            ],
            [
              {
                type: "input",
                prop: "value",
                label: "标签键值",
                defVal: "",
                inputType: "text",
              },
              {
                type: "select",
                prop: "disable",
                label: "禁用",
                options: [
                  { label: "否", prop: "false" },
                  { label: "是", prop: "true" },
                ],
              },
            ],
          ],
          defVal: {
            label: "新标签",
            value: "new_tab",
            disable: "false",
            active: "false",
          },
        },
      ],
      configStyles: ["direction", "size", "border", "spacing", "alignment"],
      configEvents: ["change"],
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
