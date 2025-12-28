import Base from "./Base.js";

/**
 * 树形组件
 */
export default class Tree extends Base {
  // 组件定义
  static getDef() {
    return {
      type: "tree",
      name: "树",
      props: {
        className: "component tree",
        nodes: [
          {
            label: "节点1",
            value: "1",
            children: [
              {
                label: "子节点1-1",
                value: "1-1",
              },
              {
                label: "子节点1-2",
                value: "1-2",
                children: [
                  {
                    label: "孙节点1-2-1",
                    value: "1-2-1",
                  },
                ],
              },
            ],
          },
          {
            label: "节点2",
            value: "2",
          },
        ],
      },
      styles: {
        width: "300px",
        height: "400px",
        padding: "10px",
        borderWidth: "1px",
        borderColor: "#ddd",
        borderStyle: "solid",
        borderRadius: "4px",
      },
      events: {},
      data: null,
      configStyles: ["font", "size", "border", "spacing", "alignment"],
      configEvents: ["change"],
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
        {
          type: "list",
          prop: "nodes",
          config: [
            [
              {
                type: "input",
                prop: "label",
                label: "标签",
                defVal: "新节点",
                inputType: "text",
              },
              {
                type: "input",
                prop: "value",
                label: "值",
                defVal: "",
                inputType: "text",
              },
            ],
          ],
          child: "children",
          defVal: {
            label: "新节点",
            value: "new_node",
          },
        },
      ],
      configData: [
        {
          noData: true,
          pathLabel: "节点数据路径",
          prop: "nodes",
          callback: "refreshTree",
        },
      ],
    };
  }
}
