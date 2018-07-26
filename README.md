## SPA 项目说明

本项目是基于[silk](https://github.com/shaozj/silk)这个工具来开发的，详细使用请看 silk 文档

silk 本身会生成一个单页的项目模板，使用此模板开发管理系统确实不错

silk 的单页模板，只处理到了两级菜单，我这个改进模板增加到了三级菜单，二级菜单需要在 components/Layout/Layout.js 配置一下，在 state 中的 twoLevel: ['/mp/protect']配置二级菜单（前提是有三级菜单的情况下）

silk 的 spa 模板使用的 ajax 工具是封装的原生 fetch，我这里改成了 axios 请求（个人喜好）

### 模板使用技术

1.  React
2.  React-router
3.  Less（silk 编译也支持 sass）
4.  Ant-design

### 权限说明

在单页入口处，请求两个接口，一个是用户信息接口，一个是用户权限接口，将返回数据放置到顶部组件的 context 中传递下去

### 注意

项目运行起来，请自行修改接口
