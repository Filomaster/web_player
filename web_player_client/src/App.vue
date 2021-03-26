<template>
  <div class="container">
    <Header />
    <AlbumList />
    <SongList />
    <Panel />
    <!-- <h1>{{data.kurwa}}</h1> -->
  </div>
</template>

<script>
import Header from './components/Header.vue'
import AlbumList from './components/AlbumList.vue'
import SongList from './components/SongList'
import Panel from "./components/Panel"

export default {
  name: 'App',
  components: {
    Header,
    AlbumList,
    SongList,
    Panel
  },
  mounted(){
    this.$store.dispatch('firstFetch')
  },
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #333;
}
.container{
  font-family: 'Open Sans', sans-serif;
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
