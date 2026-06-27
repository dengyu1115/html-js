# HTML-JS 低代码页面设计器

## 项目简介

这是一个基于原生 JavaScript 开发的**可视化低代码页面设计器**，采用 DSL（Domain Specific Language）驱动的方式，支持拖拽式组件配置、实时预览和动态渲染。项目包含完整的设计器和运行时两个核心部分，实现了基于 Proxy 的数据响应式机制。

### 核心特性

- **可视化设计器**：所见即所得的页面编辑体验
- **丰富的组件库**：18 种常用 UI 组件和图表组件
- **专业图表支持**：K线图、折线图等金融图表
- **数据响应式**：基于 Proxy 的数据变化自动更新视图
- **DSL 驱动**：基于 JSON 的领域特定语言描述页面结构
- **模板系统**：支持页面模板保存和复用
- **Mixin 模式**：通过 Showable、Bindable、Optionable 等混入类复用通用逻辑
- **零依赖**：纯原生 JavaScript，无第三方框架依赖

---

## 项目结构

```
html-js/
├── design/                    # 设计器模块
│   ├── utils/                 # 设计器工具函数
│   │   ├── clone.js           # 深拷贝工具
│   │   └── dom.js             # DOM 操作工具
│   ├── Designer.js            # 设计器主控制器
│   ├── CompTreePanel.js       # 组件树面板
│   ├── DslPanel.js            # DSL 代码面板
│   ├── TemplatePanel.js       # 模板管理面板
│   ├── PropPanel.js           # 属性配置面板
│   ├── StylePanel.js          # 样式配置面板
│   ├── EventPanel.js          # 事件配置面板
│   ├── DataPanel.js           # 数据绑定配置面板
│   ├── FormRenderer.js        # 表单渲染器
│   ├── ConfigFactory.js       # 组件定义工厂
│   ├── api.js                 # 后端 API 封装
│   ├── compDefs.json          # 组件定义配置（类型、属性、样式、事件等）
│   └── styleConfig.json       # 可配置样式项定义
│
├── render/                    # 运行时渲染模块
│   ├── comp/                  # 运行时组件实现
│   │   ├── Base.js            # 组件基类
│   │   ├── Showable.js        # 显示/隐藏混入
│   │   ├── Bindable.js        # 数据绑定混入
│   │   ├── Optionable.js      # 选项组件混入（Radio/Checkbox）
│   │   ├── Chartable.js       # 图表组件混入（LineChart/KlineChart）
│   │   ├── Pickerable.js      # 选择器混入（DatePicker/TimePicker）
│   │   ├── Page.js            # 页面组件
│   │   ├── Container.js       # 容器组件
│   │   ├── Modal.js           # 模态框组件
│   │   ├── Panel.js           # 面板组件
│   │   ├── Text.js            # 文本组件
│   │   ├── Input.js           # 输入框组件
│   │   ├── TextArea.js        # 多行文本组件
│   │   ├── Button.js          # 按钮组件
│   │   ├── Select.js          # 下拉选择组件
│   │   ├── DatePicker.js      # 日期选择器
│   │   ├── TimePicker.js      # 时间选择器
│   │   ├── Radio.js           # 单选框组件
│   │   ├── Checkbox.js        # 复选框组件
│   │   ├── Table.js           # 表格组件
│   │   ├── Tree.js            # 树形组件
│   │   ├── TabHeader.js       # 标签页头
│   │   ├── TabBody.js         # 标签页内容
│   │   ├── LineChart.js       # 折线图组件
│   │   └── KlineChart.js      # K线图组件
│   ├── css/
│   │   └── render.css         # 运行时样式
│   └── DslParser.js           # DSL 解析器
│
├── chart/                     # 图表绘制模块
│   ├── ChartBase.js           # 图表基类（Canvas 绘制）
│   ├── KlineChart.js          # K线图绘制实现
│   ├── LineChart.js           # 折线图绘制实现
│   ├── kline-chart.html       # K线图独立示例
│   └── line-chart.html        # 折线图独立示例
│
├── util/                      # 公共工具模块
│   ├── Reactive.js            # 响应式数据代理（Proxy）
│   ├── Http.js                # HTTP 请求封装
│   ├── Message.js             # 消息提示组件（Toast）
│   ├── Invoker.js             # 原生方法调用器
│   ├── Val.js                 # 值格式化与单位处理
│   ├── TextUtil.js            # 文本工具
│   ├── Id.js                  # 随机 ID 生成器
│   └── SqlBuilder.js          # SQL 构建器
│
├── designer.html              # 设计器入口页面
├── designer.css               # 设计器样式
├── index.html                 # 运行时入口页面
├── server.js                  # Node.js 静态服务器
└── readme.md                  # 项目文档
```

---

## 快速开始

### 环境要求

- 现代浏览器（支持 ES6 Module）
- Node.js（可选，用于本地服务器）

