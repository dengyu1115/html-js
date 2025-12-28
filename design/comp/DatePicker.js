import Base from "./Base.js";

/**
 * 日期组件
 */
export default class DatePicker extends Base {
  // 获取日期组件类型定义
  static getDef() {
    return {
      name: "日期选择",
      props: {
        className: "component date",
        value: "",
        placeholder: "请选择日期",
        dateFormat: "yyyy-MM-dd",
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
                defVal: "请选择日期",
                inputType: "text",
              },
            ],
            [
              {
                type: "input",
                prop: "dateFormat",
                label: "日期格式",
                defVal: "yyyy-MM-dd",
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
