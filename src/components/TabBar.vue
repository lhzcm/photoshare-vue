<template>
    <div v-if="isShow" class="tabbar">
        <!-- <div><span class="iconfont icon-earth-full"></span></div>
        <div><span class="iconfont icon-dongtai"></span></div>
        <div><span class="iconfont icon-fabu"></span></div>
        <div><span class="iconfont icon-liaotian"></span></div>
        <div><span class="iconfont icon-wo"></span></div> -->
        <div v-for="(item, index) in menus" :key="index">
            <router-link :to="item.path">
                <span :class="item.icon + (item.active ? ' active':'')"></span>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            menus:[{
                icon: "iconfont icon-earth-full",
                name: "星球",
                path: "/earth",
                paths: ["/earth"],
                active: false
            },{
                icon: "iconfont icon-dongtai",
                name: "动态",
                path: "/dynamic",
                paths: ["/dynamic"],
                active: false
            },{
                icon: "iconfont icon-fabu",
                name: "发布",
                path: "/publish",
                paths: ["/publish"],
                active: false
            },{
                icon: "iconfont icon-liaotian",
                name: "聊天",
                path: "/friends",
                paths: ["/friends", "/chat/:id"],
                active: false
            },{
                icon: "iconfont icon-wo",
                name: "我的",
                path: "/mine",
                paths: ["/mine","/invite"],
                active: false
            }],
            isShow: true
        }
    },
    watch:{
        "$route": "tabChange"
    },
    methods:{
        tabChange:function(){
            var targetPath =  this.$route.matched[0].path
           
            this.menus.forEach((item)=>{
                if(item.paths.find((n)=>n == targetPath)){
                     console.log(targetPath)
                    item.active = true;
                }else{
                    item.active = false;
                }
            })

            if(this.$route.matched[0].path == '/login' || this.$route.matched[0].path == '/register'){
                this.isShow = false
            }else{
                this.isShow = true
            }

        }
    }
}
</script>

<style src="../static/icon/iconfont.css" scoped></style>
<style scoped>
.tabbar{
    height: 44px;
    width: 100%;
    background-color:red;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.tabbar div{
    width: 20%;
    line-height: 44px;
}
.tabbar div span{
    font-size: 24px;
    text-decoration: none;
    color:white
}
.active{
    color: yellow !important;
}
a{
        text-decoration: none;
}
</style>