<template>
<div id="list" class="Albums">
    <div :key="'album' + album.id" v-for="album in getAlbums()">
        <Album :id="album.id" :title="album.title" :cover="album.cover"/>
    </div>
</div>
</template>

<script>

    import Album from "./Album";
    import { mapGetters, mapMutations } from 'vuex'

    export default {
        name: "AlbumList",
        components: { Album },
        methods: {
            ...mapGetters(['getAlbums']),
        }
    }
</script>

<style scoped>
    #list{
        height: 100%;
        margin: 0;
        padding: 0;
        position: relative;
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>