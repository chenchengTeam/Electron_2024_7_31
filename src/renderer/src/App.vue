<script setup lang="ts">
import { reactive } from 'vue'
// TODO: 版本信息
const versions = reactive({ ...window.electron.process.versions })

// TODO: 向主程序发送消息

// const ipcHandle = () => window.electron.ipcRenderer.send('ping')

console.log(' versions :', versions)
</script>

<template>
  <div class="container">node: {{ versions.node }}</div>
</template>
<style lang="scss" scoped>
@import '@renderer/design/hooks.scss';
.container {
  width: 100%;
  height: 100%;
  @include center;
}
</style>
