import Base from "./Base.js";

/**
 * 时间组件
 */
export default class TimePicker extends Base {
  // 获取时间组件类型定义
  static getDef() {
    return {
      name: "时间选择",
      props: {
        className: "component time",
        value: "",
        placeholder: "请选择时间",
        timeFormat: "HH:mm:ss",
      },
      styles: {
        width: "150px",
        height: "30px",
        borderWidth: "1px",
        borderColor: "#bebaba",
        borderStyle: "solid",
        borderRadius: "3px",
        overflow: "auto",
        margin: "0px",
        padding: "0px",
      },
      events: { change: "" },
      data: {
        value: { path: "" },
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
                prop: "value",
                label: "默认值",
                defVal: "",
                inputType: "text",
              },
            ],
            [
              {
                type: "input",
                prop: "placeholder",
                label: "占位符",
                defVal: "请选择时间",
                inputType: "text",
              },
            ],
            [
              {
                type: "input",
                prop: "timeFormat",
                label: "时间格式",
                defVal: "HH:mm:ss",
                inputType: "text",
              },
            ],
          ],
        },
      ],
      configStyles: ["size", "border", "spacing", "alignment"],
      configEvents: ["change"],
      configData: [
        {
          prop: "value",
          pathLabel: "数据绑定",
          noData: true,
          callback: "refreshValue",
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