### 启动方式

#### 方式一：使用内置服务器

```bash
node server.js
```

服务器将在 `http://localhost:3000` 启动。

#### 方式二：使用其他静态服务器

```bash
# 使用 http-server
npx http-server -p 3000

# 或使用 Python
python -m http.server 3000
```

### 访问页面

- **设计器**：`http://localhost:3000/designer.html`
- **运行时**：`http://localhost:3000/index.html?id=page0001`

---

## 核心概念

### 1. DSL（领域特定语言）

DSL 是基于 JSON 的页面描述语言，定义了页面的完整结构：

```json
{
  "id": "page0001",
  "type": "page",
  "props": {
    "className": "component page",
    "pageId": "page0001"
  },
  "styles": {
    "width": "1280px",
    "height": "768px",
    "borderWidth": "1px",
    "borderColor": "#e0e0e0",
    "borderStyle": "solid",
    "borderRadius": "6px",
    "backgroundColor": "#fafafa"
  },
  "events": {},
  "data": {},
  "children": [
    {
      "id": "comp0001",
      "type": "button",
      "props": {
        "text": "点击我"
      },
      "styles": {
        "width": "auto",
        "height": "auto",
        "borderRadius": "4px",
        "padding": "6px 16px",
        "backgroundColor": "#1890ff",
        "color": "#ffffff"
      },
      "events": {
        "click": "onButtonClick"
      },
      "data": {},
      "children": []
    }
  ]
}
```

### 2. 组件系统

#### 组件分类

**基础组件（6 个）：**
- `text` - 文本显示
- `input` - 单行输入框
- `textarea` - 多行文本框
- `button` - 按钮
- `select` - 下拉选择
- `radio` / `checkbox` - 单选/复选框

**布局组件（5 个）：**
- `page` - 页面根容器
- `container` - 通用容器
- `panel` - 面板
- `modal` - 模态框
- `tabheader` / `tabbody` - 标签页

**数据展示组件（2 个）：**
- `table` - 表格
- `tree` - 树形控件

**选择器组件（2 个）：**
- `date` - 日期选择器
- `time` - 时间选择器

**图表组件（2 个）：**
- `linechart` - 折线图/柱状图/面积图
- `klinechart` - K线图（蜡烛图）

#### 组件结构

每个组件包含四个核心部分：

```javascript
{
  props: {},    // 属性配置（className、文本、占位符等）
  styles: {},   // 样式配置（宽高、边距、颜色、边框等）
  events: {},   // 事件配置（click、change、load 等）
  data: {}      // 数据绑定配置（path + callback）
}
```

### 3. 数据响应式系统

项目实现了基于 `Proxy` 的响应式数据系统：

```javascript
import Reactive from "./util/Reactive.js";

// 创建响应式数据
const data = Reactive.proxy({
  userName: "张三",
  age: 25
});

// 数据变化自动触发视图更新
data.userName = "李四"; // 自动刷新绑定的组件
```

**工作原理：**

1. 组件通过 `data` 配置声明数据路径和回调方法
2. `Reactive.proxy()` 用 Proxy 包装数据对象
3. 数据变化时，`Proxy.set` 拦截并调用 `Reactive.refresh(path)`
4. `refresh` 从 `window.mountedCompMap` 查找绑定了该路径的组件
5. 组件执行 `refresh()` 方法，根据 `callbackMap` 调用对应的回调方法更新视图

### 4. 设计器架构

设计器采用三栏布局：

```
┌─────────────┬──────────────────┬─────────────┐
│             │                  │             │
│  左侧面板   │    中间预览区     │  右侧面板   │
│             │                  │             │
│ • 组件树    │                  │ • 属性配置  │
│ • DSL代码   │   实时预览画布    │ • 样式配置  │
│ • 模板库    │                  │ • 事件配置  │
│             │                  │ • 数据配置  │
│             │                  │             │
└─────────────┴──────────────────┴─────────────┘
```

**左侧面板功能：**
- **组件树**（`CompTreePanel.js`）：显示页面组件层级结构，支持选中、删除、移动、复制
- **DSL 代码**（`DslPanel.js`）：实时显示当前页面的 JSON 配置
- **模板库**（`TemplatePanel.js`）：保存和加载页面模板

**右侧面板功能：**
- **属性配置**（`PropPanel.js`）：编辑组件的基本属性（ID、类名、文本等）
- **样式配置**（`StylePanel.js`）：可视化配置组件样式（尺寸、边距、颜色、对齐等）
- **事件配置**（`EventPanel.js`）：绑定组件事件处理函数
- **数据配置**（`DataPanel.js`）：配置组件数据绑定路径

---

## 使用指南

### 设计器操作

#### 1. 创建组件

在设计器中，通过组件树的右键菜单或工具栏按钮添加新组件。

