<template>
  <div class="clock">
    <ul class="time">
      <li>
        <div class="upBox beforeTime"></div>
        <div class="downBox beforeTime"></div>
        <div class="upBox afterTime"></div>
        <div class="downBox afterTime"></div>
      </li>
      <div class="unit">:</div>
      <li>
        <div class="upBox beforeTime"></div>
        <div class="downBox beforeTime"></div>
        <div class="upBox afterTime"></div>
        <div class="downBox afterTime"></div>
      </li>
      <div class="unit">:</div>
      <li>
        <div class="upBox beforeTime"></div>
        <div class="downBox beforeTime"></div>
        <div class="upBox afterTime"></div>
        <div class="downBox afterTime"></div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'

// TODO: 初始化 时间
const initClock = (): void => {
  // 格式化时间
  const formatTime = (time: number | string): string => {
    if (typeof time === 'number' && time < 10) {
      return '0' + time.toString()
    } else {
      return time.toString()
    }
  }

  // 翻转前面下面的盒子向上180deg
  const rotateUp = (ele: HTMLElement, time: string, n: number): void => {
    let rotateDeg = 0
    ele.style.zIndex = '50'
    // 这个是所有上面的盒子
    const allUpBox = document
      .querySelector(`li:nth-child(${n})`)!
      .querySelectorAll('.upBox') as NodeListOf<HTMLElement>
    const beforeTime = document
      .querySelector(`li:nth-child(${n})`)!
      .querySelectorAll('.beforeTime') as NodeListOf<HTMLElement>
    allUpBox[1].style.display = 'none'
    allUpBox[1].style.transform = `rotateX(270deg)`
    const animation = (): void => {
      rotateDeg += 3
      ele.style.transform = `perspective(500px) rotateX(${rotateDeg}deg)`
      if (rotateDeg === 90) {
        // 让它更新为最近时间后隐藏
        ele.innerHTML = time
        ele.style.zIndex = '-1'
        // 让刚刚上面隐藏的盒子重新显示出来并且完成90°-180°的旋转
        allUpBox[1].style.display = 'block'
        allUpBox[0].style.zIndex = '1'
        rotateDown(allUpBox[1])
        allUpBox[1].style.zIndex = '1'
      }
      if (rotateDeg === 150) {
        beforeTime[0].innerHTML = time
      }
      if (rotateDeg < 180) {
        requestAnimationFrame(animation)
      }
    }
    animation()
  }

  const rotateDown = (ele: HTMLElement): void => {
    let rotateDeg = 270
    const animation = (): void => {
      rotateDeg += 3
      ele.style.transform = `perspective(500px) rotateX(${rotateDeg}deg)`
      if (rotateDeg < 360) {
        requestAnimationFrame(animation)
      }
    }
    animation()
  }

  let time = new Date()
  let oldHour = time.getHours()
  let oldMinute = time.getMinutes()
  let oldSecond = time.getSeconds()

  document
    .querySelector('li:nth-child(1)')!
    .querySelectorAll('.beforeTime')
    .forEach((ele: Element) => {
      let element = ele as HTMLElement
      element.innerHTML = formatTime(oldHour)
    })

  document
    .querySelector('li:nth-child(3)')!
    .querySelectorAll('.beforeTime')
    .forEach((ele: Element) => {
      let element = ele as HTMLElement
      element.innerHTML = formatTime(oldMinute)
    })

  document
    .querySelector('li:nth-child(5)')!
    .querySelectorAll('.beforeTime')
    .forEach((ele: Element) => {
      let element = ele as HTMLElement
      element.innerHTML = formatTime(oldSecond)
    })

  const changeTime = (): void => {
    let time = new Date()
    let hour = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()

    const setHourBox = document
      .querySelector('li:nth-child(1)')!
      .querySelectorAll('.afterTime') as NodeListOf<HTMLElement>
    if (setHourBox[0].innerHTML !== formatTime(hour)) {
      if (setHourBox[0].innerHTML) {
        rotateUp(
          document
            .querySelector('li:nth-child(1)')!
            .querySelectorAll('.beforeTime')[1] as HTMLElement,
          formatTime(hour),
          1
        )
      }
      setHourBox.forEach((ele: HTMLElement) => (ele.innerHTML = formatTime(hour)))
    }

    const setMinuteBox = document
      .querySelector('li:nth-child(3)')!
      .querySelectorAll('.afterTime') as NodeListOf<HTMLElement>
    if (setMinuteBox[0].innerHTML !== formatTime(minute)) {
      if (setMinuteBox[0].innerHTML) {
        rotateUp(
          document
            .querySelector('li:nth-child(3)')!
            .querySelectorAll('.beforeTime')[1] as HTMLElement,
          formatTime(minute),
          3
        )
      }
      setMinuteBox.forEach((ele: HTMLElement) => (ele.innerHTML = formatTime(minute)))
    }

    const setSecondBox = document
      .querySelector('li:nth-child(5)')!
      .querySelectorAll('.afterTime') as NodeListOf<HTMLElement>
    setSecondBox.forEach((ele: HTMLElement) => (ele.innerHTML = formatTime(second)))
    rotateUp(
      document.querySelector('li:nth-child(5)')!.querySelectorAll('.beforeTime')[1] as HTMLElement,
      formatTime(second),
      5
    )

    setTimeout(changeTime, 1000)
  }
  changeTime()
}

onMounted(() => {
  // 初始化时钟
  nextTick(() => initClock())
})
</script>
<style scoped lang="scss">
@import '@renderer/design/hooks.scss';

.clock {
  width: 100%;
  height: 100%;
  @include center;
  margin: 100px auto;
  position: relative;
  background-color: black;
  color: #fff;

  ul li {
    list-style-type: none;
  }

  .time {
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    font-size: 120px;
    text-align: center;
    line-height: 300px;
    padding: 0 20px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  .beforeTime {
    z-index: 100;
  }

  .time li:nth-child(2n) {
    flex: 1;
  }

  .time li:nth-child(2n + 1) {
    flex: 4;
    background-color: #3b3d3b;
    position: relative;
    height: 200px;
    line-height: 200px;
    margin: auto 20px;
    border-radius: 10px;
    box-shadow: 0 0 20px 3px white;
  }

  .time li:nth-child(2n + 1) .upBox,
  .time li:nth-child(2n + 1) .downBox {
    position: absolute;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .time li:nth-child(2n + 1) .upBox {
    top: 0;
    bottom: 50%;
    box-sizing: border-box;
    border-bottom: solid 3px #3b3d3b;
    background-color: #3b3d3b;
    transform-origin: bottom;
  }

  .time li:nth-child(2n + 1) .downBox {
    top: 50%;
    bottom: 0;
    line-height: 0;
    box-sizing: border-box;
    background-color: #3b3d3b;
    overflow: hidden;
    transform-origin: top;
  }

  .unit {
    height: 100%;
    @include center;
  }

  .change {
    border-bottom: 2px solid white;
  }
}
</style>
