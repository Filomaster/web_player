<template>
  <div class="Controls">
    <audio id="player" ref="player">
      <source :src="track" id="audio_src" type="audio/mp3" />
    </audio>
    <div class="songInfo">
      <marquee class="songName">{{
        getCurrentSong() ? currentSong : "Nothing is played"
      }}</marquee>
    </div>
    <div v-if="player" class="buttons">
      <div @click="toggleLoop()" :class="{ loop: isLooping }">
        <i class="fas fa-undo-alt"></i>
      </div>
      <div @click="prevSong()"><i class="fas fa-step-backward"></i></div>
      <div @click="toogleAudio()">
        <i v-if="!isPlaying" class="far fa-play-circle"></i>
        <i v-else class="far fa-pause-circle"></i>
      </div>
      <div @click="nextSong()"><i class="fas fa-step-forward"></i></div>
      <!-- <div class="timer">{{parsedTime}}</div>  -->
    </div>
    <div v-else>KURWAAAAAAA</div>
    <div class="bar">
      <Progress :time="time" :total="this.getDuration()" :player="player" />
    </div>
  </div>
</template>

<script>
import Progress from "./Progress";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Panel",
  data() {
    return {
      player: undefined,
      isPlaying: false,
      time: 0,
      duration: 1,
      isLooping: false,
    };
  },
  props: {
    track: String,
  },
  components: {
    Progress,
  },
  computed: {
    currentSong() {
      let song = decodeURI(this.getCurrentSong());
      return (
        song
          .split("/")[1]
          .replace(/(^\d+ - )/, "")
          .replace(/(^\d+\.)/, "")
          .replace(/(^\d+ )/, "")
          .replace(".mp3", "") +
        " - " +
        song.split("/")[0]
      );
    },
    parsedTime() {
      return `${this.formatTime(this.time)} / ${this.formatTime(
        this.getDuration()
      )}`;
    },
  },
  methods: {
    ...mapGetters(["getCurrentSong", "getSongSelection", "getSongsTotal"]),
    ...mapMutations({
      nextSong: "SET_NEXT_SONG",
      prevSong: "SET_PREV_SONG",
      setSong: "SET_CURRENT_SONG",
      clearSong: "CLEAR_CURRENT_SONG",
    }),
    toogleAudio() {
      if (player.paused) {
        player.play();
        this.isPlaying = true;
      } else {
        player.pause();
        this.isPlaying = false;
      }
    },
    currentTime(e) {
      this.time = this.player.currentTime;
      // this.time =  this.formatTime(this.player.currentTime);
    },
    getDuration() {
      this.duration = this.player ? this.player.duration : 0;
      return this.duration;
    },
    toggleLoop() {
      this.isLooping = !this.isLooping;
    },
    formatTime(time) {
      let min = Math.floor(time / 60);
      let sec = time.toFixed() % 60;

      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      if (isNaN(time) || !isFinite(time)) min = sec = "--";

      return min + ":" + sec;
    },
    onEnd() {
      if (this.getSongSelection() < this.getSongsTotal()) this.nextSong();
      else {
        if (this.isLooping) {
          this.setSong(1);
        } else {
          this.isPlaying = false;
          this.time = 0;
          this.duration = 1;
          this.clearSong();
        }
        // this.currentSong = null;
      }
    },
  },
  mounted() {
    this.$watch("track", () => {
      this.$refs.player.autoplay = true;
      this.$refs.player.load();
      this.isPlaying = true;
      this.getDuration();
    });
    this.player = this.$refs.player;
    this.player.addEventListener("timeupdate", this.currentTime);
    this.player.addEventListener("ended", this.onEnd);
  },
};
</script>
<style scoped>
.Controls {
  background-color: #0a0a0a;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 0.5fr 2fr 0.5fr;
  grid-template-areas:
    "current controls sound"
    "current progress sound";
  /* display: flex;
        justify-content: center;
        align-items: center; */
}
.buttons {
  /* background-color: blue; */
  grid-area: controls;
  width: 100%;
  display: flex;
  justify-content: space-around;
  color: #555;
  /* color: rgba(204, 158, 73); */
}
.songInfo {
  grid-area: current;
  display: grid;
  place-items: center;
}
.songName {
  height: 1.5em;
  width: 90%;
  overflow: hidden;
  color: #555;
}
.bar {
  grid-area: progress;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
i {
  font-size: 2.5em;
}
i:hover {
  color: rgba(204, 158, 73);
  cursor: pointer;
}
i:active {
  color: #fff;
}
.loop {
  color: white;
}
</style>