#### 2. 配置组件

选中组件后，在右侧面板进行配置：

**属性配置示例：**
- 修改按钮文本
- 设置输入框占位符
- 配置表格列定义

**样式配置示例：**
```javascript
{
  width: "200px",
  height: "50px",
  margin: "10px",
  padding: "5px",
  backgroundColor: "#f0f0f0",
  alignH: "center",  // 水平对齐
  alignV: "middle"   // 垂直对齐
}
```

**事件配置示例：**
```javascript
{
  click: "handleClick",   // 点击事件
  change: "handleChange", // 变化事件
  input: "handleInput"    // 输入事件
}
```

**数据配置示例：**
```javascript
{
  userName: {
    path: "user.name",           // 数据路径
    callback: "refreshUserName"  // 数据变化时调用的回调方法
  }
}
```

#### 3. 组件操作

- **选中**：点击组件树节点或预览区组件
- **删除**：右键菜单或 Delete 键
- **移动**：上移/下移调整顺序
- **复制**：复制组件及其子组件

#### 4. 保存模板

将当前页面配置保存为模板，方便后续复用：

```javascript
// 模板数据结构
{
  name: "用户列表页面",
  dsl: { /* 完整的 DSL 配置 */ }
}
```

### 运行时使用

#### 1. 基本用法

```html
<script type="module">
  import DslParser from "./render/DslParser.js";

  const dsl = {
    id: "page0001",
    type: "page",
    styles: { width: "100%", height: "100%" },
    children: [
      {
        id: "comp0001",
        type: "button",
        props: { text: "Hello" },
        styles: { width: "100px", height: "40px" }
      }
    ]
  };

  document.body.appendChild(new DslParser(dsl).parse().render());
</script>
```

#### 2. 从服务器加载

```javascript
import Http from "./util/Http.js";
import DslParser from "./render/DslParser.js";

Http.request(
  "/api/page-configs/page0001",
  "GET",
  null,
  (data) => {
    const config = JSON.parse(data.config);
    document.body.appendChild(new DslParser(config).parse().render());
  }
);
```

#### 3. 响应式数据绑定

```javascript
import Reactive from "./util/Reactive.js";

// 创建全局响应式数据
window.appData = Reactive.proxy({
  user: {
    name: "张三",
    age: 25
  }
});

// 组件配置中绑定数据路径
{
  data: {
    userName: {
      path: "user.name",
      callback: "updateName"
    }
  }
}

// 数据变化自动更新
window.appData.user.name = "李四"; // 触发组件刷新
```

---

## 开发指南

### 添加新组件

#### 步骤 1：在 compDefs.json 中添加组件定义

```json
{
  "custom": {
    "name": "自定义组件",
    "props": {
      "className": "component custom",
      "customProp": "默认值"
    },
    "styles": {
      "width": "200px",
      "height": "100px",
      "borderWidth": "1px",
      "borderColor": "#e8e8e8",
      "borderStyle": "solid",
      "borderRadius": "6px"
    },
    "events": {
      "click": ""
    },
    "configProps": [
      {
        "config": [
          [
            {
              "type": "input",
              "prop": "customProp",
              "label": "自定义属性",
              "defVal": "",
              "inputType": "text"
            }
          ]
        ]
      }
    ],
    "configStyles": ["direction", "size", "border", "spacing", "alignment"],
    "configEvents": ["click"],
    "configData": [],
    "data": {},
    "configChildren": []
  }
}
```

#### 步骤 2：创建运行时组件

```javascript
// render/comp/CustomComponent.js
import Base from "./Base.js";

export default class CustomComponent extends Base {
  render() {
    const element = this.createElement("div");
    const span = document.createElement("span");
    span.textContent = this.props.customProp || "默认文本";
    element.appendChild(span);

    if (this.events.click) {
      element.addEventListener("click", () => {
        // 触发事件
      });
    }

    this.renderChildren(element);
    return element;
  }
}
```

#### 步骤 3：在 DslParser.js 中注册

```javascript
import CustomComponent from "./comp/CustomComponent.js";

const COMP_MAP = {
  // ... 其他组件
  custom: CustomComponent,
};
```

---

## 图表功能

### K线图（KlineChart）

专业的金融 K 线图组件，支持：

- 蜡烛图绘制（开盘价、收盘价、最高价、最低价）
- 均线系统（MA5、MA10、MA30、MA60 可配置）
- 鼠标悬停数据提示
- 缩放和平移
- 高 DPI 屏幕适配

**配置示例：**

```javascript
{
  type: "klinechart",
  props: {
    title: "股票K线图",
    maList: [
      { title: "5日均线", prop: "ma5", color: "#ff9900" },
      { title: "10日均线", prop: "ma10", color: "#9900ff" }
    ]
  },
  styles: {
    width: "100%",
    height: "100%"
  },
  data: {
    data: {
      path: "kline.data",
      callback: "refreshData"
    }
  }
}
```

