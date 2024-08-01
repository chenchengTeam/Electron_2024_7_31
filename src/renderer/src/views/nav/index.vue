<template>
  <!-- 自定义全部 导航 -->
  <div class="global-navBar">
    <div class="myLogo">dacheng</div>

    <div class="mini noDrag" title="最小化" @click="setWin('min')">
      <SvgIcon name="minimum" size="15" :color="'#fff'" />
    </div>
    <div title="最大化" class="max noDrag" @click="setWin('max')">
      <SvgIcon name="maximum-big" size="10" :color="'#fff'" />
    </div>
    <div title="关闭" class="close noDrag" @click="setWin('close')">
      <SvgIcon name="close" size="10" :color="'#fff'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@renderer/views/components/svg-icon.vue'
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
  @include center;
  justify-content: flex-end;
  -webkit-app-region: drag;
  gap: 10px;
  z-index: 999;
  // background-color: red;

  .myLogo {
    @include center;
    width: 100px;
    height: 100%;
    margin-right: auto;
    color: white;
    display: none;
    // background-color: red;
  }

  .noDrag {
    @include center;
    color: white;
    -webkit-app-region: no-drag;
    width: 30px;
    height: 100%;
    background-color: #333;
  }
}
</style>
