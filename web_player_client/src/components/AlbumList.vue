<template>
  <div id="list" class="Albums">
    <div class="album" @click="playlist()">
      <i class="fas fa-th-list"> </i>
    </div>
    <div class="listContainer">
      <div :key="'album' + album.id" v-for="album in getAlbums()">
        <Album :id="album.id" :title="album.title" :cover="album.cover" />
      </div>
    </div>
  </div>
</template>

<script>
import Album from "./Album";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AlbumList",
  components: { Album },
  methods: {
    ...mapGetters(["getAlbums"]),
    ...mapMutations({ playlist: "LOAD_PLAYLIST" }),
  },
};
</script>

<style scoped>
#list {
  height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  overflow: hidden;
}
.album {
  width: 100%;
  height: 15%;
  position: relative;
  background-color: #151515;
  display: grid;
  place-items: center;
  color: rgb(204, 158, 73);
}
i {
  font-size: 3em;
}
.album:hover {
  color: white;
  background-color: #222;
  transition: 100ms;
  cursor: pointer;
}
.listContainer {
  height: 85%;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
