<script>
import { RouterLink, RouterView } from 'vue-router'

export default{
    data() {
        return {
            title: ["桃園", "竹科", "中科", "南科"]
        }
    }
}
    
</script>

<template>
    <div class="frame">
        <div class="title">
            <div class="content" v-for="name in title">{{ name }}</div>
        </div>
        <a class="water box" href="/water">
            <div >
                <div class="cl_name">水量(萬立方公尺)</div>
            </div>
        </a>
        <a class="power box" href="/power">
            <div >
                <div class="cl_name">電力(萬瓩)</div>
            </div>
        </a>    
        <a class="earthquake box" href="/earthquake">
            <div >
                <div class="cl_name">最近地震</div>
            </div>
        </a>
        
    </div>
</template>

<style scoped>
.frame{
    width: 100%;
    height: fit-content;
    display: flex;
}

.title{
   width: 200px;
   margin-top: 5%;
   margin-right: 5%;
   background-color: aqua;
}

.box{
    display: block;
    margin-right: 3%;
}

.power{
    width: 25%;
    background-color: pink;
}

.water{
    width: 25%;
    background-color: aquamarine;
}

.earthquake{
    width: 25%;
    background-color: bisque;
}
.content{
    margin: auto;
    padding: 25% 0%;
}

.cl_name{
    text-decoration: none !important;
    text-align: center;
    padding-top: 5%;
    height: 5%;
    color: black;
    font-size: 25px;
    font-weight: bold;
}
</style>