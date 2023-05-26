<script>

export default{
    props: {
        msg: {
            type: Object, // 对象类型
            default: () => ({ // 初始值为一个函数返回的对象
            deg: 3
            })
        }
    },
    data() {
        return {
           img_route: "static/icon/earthquake/green.png",
           judge: "good"
        }
    },
    methods: {
        compute_data() {
            if(this.msg.deg < 4) {
                this.img_route = "static/icon/earthquake/green.png";
                this.judge = "good";
            }
            else if(this.msg.deg > 5) {
                this.img_route = "static/icon/earthquake/red.png";
                this.judge = "danger";
            }
            else {
                this.img_route = "static/icon/earthquake/yellow.png";
                this.judge = "warning";
            }
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
            <img class="image" :src="img_route">
            <div class="text" :class="judge" >廠區震度: {{msg.deg}}</div>
        </div>
    </div>
</template>


<style scoped>
.image_box{
    position: relative;
    width: 60%;
    margin: 2%;
    text-align: center;
    display: block;
    /* border: 1px solid green; */
}

.image{
    position: absolute;
    top: 40%;
    left: 0%;
    width: 12%;
    height: 20%;
}

.text{
    position: absolute;
    top: 50%;
    left: 35%;
    transform: translate(-50%, -50%);
    font-size: 25px;
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