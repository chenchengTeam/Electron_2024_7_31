<template>
  <!-- 自定义全部 导航 -->
  <div class="global-navBar">
    <div class="mini noDrag" title="最小化" @click="setWin('min')">最小化</div>
    <div title="最大化" class="max noDrag" @click="setWin('max')">最大化</div>
    <div title="关闭" class="close noDrag" @click="setWin('close')">关闭</div>
  </div>
</template>

<script setup lang="ts">
// TODO： 窗口交互
const setWin = (type) => {
  window.electron.ipcRenderer.send(type)
}
</script>

<style lang="scss" scoped>
@import '@renderer/design/hooks.scss';
.global-navBar {
  width: 100%;
  height: 100%;
  //   background-color: #777;
  //   background-color: red;
  @include center;
  justify-content: flex-end;
  -webkit-app-region: drag;
  gap: 10px;
  z-index: 999;

  .noDrag {
    @include center;
    color: white;
    white-space: nowrap;
    -webkit-app-region: no-drag;
    width: 30px;
    height: 100%;
    font-size: 12px;
    background-color: #333;
  }
}
</style>
