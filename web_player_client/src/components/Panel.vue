<template>
    <div class="Controls">
        <div class="buttons">
            <div><i class="icofont-ui-previous"></i></div>
            <div><i class="icofont-ui-play"></i></div>
            <div><i class="icofont-ui-next"></i></div>

        </div>
    </div>
</template>
<script>
    export default {
        name: "Panel"
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