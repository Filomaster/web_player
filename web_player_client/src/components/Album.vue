<template>
    <div class="album" 
            :style="{backgroundImage: `url('http://192.168.0.234:8000/images/?file=${cover}')`}"
            :class="{selected: id == getAlbumSelection()}" 
             v-on:click.stop="setSelection(id)">
            <div class="text">{{decodeTitle(title)}}</div>
            <div v-if="id == getAlbumSelection(id)" class="overlay"><i class="icofont-ui-play"></i></div>
        </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
    export default {
        name: "Album",
        props: {
            id: Number,
            title: String,
            cover: String
        },
        methods: {
            ...mapGetters(['getAlbums', 'getSelectedAlbum', 'getAlbumSelection']),

            decodeTitle: (title) => decodeURI(title),
            setSelection: function(id){
                this.$store.commit('SET_ALBUM_SELECTION', id)
                this.$store.commit('SET_SONG_SELECTION', 0)
                this.$store.dispatch('fetchAlbum', this.getSelectedAlbum().title)
                },
            // select: function(id) {this.selected = id; console.log(this.selected)}
        }
    }
</script>
<style scoped>
    .album{
        width: 100%;
        padding-top: 90%;
        position: relative;
        background-color: #151515;
        display: flex;
        background-size: cover;
    }
    .album:hover{
        background-color: white;
        cursor: pointer;
    }

    .text{
        color: #fff;
        height: 1.5em;
        padding: .1em;
        /* top: 0;*/
        bottom: 0;
        left:0;
        right: 0;
        text-align: center;
        position: absolute;
        overflow: hidden;
        background: linear-gradient(0deg, rgba(0,0,0,0.8071429255295868) 0%, rgba(0,0,0,0.10126057258841037) 100%);
    }

    .overlay{
        mix-blend-mode: overlay;
        background: radial-gradient(circle, rgba(255,255,255,.2) 0%, rgba(0,0,0,0.5) 90%);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 3em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
    }
    i{
        mix-blend-mode: screen;
        color: #fff;
        text-align: center;
    }
</style>