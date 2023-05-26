<script>

export default{
    props: {
        msg: {
            type: Object, // 对象类型
            default: () => ({ // 初始值为一个函数返回的对象
            pow_gen:  1000.0,
            pow_use: 500.0
            })
        }
    },
    data() {
        return {
           half_gen: 500.0,
           pwesent_use: 0.0,
           rot_deg: -90.0,
           judge: "good" // good warning danger
        }
    },
    methods: {
        compute_data() {
            this.half_gen = this.msg.pow_gen/2;
            this.persent_use = this.msg.pow_use / this.msg.pow_gen;
            var rotate = this.persent_use - 0.5;
            if ( rotate  < 0) {
                this.rot_deg =  -90.0;
            }
            else if(rotate > 0.5){
                this.rot_deg = 90.0;
            }
            else{
                this.rot_deg = rotate * 2 * 180; // rotate * 2 * 100 * (180 / 100) 
                this.rot_deg = this.rot_deg - 90;
                // console.log(this.rot_deg, this.msg.pow_gen, this.msg.pow_use);
            }
            if(this.persent_use >= 0.75 && this.persent_use < 0.875) this.judge = "warning";
            else if (this.persent_use >= 0.875) this.judge = "danger";
            else this.judge = "good";
            console.log(this.judge, this.persent_use);
        },
        format_out(val){
            return Math.round(val*10) / 10;
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
            <img class="bg_img" src="static/icon/power/pow.png">
            <img class="ptr_img" :style="{ transform: 'translate(-50%, 50%) rotate(' + rot_deg + 'deg)' }" src="static/icon/power/pointer.png">
            <div class="cur_use" :class="judge">{{ format_out(msg.pow_use) }} </div>
            <div class="half_gen">{{ half_gen }}</div>
            <div class="pow_gen" >{{ msg.pow_gen }}</div>
        </div>

        
    </div>
</template>


<style scoped>
.image_box{
    position: relative;
    width: 100%;
    margin: 2%;
    text-align: center;
    display: block;
}

.bg_img{
    position: absolute;
    width: 75%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* border: 1px solid red; */
}

.ptr_img{
    position: absolute;
    width: 20%;
    height: 50%;
    bottom: 46%;
    left: 49.5%;
    transform-origin: bottom center;
    /* border: 1px solid blue; */
}

.cur_use{
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 20px;
}

.half_gen{
    position: absolute;
    top: 72%;
    left: 31%;
    transform: translate(-50% -50%);
}
.pow_gen{
    position: absolute;
    top: 72%;
    left: 62%;
    transform: translate(-50% -50%);
}

.good{
    font-weight: 500;
    color: black;
}

.warning{
    font-weight: 1000;
    color: goldenrod;
}

.danger{
    font-weight: 1000;
    color: red;
}
</style>