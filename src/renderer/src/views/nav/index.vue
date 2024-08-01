<template>
  <!-- 自定义全部 导航 -->
  <div class="global-navBar">
    <div class="myLogo">dacheng</div>
    s
    <div class="anchor noDrag" title="固定" @click="setWin('anchor')">
      <SvgIcon name="anchor" size="15" :color="`${navStatus.anchor ? '#00FA9A' : '#fff'}`" />
    </div>
    <div class="mini noDrag" title="最小化" @click="setWin('min')">
      <SvgIcon name="minimum" size="15" :color="'#fff'" />
    </div>
    <div title="最大化" class="max noDrag" @click="setWin('max')">
      <SvgIcon :name="navStatus.max ? 'maximum-big' : 'maximum-small'" size="10" />
    </div>
    <div title="关闭" class="close noDrag" @click="setWin('close')">
      <SvgIcon name="close" size="10" :color="'#fff'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@renderer/views/components/svg-icon.vue'
import { reactive } from 'vue'

// TODO： 状态管理
const navStatus = reactive({
  anchor: true,
  max: false
})

// TODO： 窗口交互
const setWin = (type: string) => {
  // 状态取反
  navStatus[type] = !navStatus[type]
  // 管道通讯
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
    width: 25px;
    height: 100%;

    &:hover {
      background-color: #333;
    }
  }
}
</style>
