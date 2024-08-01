<style lang="scss" scope>
@import '@renderer/design/hooks.scss';

.center-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  @include center;
}

.fit-layout {
  z-index: 2;
  transform-origin: center center;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  @include center;
}

.layout {
  .lefts {
    position: fixed;
    left: 0;
    top: 0;
    background: black;
    height: 100%;
  }

  .rights {
    position: fixed;
    right: 0;
    top: 0;
    background: black;
    height: 100%;
  }

  .bottoms {
    position: fixed;
    bottom: 0;
    left: 0;
    background: black;
    width: 100%;
  }

  .tops {
    position: fixed;
    top: 0;
    left: 0;
    background: black;
    width: 100%;
  }

  .cover {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    background-size: 100% 100%;
    background-image: url('@/assets/images/遮罩.png');
    pointer-events: none;
  }
}
</style>

<template>
  <div class="center-wrap">
    <div class="layout">
      <div class="lefts" :style="`width:${widths}px`"></div>
      <div class="rights" :style="`width:${widths}px`"></div>
      <div class="tops" :style="`height:${heights}px`"></div>
      <div class="bottoms" :style="`height:${heights}px`"></div>
      <div class="fit-layout" :style="getStyle">
        <div class="cover"></div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
const widths = ref(0)
const heights = ref(0)
const x = ref(1)
const y = ref(1)

// 传递 宽高
const props = defineProps({
  width: {
    type: Number,
    default: 1920
  },
  height: {
    type: Number,
    default: 1080
  }
})

// 设置缩放
const setScale = () => {
  let { offsetWidth, offsetHeight } = document.body
  let width = props.width
  let height = props.height
  let screenRadio = width / height // 固定宽高比
  let bodyRadio = offsetWidth / offsetHeight // 动态计算

  //如果屏幕宽高比例大于需要固定高度  超级宽以 height为基准  否则以 width为基准
  if (bodyRadio > screenRadio) {
    y.value = offsetHeight / height // y比例
    x.value = y.value // 下比例
    heights.value = 0
    widths.value = (offsetWidth - props.width * x.value) / 2
  } else {
    x.value = offsetWidth / width
    y.value = x.value
    widths.value = 0
    heights.value = (offsetHeight - props.height * x.value) / 2
  }
}

// 计算样式
const getStyle = computed(() => {
  return {
    height: props.height + 'px',
    width: props.width + 'px',
    transform: `scale(${x.value})`
  }
})

onMounted(() => {
  // 初始化
  setScale()

  window.addEventListener('resize', setScale)
})
</script>
