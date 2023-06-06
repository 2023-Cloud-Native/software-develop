<script>
import axios from 'axios';

axios.defaults.timeout = 8000;

export default{
    components: {
    },
    data() {
        return {
            apiurl: "http://localhost:3000/api",
            apiData: {},
            start_time: "",
            end_time: "",
            position: "新竹",
            titles: [ "震源" , "廠區震度",  "發生時間", "PGA", "PGV" ],
            datas: []
        }
    },
    mounted() {
        this.fetchData(); // 页面加载时执行 GET 请求
    },
    watch: {
        // 监听 apiData 的变化，在数据变化时执行 GET 请求
        apiData: {
            handler() {
                this.fetchData();
            },
        deep: true,
        },
    },
    methods: {
        fetchData() {
            var status ;
            axios.get(this.apiurl, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
                }).then(response => {
                    this.apiData = response.data;
                    // Convert Proxy objects to JSON and parse it back            
                }).catch(error => {
                    console.error(error);
                });
        }
       
    }
}
    
</script>

<template>
    <div class="frame ">
        <div class="hint_info">現在顯示的資料為<span style="color:coral; font-weight: bold;">{{position}}</span>廠區的資料(按時間順序排列)</div>
        <table class="tb">
            <thead>
                <tr>
                    <td v-for="title in titles">{{ title }}</td>
                </tr>
            </thead>
        </table>
    </div>
</template>

<style scoped>
.frame{
    width:auto;
    height: fit-content;
    margin: 0px;
}

.hint_info{
    text-align: center;
    padding: 20px;
    font-size: 20px;
    font-style: italic;
    color:brown;
}

.tb{
    border:1px solid gray;
    width: 80%;
    margin: auto;
    padding: auto;
    font-weight: bold;

}

th,td{
    border: 1px solid gray;
}

a{
    text-decoration: none !important;
    color: black;
    display: block;
}


</style>