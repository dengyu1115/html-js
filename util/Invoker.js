import Id from "./Id.js";

export default class Invoker {

  constructor() {
    this.map = new Map();
  }

  invoke(name, param) {
    const res = JSON.parse(native.invoke(name, JSON.stringify(param)));
    if (res.code === "success") {
      return res.data;
    }
    throw new Error(res.message);
  }

  asyncInvoke(name, param, success, fail) {
    const id = Id.random();
    this.map.set(id, { success, fail });
    native.asyncInvoke(name, id, JSON.stringify(param));
  }

  asyncCallback(id, param) {
    const entry = this.map.get(id);
    if (!entry) return;
    this.map.delete(id);

    const res = JSON.parse(param);
    const { success, fail } = entry;
    if (res.code === "success") {
      success(res.data);
    } else {
      fail(res.message);
    }
  }
}