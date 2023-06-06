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
            titles: [ "震源" , "廠區震度", "PGA", "PGV" ,  "發生時間"],
            datas: []
        }
    },
    mounted() {
        this.fetchData(); // 页面加载时执行 GET 请求
        this.setDefaultTime();
    },
    watch: {
        // 监听 apiData 的变化，在数据变化时执行 GET 请求
        apiData: {
            handler() {
                this.fetchData();
            },
        deep: true,
        },
        start_time: {
            handler() {
                this.fetchData();
            },
        deep: true,
        },
        end_time: {
            handler() {
                this.fetchData();
            },
        deep: true,
        },
        position: {
            handler() {
                this.fetchData();
            },
        deep: true,
        }
    },
    methods: {
        fetchData() {
            var url = this.apiurl;
            url += "/earthquake?start="+ this.start_time + "&end=" + this.end_time;
            console.log(url);
            axios.get(url, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
                }).then(response => {
                    this.apiDatas = response.data;
                    var apidata = this.apiDatas[this.position];
                    this.computeDatas(apidata);
                    
                }).catch(error => {
                    console.error(error);
                });
        },
        setDefaultTime(){
            let now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth()+1;
            var last_month = now.getMonth();
            var day = now.getDate();
            this.end_time = this.formate_date(year, month, day);
            this.start_time = this.formate_date(year, last_month, day);
        },
        formate_date(y, m, d){
            var date = y;
            if(m < 10){
                date += "-0" + m;
            }
            else{
                date += "-" + m;
            }
            if(d < 10) {
                date += "-0" + d;
            }
            else {
                date += "-" + d;
            }
            return date;
        },
        computeDatas(apidata){
            console.log(apidata);
            
            // this.datas = [];
            for(var i=0; i<apidata.length; i++){
                let data = {
                    source: "",
                    deg: 1,
                    pga: 1.0,
                    pgv: 1.0,
                    time: ""
                }
                data.source = apidata[i].source;
                data.pga = apidata[i].pga;
                data.pgv = apidata[i].pgv;
                data.deg = this.compute_deg(data.pga);
                data.time = apidata[i].observed_time;
                this.datas.push(data); 
            }
              
            console.log(this.datas);
        },
        compute_deg(pga){
            var level = [0, 0.8, 2.5, 8.0, 25, 80, 250, 800];
            for(var i=0; i<8; i++){
                if(pga < level[i]) {
                    return i-1;
                }
            }
        }
    }
}
    
</script>

<template>
    <div class="frame ">
        <div class="hint_info">現在顯示的資料為<span style="color:coral; font-weight: bold;">{{this.position}}</span>廠區的資料(按時間順序新到舊排列)</div>
        <div class="table-box">
            <table class="tb">
                <thead>
                    <tr>
                        <td v-for="title in titles">{{ title }}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in datas">
                        <td v-for="item in data">{{ item }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="inputBlock start">
        <label>開始時間：</label>
        <br />
        <input v-model="start_time" type="date" />
        </div>
        <div class="inputBlock end">
        <label>結束時間：</label>
        <br/>
        <input v-model="end_time" type="date"/>
        </div>
        <div class="inputBlock pos">
        <label>廠區：</label>
        <br/>
        <select class="select_box" v-model="position">
            <option selected>新竹</option>
            <option>臺中</option>
            <option>臺南</option>
        </select>
        </div>
    </div>
</template>

<style scoped>
.frame{
    width:auto;
    height: 100%;
    margin: 0px;
}

.hint_info{
    text-align: center;
    padding: 20px;
    font-size: 20px;
    font-style: italic;
}

table{
    /* border:1px solid gray; */
    width: 100%;
    margin: auto;
    padding: auto;
    table-layout: fixed;
    
}

td, th{
    border: 1px solid gray;
    text-align: center;
    height: 30px;
}

.table-box{
    overflow-y: auto;
    height: 400px;
    width: 80%;
    margin: auto;
}

.table-box thead {
    position: sticky;
    top: 0;
    font-weight: bold;
    border: 1px solid gray;
    z-index: 1;
    background-color: #97CBFF;
}

.inputBlock {
    padding: 3em;
    width: auto;
    height: 20%;
    position: fixed;
}

.start{
    left: 50px;
    bottom: 40px;
}

.end{
    left:250px;
    bottom: 40px;
}

.pos{
    left:450px;
    bottom: 40px;
}

input, select{
    width: 150px;
}
</style>