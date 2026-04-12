# HTML-JS 低代码页面设计器

## 📖 项目简介

这是一个基于原生 JavaScript 开发的**可视化低代码页面设计器**，采用 DSL（Domain Specific Language）驱动的方式，支持拖拽式组件配置、实时预览和动态渲染。项目包含完整的设计器和运行时两个核心部分，实现了 MVVM 数据响应式机制。

### 核心特性

- ✨ **可视化设计器**：拖拽式组件配置，所见即所得
- 🎨 **丰富的组件库**：20+ 常用 UI 组件和图表组件
- 📊 **专业图表支持**：K线图、折线图等金融图表
- 🔄 **MVVM 响应式**：数据变化自动更新视图
- 📝 **DSL 驱动**：基于 JSON 的领域特定语言描述页面结构
- 🎯 **模板系统**：支持页面模板保存和复用
- 🔧 **灵活扩展**：组件化架构，易于扩展新组件

---

## 🏗️ 项目结构

```
html-js/
├── design/                 # 设计器模块
│   ├── comp/              # 设计器组件定义
│   │   ├── Base.js        # 组件基类
│   │   ├── Page.js        # 页面配置
│   │   ├── Container.js   # 容器组件
│   │   ├── Button.js      # 按钮组件
│   │   ├── Input.js       # 输入框组件
│   │   ├── Select.js      # 下拉选择组件
│   │   ├── Table.js       # 表格组件
│   │   ├── Tree.js        # 树形组件
│   │   ├── KlineChart.js  # K线图组件
│   │   ├── LineChart.js   # 折线图组件
│   │   └── ...            # 其他组件
│   ├── Designer.js        # 设计器主控制器
│   ├── ConfigFactory.js   # 组件配置工厂
│   ├── CompTreePanel.js   # 组件树面板
│   ├── DslPanel.js        # DSL 代码面板
│   ├── TemplatePanel.js   # 模板管理面板
│   ├── PropRender.js      # 属性渲染器
│   ├── StyleRender.js     # 样式渲染器
│   ├── EventRender.js     # 事件渲染器
│   ├── DataRender.js      # 数据渲染器
│   └── FormRender.js      # 表单渲染器
│
├── render/                # 运行时渲染模块
│   ├── comp/              # 运行时组件实现
│   │   ├── Base.js        # 组件基类
│   │   ├── Page.js        # 页面组件
│   │   ├── Container.js   # 容器组件
│   │   ├── Modal.js       # 模态框组件
│   │   ├── Panel.js       # 面板组件
│   │   ├── Text.js        # 文本组件
│   │   ├── Input.js       # 输入框组件
│   │   ├── TextArea.js    # 多行文本组件
│   │   ├── Button.js      # 按钮组件
│   │   ├── Select.js      # 下拉选择组件
│   │   ├── DatePicker.js  # 日期选择器
│   │   ├── TimePicker.js  # 时间选择器
│   │   ├── Radio.js       # 单选框组件
│   │   ├── Checkbox.js    # 复选框组件
│   │   ├── Table.js       # 表格组件
│   │   ├── Tree.js        # 树形组件
│   │   ├── TabHeader.js   # 标签页头
│   │   ├── TabBody.js     # 标签页内容
│   │   ├── LineChart.js   # 折线图组件
│   │   └── KlineChart.js  # K线图组件
│   ├── css/
│   │   └── render.css     # 运行时样式
│   └── DslParser.js       # DSL 解析器
│
├── chart/                 # 图表模块
│   ├── ChartBase.js       # 图表基类
│   ├── KlineChart.js      # K线图实现
│   ├── LineChart.js       # 折线图实现
│   ├── kline-chart.html   # K线图示例
│   └── line-chart.html    # 折线图示例
│
├── util/                  # 工具模块
│   ├── Reactive.js        # 响应式数据代理
│   ├── Http.js            # HTTP 请求封装
│   ├── Message.js         # 消息通信
│   ├── Invoker.js         # 事件调用器
│   ├── Val.js             # 值处理工具
│   ├── TextUtil.js        # 文本工具
│   ├── Id.js              # ID 生成器
│   └── SqlBuilder.js      # SQL 构建器
│
├── designer.html          # 设计器入口页面
├── designer.css           # 设计器样式
├── index.html             # 运行时入口页面
├── server.js              # Node.js 静态服务器
└── readme.md              # 项目文档
```

