export function createElement(tag, properties = {}) {
  const element = document.createElement(tag);
  Object.keys(properties).forEach((key) => {
    if (key === "textContent" || key === "innerHTML") {
      element[key] = properties[key];
    } else {
      element.setAttribute(key, properties[key]);
      element[key] = properties[key];
    }
  });
  return element;
}

export function clearChildren(element) {
  element.innerHTML = "";
}

export function appendChildren(parent, children) {
  children.forEach(child => parent.appendChild(child));
}

export function createFormRow(labelText, inputEl) {
  const rowEl = createElement("div", { className: "form-row" });
  const colEl = createElement("div", { className: "form-col" });
  const groupEl = createElement("div", { className: "form-group" });
  const labelEl = createElement("label", { textContent: labelText });
  groupEl.appendChild(labelEl);
  groupEl.appendChild(inputEl);
  colEl.appendChild(groupEl);
  rowEl.appendChild(colEl);
  return rowEl;
}

export function createSubmitBtn(onSubmit) {
  const btn = createElement("button", { textContent: "生效" });
  btn.addEventListener("click", () => {
    onSubmit();
    btn.textContent = "已生效";
    setTimeout(() => { btn.textContent = "生效"; }, 1000);
  });
  return btn;
}