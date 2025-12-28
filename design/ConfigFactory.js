import Button from "./comp/Button.js";
import LineChart from "./comp/LineChart.js";
import Checkbox from "./comp/Checkbox.js";
import Container from "./comp/Container.js";
import Input from "./comp/Input.js";
import Page from "./comp/Page.js";
import Panel from "./comp/Panel.js";
import Radio from "./comp/Radio.js";
import Select from "./comp/Select.js";
import Table from "./comp/Table.js";
import Text from "./comp/Text.js";
import Tree from "./comp/Tree.js";
import TabHeader from "./comp/TabHeader.js";
import TabBody from "./comp/TabBody.js";
import KlineChart from "./comp/KlineChart.js";
import Modal from "./comp/Modal.js";
import DatePicker from "./comp/DatePicker.js";
import TimePicker from "./comp/TimePicker.js";

/**
 * 配置组件工厂类
 */
export default class ConfigFactory {
  /**
   * 获取配置组件定义
   * @param {*} type 组件类型
   * @returns 配置组件定义
   */
  static getDef(type) {
    switch (type) {
      case "page":
        return Page.getDef();
      case "container":
        return Container.getDef();
      case "modal":
        return Modal.getDef();
      case "text":
        return Text.getDef();
      case "input":
        return Input.getDef();
      case "button":
        return Button.getDef();
      case "panel":
        return Panel.getDef();
      case "select":
        return Select.getDef();
      case "table":
        return Table.getDef();
      case "radio":
        return Radio.getDef();
      case "checkbox":
        return Checkbox.getDef();
      case "tree":
        return Tree.getDef();
      case "linechart":
        return LineChart.getDef();
      case "klinechart":
        return KlineChart.getDef();
      case "tabheader":
        return TabHeader.getDef();
      case "tabbody":
        return TabBody.getDef();
      case "date":
        return DatePicker.getDef();
      case "time":
        return TimePicker.getDef();
      default:
        throw new Error(`Unknown component type: ${type}`);
    }
  }
}