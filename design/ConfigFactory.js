import compDefs from "./compDefs.json" with { type: "json" };

export default class ConfigFactory {
  static getDef(type) {
    const def = compDefs[type];
    if (!def) {
      throw new Error(`Unknown component type: ${type}`);
    }
    return def;
  }
}