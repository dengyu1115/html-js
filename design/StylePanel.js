import ConfigFactory from "./ConfigFactory.js";
import FormRenderer from "./FormRenderer.js";
import STYLE_CONFIG_MAP from "./styleConfig.json" with { type: "json" };

export default class StylePanel {
  constructor(component, onChange) {
    this.onChange = onChange;
    this.defList = ConfigFactory.getDef(component.type).configStyles;
    this.styles = component.styles;
  }

  render() {
    if (!this.defList) {
      return [];
    }
    return this.defList.flatMap((key) =>
      new FormRenderer(this.styles, () => this.onChange()).render(STYLE_CONFIG_MAP[key])
    );
  }
}