<template>
  <div class="bar-container">
    <div class="time">{{ formatTime(time) }}</div>
    <div
      class="Progress"
      @mousedown="click($event)"
      @mousemove="drag($event)"
      @mouseup="release()"
      @mouseleave="release()"
    >
      <div class="current" :style="{ width: fillPercent + '%' }" />
    </div>
    <div class="time">{{ formatTime(total) }}</div>
  </div>
</template>
<script>
export default {
  name: "Progress",
  data() {
    return {
      current: 0,
      interval: null,
      isClicked: false,
      newTime: 0,
    };
  },
  props: {
    player: HTMLAudioElement,
    time: Number,
    total: Number,
  },
  computed: {
    fillPercent() {
      if (this.isClicked) return (this.newTime / this.total) * 100;
      return (this.time / this.total) * 100;
    },
  },
  methods: {
    setTime(event) {
      let time = parseFloat(
        this.total *
          ((event.clientX - event.target.offsetLeft) / event.target.clientWidth)
      );
      console.log(time);
      this.player.currentTime = time;
      // console.log(parseInt((event.clientX - event.target.offsetLeft)/event.target.clientWidth*100) + '%')}
    },
    formatTime(time) {
      let min = Math.floor(time / 60);
      let sec = time.toFixed() % 60;
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      if (isNaN(time) || !isFinite(time)) min = sec = "00";
      return min + ":" + sec;
    },
    drag(e) {
      if (this.isClicked) {
        this.newTime = parseFloat(
          (this.total * (e.clientX - e.target.offsetLeft)) /
            e.target.clientWidth
        );
      }
    },
    click(e) {
      this.newTime = parseFloat(
        (this.total * (e.clientX - e.target.offsetLeft)) / e.target.clientWidth
      );
      this.isClicked = true;
    },
    release() {
      if (this.isClicked) {
        this.player.currentTime = this.newTime;
        this.isClicked = false;
      }
    },
  },
};
</script>
<style scoped>
.bar-container {
  display: flex;
  align-content: space-around;
}
.Progress {
  height: 0.75em;
  width: 100%;
  display: flex;
  align-self: center;
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
}
.current {
  background-color: #aaa;
  height: 0.75em;
  border-radius: 10px;
  transition: 100ms;
  pointer-events: none;
}
.time {
  font-size: 1em;
  color: #555;
  width: 4em;
  text-align: center;
}
.Progress:hover {
  cursor: pointer;
}
.Progress:hover .current {
  background-color: rgba(204, 158, 73);
}
</style>
