<template>
    <div class="app-modal fadeIn" :style="{'backgroundColor' : 'rgba(0,0,0,.6)' } " v-if="flag">
        <div class="app-modal-box">
            <ul class="m-container-item">
               <li class="mint-cell" v-for="item in dataList" @click="choice(item)">
                   <div class="mod-list">
                       <div class="m-t-title">{{item.name}}</div>
                       <div class="m-t-value">{{item.code}}</div>
                   </div>
               </li> 
            </ul>
        </div>
    </div>
</template>

<script>

    export default {
        props:['showData','dataList','flag'],
        methods: {
            choice(ops) {
                var _this =this;
                    _this.flag =false;
            }
        },
    };

</script>

<style scoped>
    
</style>