### 折线图（LineChart）

通用折线图组件，支持：

- 多系列数据（折线、柱状图、面积图）
- 双 Y 轴（左右轴独立配置）
- 自定义颜色和图例
- 网格线和坐标轴
- 悬停提示

---

## 技术栈

- **核心语言**：原生 JavaScript (ES6+)
- **模块系统**：ES Module
- **响应式系统**：Proxy API
- **图形渲染**：Canvas API
- **布局系统**：CSS Grid + Flexbox
- **服务器**：Node.js HTTP Server
- **零依赖**：无第三方库依赖

---

## 设计理念

### 1. 零依赖

项目完全使用原生 JavaScript 开发，不依赖任何第三方框架或库，确保：
- 轻量级，加载速度快
- 无版本冲突问题
- 易于理解和维护

### 2. 组件化

所有 UI 元素都是组件，具有：
- 统一的接口规范（Base 基类）
- 独立的配置管理（compDefs.json）
- 可组合的嵌套结构（children 递归）

### 3. DSL 驱动

通过 JSON 描述页面结构，实现：
- 设计与运行分离
- 配置可序列化存储
- 支持动态加载和更新

### 4. Mixin 复用

通过混入类封装通用逻辑，减少代码重复：
- `Showable` - 控制组件显示/隐藏
- `Bindable` - 处理数据绑定刷新
- `Optionable` - 选项组件通用逻辑
- `Chartable` - 图表组件通用逻辑
- `Pickerable` - 日期/时间选择器通用逻辑

### 5. 响应式更新

基于 Proxy 的数据响应机制：
- 数据变化自动触发视图更新
- 精确的路径追踪
- 高效的批量更新

---

## API 参考

### DslParser

DSL 解析器，将 JSON 配置转换为组件树。

```javascript
import DslParser from "./render/DslParser.js";

const parser = new DslParser(dsl);
const component = parser.parse();       // 返回根组件
document.body.appendChild(component.render()); // 渲染为 DOM
```

### Reactive

响应式数据代理。

```javascript
import Reactive from "./util/Reactive.js";

// 创建代理对象
const data = Reactive.proxy({ user: { name: "张三" } });

// 获取嵌套值
const name = Reactive.get(data, "user.name");

// 设置嵌套值（触发响应式更新）
Reactive.set(data, "user.name", "李四", component);
```

### Http

HTTP 请求封装。

```javascript
import Http from "./util/Http.js";

Http.request(
  url,           // 请求地址
  method,        // "GET" | "POST" | "PUT" | "DELETE"
  data,          // 请求体数据
  callback,      // 成功回调 (responseData) => {}
  errorCallback  // 失败回调（可选）
);
```

### Message

消息提示组件（Toast 通知），单例模式。

```javascript
import Message from "./util/Message.js";

const msg = new Message();

// 显示提示
msg.show({ text: "操作成功", type: "success", duration: 3000 });
msg.show({ text: "操作失败", type: "error" });
msg.show({ text: "请注意", type: "warning" });
msg.show({ text: "提示信息", type: "info" });
```

---

## 常见问题

### Q1: 组件不显示怎么办？

**检查项：**
1. DSL 配置中 `type` 是否正确
2. 组件类型是否在 `DslParser.js` 的 `COMP_MAP` 中注册
3. 样式是否设置了 `width` 和 `height`
4. 浏览器控制台是否有 JavaScript 错误

### Q2: 数据绑定不生效？

**检查项：**
1. 数据是否使用 `Reactive.proxy()` 包装
2. `data` 配置中的 `path` 路径是否正确
3. 组件类中是否定义了对应的 `callback` 方法
4. 组件是否已渲染（`rendered` 标志为 true）

### Q3: 如何调试设计器？

**建议：**
1. 打开浏览器开发者工具（F12）
2. 查看 Console 面板的错误信息
3. 在 `Designer.js` 中设置断点调试
4. 检查 `compDefs.json` 中组件定义是否正确

### Q4: 图表不显示或显示异常？

**检查项：**
1. Canvas 元素是否有正确的宽高
2. 数据格式是否符合图表组件要求
3. 是否在高 DPI 屏幕上需要调整 `devicePixelRatio`
4. 图表配置中的 `data` 路径是否正确

---

## 未来规划

- 支持更多图表类型（饼图、柱状图等）
- 增加组件拖拽排序功能
- 支持撤销/重做操作
- 添加组件属性验证
- 支持国际化（i18n）
- 增加单元测试
- 性能优化（虚拟滚动、懒加载）
- 支持移动端适配
- 导出为独立 HTML 文件
- 协作编辑功能

---

## 许可证

本项目为学习研究用途，遵循开源精神自由使用和修改。

---

**最后更新时间**：2026-06-27