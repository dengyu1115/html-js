/**
 * 组件配置基类
 */
export default class Base {
  /**
   * 获取组件类型定义
   */
  static getDef() {
    throw new Error("getDef method must be implemented by subclasses");
  }
}
