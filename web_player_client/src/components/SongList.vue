<template>
  <div class="Songs">
    <div>
      <table>
        <tr>
          <th class="nr">ID</th>
          <th class="status"></th>
          <th class="title">Song</th>
          <th class="album">Album</th>
          <th class="size">Size</th>
          <th class="favourites"></th>
        </tr>
      </table>
    </div>
    <div class="scroll" v-if="getSongs().length > 0">
      <table>
        <tr
          v-for="song in getSongs()"
          :key="song.id"
          @click="setSelection(song.id)"
          :class="{ selected: isCurrent(song) }"
        >
          <td class="nr">{{ song.id }}</td>
          <td class="status">
            <i v-if="isCurrent(song.file)" class="icofont-ui-play"></i>
          </td>
          <td class="title">{{ decodeTitle(song.file) }}</td>
          <td class="album">{{ song.album }}</td>
          <td class="size">{{ decodeSize(song.size) }}</td>
          <td class="favourites" @click="tooglePlaylist($event, song)">
            <i
              v-if="getStarred(song)"
              class="fas fa-star"
              style="color:#aaa"
            ></i>
            <i v-else class="far fa-star"></i>
          </td>
        </tr>
      </table>
    </div>
    <div class="empty" v-else>
      Your playlist is empty. <br />
      Add new songs from albums
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "SongList",
  computed: {
    albumTitle() {
      return decodeURI(this.getAlbums()[this.getAlbumSelection() - 1].title);
    },
  },
  methods: {
    ...mapGetters([
      "getSongs",
      "getAlbums",
      "getSongSelection",
      "getAlbumSelection",
      "getCurrentSong",
      "getPlaylist",
    ]),
    ...mapMutations({
      setSelection: "SET_CURRENT_SONG",
      addToPlaylist: "ADD_TO_PLAYLIST",
      removeFromPlaylist: "REMOVE_FROM_PLAYLIST",
    }),
    ...mapActions(["savePlaylist"]),
    decodeTitle: (file) =>
      decodeURI(file)
        .trim()
        .replace(/(^\d+ - )/, "")
        .replace(/(^\d+\.)/, "")
        .replace(/(^\d+ )/, "")
        .replace(".mp3", ""),
    decodeSize: (size) => (size / 1024 ** 2).toFixed(2) + " MB",
    isCurrent(song) {
      return song.album + "/" + song.file === this.getCurrentSong();
    },
    tooglePlaylist(e, song) {
      e.stopPropagation();
      if (
        !this.getPlaylist().some(
          (s) => s.file === song.file && s.album === song.album
        )
      ) {
        this.addToPlaylist(song);
      } else {
        this.removeFromPlaylist(song);
      }

      this.savePlaylist();
    },
    getStarred(song) {
      return this.getPlaylist().some(
        (s) => s.file === song.file && s.album === song.album
      );
    },
  },
};
</script>
<style scoped>
.Songs {
  overflow: hidden;
}
.scroll {
  height: 95%;
  overflow-y: scroll;
}
table {
  text-align: center;
  width: 100%;
  border-collapse: collapse;
}
tr {
  color: #fff;
  font-size: 1em;
  background-color: #333;
}
td {
  padding: 10px;
}
tr:nth-child(even) {
  background-color: #222;
}
tr:hover,
tr:nth-child(even):hover {
  background-color: rgba(204, 158, 73);
  color: #000;
  cursor: pointer;
}
.selected {
  color: rgba(204, 158, 73);
}
th {
  background-color: #151515;
  color: rgb(204, 158, 73);
  font-size: 1.25em;
  cursor: default;
}
.nr {
  width: 5%;
}
.album {
  width: 30%;
}
.title {
  width: 50%;
}
td.title {
  text-align: left;
  padding-left: 20px;
}
.size {
  width: 10%;
}
.status {
  width: 1%;
}
.favourites {
  width: 4%;
  color: #777;
}
.favourites:hover {
  color: white;
  text-shadow: 0 0 5px #fff;
}
.empty {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: #555;
  font-size: 4em;
  text-align: center;
}
</style>
