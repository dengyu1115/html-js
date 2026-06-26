/**
 * 深度克隆任意对象
 * @param {any} obj 要克隆的对象
 * @returns {any} 克隆后的对象
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item));
  }
  if (typeof obj === "object") {
    const clonedObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
}

/**
 * 深度克隆组件，生成新ID
 * @param {object} comp 原始组件
 * @param {number} compCount 当前计数，会被递增
 * @returns {object} 克隆后的组件
 */
export function cloneComp(comp, compCount) {
  compCount.value++;
  const newId = `comp${compCount.value.toString().padStart(4, "0")}`;
  const clonedComp = {
    id: newId,
    type: comp.type,
    props: deepClone(comp.props),
    styles: deepClone(comp.styles),
    events: deepClone(comp.events),
    data: deepClone(comp.data),
    children: [],
    parentId: comp.parentId,
  };
  if (comp.children && comp.children.length > 0) {
    comp.children.forEach((child) => {
      const clonedChild = cloneComp(child, compCount);
      clonedChild.parentId = newId;
      clonedComp.children.push(clonedChild);
    });
  }
  return clonedComp;
}

/**
 * 初始化组件映射，将所有组件放入 map 以便快速查找
 * @param {object} comp 根组件
 * @param {Map<string, object>} compMap 组件映射
 */
export function initCompMap(comp, compMap) {
  compMap[comp.id] = comp;
  if (comp.children) {
    comp.children.forEach((child) => {
      initCompMap(child, compMap);
    });
  }
}

/**
 * 获取最大ID
 * @param {object} comp 组件
 * @returns {number} 最大ID数字
 */
export function getMaxCompId(comp) {
  let id = 0;
  const match = comp.id.match(/(\d+)$/);
  if (match && match[1]) {
    const num = parseInt(match[1], 10);
    if (num > id) {
      id = num;
    }
  }
  if (comp.children) {
    comp.children.forEach((child) => {
      const childId = getMaxCompId(child);
      if (childId > id) {
        id = childId;
      }
    });
  }
  return id;
}