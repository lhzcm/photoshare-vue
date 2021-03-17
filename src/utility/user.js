import request from "./request.js"

const user = {
    userInfo : null,
    getUserInfo: async function(){
        if(this.userInfo){
            return this.userInfo
        }
        //获取用户信息
        this.userInfo = await request.getSync("user/info","")
        console.log(this.userInfo)
        return this.userInfo
    }
}

export default user