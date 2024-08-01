<script setup lang="ts">
import { reactive } from 'vue'
// TODO: 版本信息
const versions = reactive({ ...window.electron.process.versions })

// TODO: 向主程序发送消息

// const ipcHandle = () => window.electron.ipcRenderer.send('ping')

console.log(' versions :', versions)
</script>

<template>node: {{ versions.node }}</template>
