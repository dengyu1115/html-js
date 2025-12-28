import Base from "./Base.js";

/**
 * 图表组件
 */
export default class LineChart extends Base {
  // 获取图表组件类型定义
  static getDef() {
    return {
      name: "图表",
      props: {
        className: "component line-chart",
        legendPos: "top",
        yIndices: [
          {
            prop: "sales",
            title: "销售量",
            unit: "元",
            showUnit: "true",
            position: "left",
          },
          {
            prop: "ratio",
            title: "增长率",
            unit: "%",
            showUnit: "true",
            position: "right",
          },
        ],
        legends: [
          {
            prop: "c1",
            type: "bar",
            label: "数据1",
            color: "#f1293a",
            yIndex: "sales",
          },
          {
            prop: "c2",
            type: "line",
            label: "数据2",
            color: "#17e732",
            yIndex: "ratio",
          },
          {
            prop: "c3",
            type: "area",
            label: "数据3",
            color: "#3c57f5",
            yIndex: "sales",
          },
        ],
      },
      styles: {
        width: "100%",
        height: "100%",
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
        data: {
          data: {
            labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
            data: [
              { c1: 100, c2: 80, c3: 180 },
              { c1: 150, c2: 100, c3: 200 },
              { c1: 80, c2: 50, c3: 150 },
              { c1: 120, c2: 100, c3: 100 },
              { c1: 180, c2: 30, c3: 80 },
              { c1: 200, c2: 20, c3: 220 },
            ],
          },
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
                label: "标题",
                defVal: "",
                inputType: "text",
              },
            ],
          ],
        },
        {
          type: "list",
          prop: "yIndices",
          config: [
            [
              {
                type: "input",
                prop: "title",
                label: "Y轴标题",
                defVal: "",
                inputType: "text",
              },
              {
                type: "input",
                prop: "prop",
                label: "Y轴属性",
                defVal: "y",
                inputType: "text",
              },
            ],
            [
              {
                type: "select",
                prop: "showUnit",
                label: "展示单位",
                options: [
                  { label: "是", prop: "true" },
                  { label: "否", prop: "false" },
                ],
              },
              {
                type: "input",
                prop: "unit",
                label: "Y轴单位",
                inputType: "text",
                defVal: "",
              },
            ],
            [
              {
                type: "select",
                prop: "position",
                label: "Y轴位置",
                options: [
                  { label: "左", prop: "left" },
                  { label: "右", prop: "right" },
                ],
              },
              {
                type: "input",
                prop: "width",
                label: "宽度",
                defVal: "80",
                inputType: "number",
              },
            ],
            [
              {
                type: "textarea",
                prop: "formatter",
                label: "格式化",
                rows: 5,
                defVal: "",
              },
            ],
          ],
          defVal: {
            title: "",
            prop: "y",
            unit: "",
            showUnit: "true",
            position: "left",
            zeroStart: "false",
          },
        },
        {
          type: "list",
          prop: "legends",
          config: [
            [
              {
                type: "input",
                prop: "prop",
                label: "数据属性",
                defVal: "c1",
                inputType: "text",
              },
              {
                type: "input",
                prop: "label",
                label: "图例标签",
                defVal: "标签1",
                inputType: "text",
              },
              {
                type: "input",
                prop: "yIndex",
                label: "绑定Y轴",
                defVal: "y",
                inputType: "text",
              },
            ],
            [
              {
                type: "select",
                prop: "type",
                label: "图例类型",
                options: [
                  { label: "柱状图", prop: "bar" },
                  { label: "折线图", prop: "line" },
                  { label: "面积图", prop: "area" },
                ],
              },
              {
                type: "input",
                prop: "color",
                label: "图例颜色",
                inputType: "color",
                defVal: "#0964ecff",
              },
            ],
          ],
          defVal: {
            prop: "c1",
            type: "bar",
            yIndex: "y",
            label: "数据1",
            color: "#3e8ed0",
          },
        },
      ],
      configStyles: ["size", "border", "spacing"],
      configEvents: [],
      configData: [
        {
          pathLabel: "配置路径",
          dataLbel: "配置数据",
          prop: "config",
          callback: "refreshConfig",
        },
        {
          pathLabel: "数据路径",
          dataLbel: "数据",
          prop: "data",
          callback: "refreshData",
        },
      ],
    };
  }
}
