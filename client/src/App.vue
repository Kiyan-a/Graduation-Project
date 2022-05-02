<template>
  <div class="app">
    <transition name="el-zoom-in-top"><router-view></router-view> </transition>
  </div>
</template>
<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.app {
  background-color: #f7f7f7;
}
@font-face {
  font-family: myFont;
  src: url('./assets/font/huaguan.ttf');
}
/* h1 {
  font-family: myFont;
} */

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  /* background-color: #f5f5f5; */
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  width: 6px;
  background-color: rgba(186, 182, 182, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(125, 122, 122, 0.5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgb(97, 95, 95);
}
</style>
