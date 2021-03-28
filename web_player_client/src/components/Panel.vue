<template>
    <div class="Controls">
        <audio id="player" ref="player" >
            <source :src="track" id="audio_src" type="audio/mp3"/>
        </audio>
        <div v-if="player" class="buttons">
            <div><i class="icofont-ui-previous"></i></div>
            <div v-on:click="toogleAudio()">
                <i v-if="!isPlaying" class="icofont-ui-play"></i>
                <i v-else class="icofont-ui-pause"></i>
            </div>
            <div><i class="icofont-ui-next"></i></div>
        </div>
        <div class="songInfo">
            <div class="songName"></div>
        </div>
    </div>
</template>

<script>
    
    export default {
        name: "Panel",
        data () {
            return{
                player: undefined,
                isPlaying: false,
            }
        },
        props: {
            track: String
        },
        methods: {
            toogleAudio () {
                if(player.paused){
                    player.play()
                    this.isPlaying = true
                }else{
                    player.pause()
                    this.isPlaying = false
                } 
            }
        },
        mounted (){
            this.$watch('track', ()=> {
                this.$refs.player.autoplay = true;
                this.$refs.player.load();
                this.isPlaying = true
            })
                this.player = this.$refs.player;
        },
    }
</script>
<style scoped>
    .Controls{
        background-color: #0a0a0a;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .buttons{
        width: 25%;
        display: flex;
        justify-content: space-around;
        color: #555
        /* color: rgba(204, 158, 73); */
    }
    i{ font-size: 2.5em }
    i:hover{ color: rgba(204, 158, 73); cursor: pointer; }
    i:active{ color: #fff }
</style>