---

## 🚀 快速开始

### 环境要求

- 现代浏览器（支持 ES6 Module）
- Node.js（可选，用于本地服务器）

### 启动方式

#### 方式一：使用内置服务器

```bash
node server.js
```

服务器将在 `http://localhost:3000` 启动

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

## 📚 核心概念

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
    "borderColor": "#bebaba",
    "borderStyle": "solid"
  },
  "events": {
    "load": "onPageLoad"
  },
  "data": {
    "global": {
      "value": {}
    }
  },
  "children": [
    {
      "id": "comp0001",
      "type": "button",
      "props": {
        "text": "点击我"
      },
      "styles": {
        "width": "120px",
        "height": "40px"
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

**基础组件：**
- `text` - 文本显示
- `input` - 单行输入框
- `textarea` - 多行文本框
- `button` - 按钮
- `select` - 下拉选择
- `radio` - 单选框
- `checkbox` - 复选框
- `datepicker` - 日期选择器
- `timepicker` - 时间选择器

**布局组件：**
- `page` - 页面根容器
- `container` - 通用容器
- `panel` - 面板
- `modal` - 模态框
- `tabheader` / `tabbody` - 标签页

**数据展示组件：**
- `table` - 表格
- `tree` - 树形控件

**图表组件：**
- `linechart` - 折线图
- `klinechart` - K线图（蜡烛图）

#### 组件结构

每个组件包含四个核心部分：

```javascript
{
  props: {},    // 属性配置（ID、类名、文本等）
  styles: {},   // 样式配置（宽高、边距、颜色等）
  events: {},   // 事件配置（点击、加载等）
  data: {}      // 数据绑定配置
}
```

### 3. MVVM 响应式系统

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
1. 组件通过 `data` 配置声明数据路径
2. `Reactive.proxy()` 包装数据对象
3. 数据变化时通过 `Proxy.set` 拦截
4. 调用 `Reactive.refresh(path)` 通知相关组件
5. 组件执行 `refresh()` 方法更新视图

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
- **组件树**：显示页面组件层级结构，支持选中、删除、移动、复制
- **DSL 代码**：实时显示当前页面的 JSON 配置
- **模板库**：保存和加载页面模板

**右侧面板功能：**
- **属性配置**：编辑组件的基本属性（ID、类名、文本等）
- **样式配置**：可视化配置组件样式（尺寸、边距、颜色、对齐等）
- **事件配置**：绑定组件事件处理函数
- **数据配置**：配置组件数据绑定路径

---

## 💡 使用指南

### 设计器操作

#### 1. 创建组件

在设计器中，通过组件树的右键菜单或工具栏添加新组件：

```javascript
// Designer.js 内部逻辑
designer.createComp("button", parentComp);
```

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
  click: "handleClick",  // 点击事件
  load: "handleLoad",    // 加载事件
  change: "handleChange" // 变化事件
}
```

**数据配置示例：**
```javascript
{
  userName: {
    path: "user.name",           // 数据路径
    callback: "refreshUserName"  // 数据变化回调
  }
}
```

#### 3. 组件操作

- **选中**：点击组件树节点或预览区组件
- **删除**：右键菜单或 Delete 键
- **移动**：上移/下移调整顺序
- **复制**：复制组件及其子组件
- **聚焦**：单独预览某个组件

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
  "http://localhost:8080/api/page-configs/page0001",
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

## 🔧 开发指南

### 添加新组件

#### 步骤 1：创建设计时器组件定义

在 `design/comp/` 目录下创建新组件配置文件：

```javascript
// design/comp/CustomComponent.js
import Base from "./Base.js";

export default class CustomComponent extends Base {
  static getDef() {
    return {
      name: "自定义组件",
      props: {
        className: "component custom",
        customProp: "default value"
      },
      styles: {
        width: "200px",
        height: "100px",
        borderWidth: "1px",
        borderColor: "#ccc",
        borderStyle: "solid"
      },
      events: {
        click: ""
      },
      configProps: [
        {
          config: [
            [
              {
                type: "input",
                prop: "customProp",
                label: "自定义属性",
                defVal: "",
                inputType: "text"
              }
            ]
          ]
        }
      ],
      configStyles: ["direction", "size", "border", "spacing", "alignment"],
      configEvents: ["click"],
      configData: [],
      data: {},
      configChildren: [] // 允许的子组件类型
    };
  }
}
```

#### 步骤 2：创建运行时组件实现

在 `render/comp/` 目录下创建组件渲染逻辑：

```javascript
// render/comp/CustomComponent.js
import Base from "./Base.js";

export default class CustomComponent extends Base {
  constructor(props, styles, events, data) {
    super(props, styles, events, data);
  }

  render() {
    const element = this.createElement("div", "div");
    
    // 添加自定义内容
    element.innerHTML = `<span>${this.props.customProp || "默认文本"}</span>`;
    
    // 绑定事件
    if (this.events.click) {
      element.addEventListener("click", () => {
        this.message.send(this.events.click, this);
      });
    }
    
    // 渲染子组件
    this.renderChildren(element);
    
    return element;
  }
}
```

#### 步骤 3：注册组件

在 `ConfigFactory.js` 中添加组件映射：

```javascript
import CustomComponent from "./comp/CustomComponent.js";

static getDef(type) {
  switch (type) {
    // ... 其他组件
    case "custom":
      return CustomComponent.getDef();
    default:
      throw new Error(`Unknown component type: ${type}`);
  }
}
```

在 `DslParser.js` 中添加解析逻辑：

```javascript
import CustomComponent from "./comp/CustomComponent.js";

create(type, props, styles, events, data) {
  switch (type) {
    // ... 其他组件
    case "custom":
      return new CustomComponent(props, styles, events, data);
    default:
      throw new Error(`Unknown component type: ${type}`);
  }
}
```

### 扩展图表组件

图表组件继承自 `ChartBase`，使用 Canvas API 绘制：

```javascript
import ChartBase from "../chart/ChartBase.js";

export default class CustomChart extends ChartBase {
  constructor(canvas, config) {
    super(canvas, config);
  }

  draw() {
    // 清除画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // 绘制图表内容
    // ...
  }

  setupEventListeners() {
    // 添加交互事件
    this.canvas.addEventListener("mousemove", (e) => {
      // 处理鼠标移动
    });
  }
}
```

### 自定义工具函数

在 `util/` 目录下添加工具类：

```javascript
// util/CustomUtil.js
export default class CustomUtil {
  static formatDate(date, format = "YYYY-MM-DD") {
    // 日期格式化逻辑
  }
  
  static validateEmail(email) {
    // 邮箱验证逻辑
  }
}
```

---

## 📊 图表功能

### K线图（KlineChart）

专业的金融 K 线图组件，支持：

- ✅ 蜡烛图绘制（开盘价、收盘价、最高价、最低价）
- ✅ 均线系统（MA5、MA10、MA20 等可配置）
- ✅ 交易量柱状图
- ✅ 交易金额柱状图
- ✅ 鼠标悬停数据提示
- ✅ 图例显示/隐藏
- ✅ 缩放和平移
- ✅ 高 DPI 屏幕适配

**配置示例：**

```javascript
{
  type: "klinechart",
  styles: {
    width: "800px",
    height: "500px"
  },
  data: {
    chartData: {
      path: "kline.data",
      callback: "refreshChart"
    }
  },
  // 图表配置通过 props 传递
  props: {
    title: "股票K线图",
    maList: [
      { key: "ma5", name: "MA5", color: "#ff0000" },
      { key: "ma10", name: "MA10", color: "#00ff00" }
    ],
    formatter: {
      kline: (val) => val.toFixed(2),
      share: (val) => (val / 10000).toFixed(2) + "万"
    }
  }
}
```

### 折线图（LineChart）

通用折线图组件，支持：

- ✅ 多系列数据
- ✅ 自定义颜色和样式
- ✅ 数据点标记
- ✅ 网格线和坐标轴
- ✅ 悬停提示
- ✅ 图例控制

---

## 🛠️ 技术栈

- **核心语言**：原生 JavaScript (ES6+)
- **模块系统**：ES Module
- **响应式系统**：Proxy API
- **图形渲染**：Canvas API
- **布局系统**：CSS Grid
- **服务器**：Node.js HTTP Server
- **无依赖**：零第三方库依赖

---

## 🎯 设计理念

### 1. 零依赖

项目完全使用原生 JavaScript 开发，不依赖任何第三方框架或库，确保：
- 轻量级，加载速度快
- 无版本冲突问题
- 易于理解和维护

### 2. 组件化

所有 UI 元素都是组件，具有：
- 统一的接口规范
- 独立的配置管理
- 可组合的嵌套结构

### 3. DSL 驱动

通过 JSON 描述页面结构，实现：
- 设计与运行分离
- 配置可序列化存储
- 动态加载和更新

### 4. 响应式更新

基于 Proxy 的 MVVM 机制：
- 数据变化自动触发视图更新
- 精确的路径追踪
- 高效的批量更新

---

## 📝 API 参考

### DslParser

DSL 解析器，将 JSON 配置转换为 DOM 元素。

```javascript
import DslParser from "./render/DslParser.js";

const parser = new DslParser(dsl);
const component = parser.parse();
document.body.appendChild(component.render());
```

### Reactive

响应式数据代理。

```javascript
import Reactive from "./util/Reactive.js";

// 创建代理
const data = Reactive.proxy({ user: { name: "张三" } });

// 获取数据
const name = Reactive.get(data, "user.name");

// 设置数据（触发更新）
Reactive.set(data, "user.name", "李四", component);
```

### Http

HTTP 请求封装。

```javascript
import Http from "./util/Http.js";

Http.request(
  url,
  method,      // "GET" | "POST" | "PUT" | "DELETE"
  data,        // 请求体
  callback,    // 成功回调
  errorCallback // 失败回调（可选）
);
```

### Message

组件间消息通信。

```javascript
import message from "./util/Message.js";

// 发送消息
message.send(eventName, sender);

// 监听消息（在设计器中配置）
{
  events: {
    click: "handleClick"
  }
}
```

---

## 🐛 常见问题

### Q1: 组件不显示怎么办？

**检查项：**
1. DSL 配置是否正确（JSON 格式）
2. 组件类型是否在 `DslParser` 中注册
3. 样式是否设置了宽高
4. 浏览器控制台是否有错误

### Q2: 数据绑定不生效？

**检查项：**
1. 数据是否使用 `Reactive.proxy()` 包装
2. `data` 配置中的 `path` 是否正确
3. 数据路径是否存在于响应式对象中
4. 组件是否已渲染（`renderred` 标志）

### Q3: 如何调试设计器？

**建议：**
1. 打开浏览器开发者工具
2. 查看 Console 面板的错误信息
3. 在 `Designer.js` 中设置断点
4. 检查 `compMap` 中的组件状态

### Q4: 图表不显示或显示异常？

**检查项：**
1. Canvas 元素是否有正确的宽高
2. 数据格式是否符合要求
3. 是否在高 DPI 屏幕上需要调整 `dpr`
4. 图表配置中的 `data` 数组是否为空

---

## 🚧 未来规划

- [ ] 支持更多图表类型（饼图、柱状图等）
- [ ] 增加组件拖拽排序功能
- [ ] 支持撤销/重做操作
- [ ] 添加组件属性验证
- [ ] 支持国际化（i18n）
- [ ] 增加单元测试
- [ ] 性能优化（虚拟滚动、懒加载）
- [ ] 支持移动端适配
- [ ] 导出为独立 HTML 文件
- [ ] 协作编辑功能

---

## 📄 许可证

本项目为学习研究用途，遵循开源精神自由使用和修改。

---

## 👥 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 GitHub Issue
- 发送邮件至项目维护者

---

**最后更新时间**：2026-04-08
