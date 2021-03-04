<template>
    <div class="content">
        <div class="panel">
            <div>
                <span class="iconfont icon-yonghu"></span>
                <input type="text"/>
            </div>
            <div>
                <span class="iconfont icon-suo"></span>
                <input type="text"/>
            </div>
            <div>
                <button>注册</button>
                <button>登录</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped src="../static/icon/iconfont.css">
</style>

<style scoped>

.content{
    width:100%;
    height: 100%;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.panel{
    width: 30rem;
    height: 30rem;
    border: 1px aliceblue solid;
    background-color:#f4f4f4;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.panel div{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.panel div span{
    color:gray;
    margin-right: 5px;
    font-size: 1.8rem;
}
.panel div input{
    width: 16rem;
    height: 2rem;
    border: 1px grey solid;
    border-radius: .5rem;
}
.panel div input:first-of-type{
        margin-bottom: 2rem;
}

.panel div button{
    width: 6rem;
    height: 2.4rem;
    border: 1px grey solid;
    background-color: #d8544c;
    border-radius: 1rem;
    color: white;
    margin: 0 1rem;
    font-size: 1rem;
}
</style>