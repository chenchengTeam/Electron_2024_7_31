import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// TODO：预加载渲染线程
const api = {}

// 如果渲染进程是在 contextIsolated 环境下运行
if (process.contextIsolated) {
  try {
    // 使用 contextBridge 将 electronAPI 暴露到渲染进程的全局环境中
    contextBridge.exposeInMainWorld('electron', electronAPI)
    // 同时将自定义的 api 对象也暴露到渲染进程的全局环境中
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
