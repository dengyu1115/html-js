import Base from "./Base.js";

/**
 * 图表组件
 */
export default class KlineChart extends Base {
  // 获取图表组件类型定义
  static getDef() {
    return {
      name: "K线图",
      props: {
        className: "component kline-chart",
        title: "",
        maList: [
          { title: "5日均线", prop: "ma5", color: "#ff9900" },
          { title: "10日均线", prop: "ma10", color: "#9900ff" },
          { title: "30日均线", prop: "ma30", color: "#0099ff" },
          { title: "60日均线", prop: "ma60", color: "#ff00ff" },
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
            labels: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
            ],
            data: [
              {
                open: 10,
                latest: 20,
                high: 30,
                low: 5,
                share: 10,
                amount: 300,
              },
              {
                open: 20,
                latest: 15,
                high: 25,
                low: 10,
                share: 20,
                amount: 500,
              },
              {
                open: 15,
                latest: 20,
                high: 25,
                low: 5,
                share: 30,
                amount: 700,
              },
              {
                open: 20,
                latest: 10,
                high: 25,
                low: 5,
                share: 40,
                amount: 900,
              },
              {
                open: 10,
                latest: 15,
                high: 20,
                low: 5,
                share: 50,
                amount: 1100,
              },
              {
                open: 15,
                latest: 20,
                high: 25,
                low: 5,
                share: 60,
                amount: 1300,
              },
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
            [
              {
                type: "textarea",
                prop: "klineFormatter",
                label: "K线格式化",
                rows: 5,
                defVal: "",
              },
            ],
            [
              {
                type: "textarea",
                prop: "shareFormatter",
                label: "成交量格式化",
                rows: 5,
                defVal: "",
              },
            ],
            [
              {
                type: "textarea",
                prop: "amountFormatter",
                label: "成交额格式化",
                rows: 5,
                defVal: "",
              },
            ],
          ],
        },
        {
          type: "list",
          prop: "maList",
          config: [
            [
              {
                type: "input",
                prop: "title",
                label: "均线标题",
                defVal: "",
                inputType: "text",
              },
              {
                type: "input",
                prop: "prop",
                label: "均线属性",
                defVal: "",
                inputType: "text",
              },
              {
                type: "input",
                prop: "color",
                label: "均线颜色",
                inputType: "color",
                defVal: "",
              },
            ],
          ],
          defVal: {
            title: "",
            prop: "",
            color: "",
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
