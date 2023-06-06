<script>
import Yellow from "/static/icon/water/yellow.png";
import Red from "/static/icon/water/red.png";
import Pink from "/static/icon/water/pink.png";
import Green from "/static/icon/water/green.png";
import Blue from "/static/icon/water/blue.png";

export default{
    props: {
        msg: {
            type: Object, // 对象类型
            default: () => ({ // 初始值为一个函数返回的对象
            number: 1,
            capacity: 1000.0,
            storage_now: 1000.0,
            storage_before: 1000.0
            })
        }
    },
    data() {
        return { 
            imgSrc: Yellow,
            imgSrcs: [
                Red,
                Pink,
                Yellow,
                Green,
                Blue
            ],
            persent: 50.0,
            change_class: 'same', // danger good same
            change_persent: 0.0
        }
    },
    methods: {
        compute_data() {
            // console.log("start")
            var storage_now = this.msg.storage_now / this.msg.capacity;
            var storage_before = this.msg.storage_before / this.msg.capacity;
            this.persent = storage_now * 100.0;
            var img_id = Math.floor(this.persent / 20);
            if(img_id < 0) img_id = 0;
            if(img_id > 4) img_id = 4;
            this.imgSrc = this.imgSrcs[img_id];
            this.change_persent = (storage_now - storage_before) * 100;
            if (this.change_persent > 0) {
                this.change_class = 'good';
            } else if (this.change_persent < 0) {
                this.change_class = 'danger';
            } else {
                this.change_class = 'same';
            }
            this.change_persent = Math.abs(this.change_persent);
        },
        format_out(val){
            return Math.round(val*10) / 10
        }
        
    },
    watch: {
        msg: {
        handler() {
            this.compute_data();
        },
        deep: true
    }
    },
    mounted() {
        this.compute_data();
    }
    
}
</script>

<template>
    <div class="wrapper">
        <div class="image_box">
            <img class="image" :src="imgSrc">
            <div class="water_amount" > {{ format_out(persent) }} % </div>
        </div>
        <div class="box">
            <div class="content" >水庫個數: &nbsp{{ msg.number }} </div>
            <div class="content" >總水量: &nbsp{{ format_out(msg.capacity) }} </div>
            <div class="content"  >現在水量: &nbsp{{ format_out(msg.storage_now)  }} </div>
            <div class="content danger" v-if="change_class=='danger'" >相比昨日水量變化: <br>  下降{{ format_out(change_persent) }}% </div>
            <div class="content good" v-else-if="change_class=='good'" >相比昨日水量變化: <br>  上升{{ format_out(change_persent)}}%</div>
            <div class="content" v-else >相比昨日水量變化: <br>  上升0.0%</div>
        </div>
    </div>
</template>


<style scoped>
.image_box{
    position: relative;
    width: 40%;
    height: width;
    margin: 2%;
    text-align: center;
    display: block;
    /* border: 1px solid green; */
}

.image{
    position: absolute;
    top:50%;
    left:80%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
    object-fit: image_box;
}

.box{
    margin: auto;
}

.water_amount{
    position: absolute;
    top:50%;
    left:80%;
    transform: translate(-50%, -50%);
    width: 100%;
    font-size: 25px;
    /* border: 1px solid sandybrown; */
}

.content{
    color: black;
    margin: auto;
}
.danger{
    color: red;
}

.good{
    color: blue;
}
</style>