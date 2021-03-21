import request from "./request.js"

const user = {
    userInfo : null,
    friends : null,
    getUserInfo: async function(){
        if(this.userInfo){
            return this.userInfo
        }
        //获取用户信息
        this.userInfo = await request.getSync("/user/info","")
        console.log(this.userInfo)
        return this.userInfo
    },
    getUserInfoCallBack: function(func){
        if(!func) return
        if(this.userInfo){
            func(this.userInfo)
            return
        }
        var that = this
        request.get("/user/info", "", function(res){
            that.userInfo = res
            func(res)
        })
    },
    getFriendById: function(id){
        if(!this.friends)
            return null
        return this.friends.find((item)=> item.Id == id)
    }
}

export default user