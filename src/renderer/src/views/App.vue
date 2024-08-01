<template>
  <div class="container">
    <!-- 全局导航 -->
    <NavBar style="height: 20px" />
    <!-- 自适应主体布局 -->
    <fit-layout-v3 :width="720" :height="460">
      <!-- 时钟 -->
      <clock />
    </fit-layout-v3>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@renderer/views/nav/index.vue'
import { reactive } from 'vue'
// TODO: 版本信息
const versions = reactive({ ...window.electron.process.versions })

// TODO: 向主程序发送消息
// const ipcHandle = () => window.electron.ipcRenderer.send('ping')

console.log(' Electron主体的版本 :', versions)
</script>

<style lang="scss" scoped>
@import '@renderer/design/hooks.scss';
.container {
  width: 100%;
  height: 100%;
  @include center;
  flex-direction: column;
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
</style>
