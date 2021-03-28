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
        <div class="scroll">
        <table>
            <tr 
                v-for="song in getSongs()" :key="song.id" 
                v-on:click="setSelection(song.id)"
                :class="{selected: isCurrent(song.file)}">
                    <td class="nr">{{song.id}}</td>
                    <td class="status"><i v-if="isCurrent(song.file)" class="icofont-ui-play"></i></td>
                    <td class="title">{{decodeTitle(song.file)}}</td>
                    <td class="album">{{albumTitle}}</td>
                    <td class="size">{{decodeSize(song.size)}}</td>
                    <td class="favourites"><i class="icofont-star"></i></td>
            </tr>
        </table>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapMutations } from "vuex";
    export default {
        name: "SongList",
        computed: {
            albumTitle () { return decodeURI(this.getAlbums()[this.getAlbumSelection()-1].title)}
        },
        methods: {
            ...mapGetters(["getSongs", "getAlbums", "getSongSelection","getAlbumSelection", "getCurrentSong"]),
            ...mapMutations({setSelection: 'SET_CURRENT_SONG'}),
            decodeTitle: (file) => decodeURI(file).trim()
                .replace(/(^\d+ - )/,"")
                .replace(/(^\d+\.)/,"")
                .replace(/(^\d+ )/,"")
                .replace(".mp3", ""),
            decodeSize: (size) => ((size/(1024**2)).toFixed(2) + " MB"),
            isCurrent (song) {
                return this.getAlbums()[this.getAlbumSelection()-1].title + "/" + song === this.getCurrentSong()}
        }
    }
</script>
<style scoped>
.Songs{
    overflow: hidden;
}
    .scroll{
        height: 95%;
        overflow-y: scroll;
    }
    table{
        text-align: center;
        width: 100%;
        border-collapse: collapse;
    }
    tr{
        color: #fff;
        font-size: 1em;
     background-color: #333;
    }
    td{
        padding: 0.5em;
    }
    tr:nth-child(even){
        background-color: #222;
    }
    tr:hover, tr:nth-child(even):hover{
        background-color: rgba(204, 158, 73);
        color: #000;
        cursor: pointer;
    }
    .selected{
        color: rgba(204, 158, 73);
    }
    th{
        background-color: #151515;
        color: rgb(204, 158, 73);
        font-size: 1.25em;
        cursor: default;

    }
    .nr { width: 5% }
    .album { width: 30% }
    .title { width: 50% }
    td.title {text-align: left; padding-left: 2em;}
    .size { width: 10% }
    .status { width: 1% }
    .favourites { width: 4% }
</style>