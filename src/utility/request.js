import axios from "axios"
import router from "../router/index.js"
import config from "./config.js"

axios.defaults.withCredentials = true
const request = {
    axios,
    get: function(url, param, callback, failCallback = null){
        axios.get(config.host + url,{
            params: param
        }).then(function(res){
            if(res.data.Code == -11){
                //跳转到登录
                router.push("/login")
                return
            }
            if(res.data.Code == -1){
                if(failCallback){
                    failCallback()
                }
                alert(res.data.Msg)
            }
            if(callback){
                callback(res.data.Data)
            }
        }).catch(function(ex){
            if(failCallback){
                failCallback()
            }
            console.log(ex)
        })
    },
    getSync: async function(url, param){
        var result = await axios.get(config.host + url,{
            params: param
        })
        if(!result.data){
            return null
        }
        if(result.data.Code == -11){
            return null
        }
        if(result.data.Code == -1){
            alert(result.data.Msg)
            return null
        }
        return result.data.Data
    },
    post: function(url, param, callback, failCallback = null){
        axios.post(config.host + url, param).then(function(res){
            if(res.data.Code == -11){
                //跳转到登录
               router.push("/login")
                return
            }
            if(res.data.Code == -1){
                alert(res.data.Msg)
                if(failCallback)
                    failCallback(res)
                return
            }
            if(callback){
                callback(res.data.Data)
            }
        }).catch(function(ex){
            if(failCallback)
                    failCallback(ex)
            console.log(ex)
        })
    },
    patch: function(url, param, callback, failCallback = null){
        axios.patch(config.host + url, param).then(function(res){
            if(res.data.Code == -11){
                //跳转到登录
               router.push("/login")
                return
            }
            if(res.data.Code == -1){
                alert(res.data.Msg)
                if(failCallback)
                    failCallback(res)
                return
            }
            if(callback){
                callback(res.data.Data, res.data.Msg)
            }
        }).catch(function(ex){
            if(failCallback)
                    failCallback(ex)
            console.log(ex)
        })
    },
}



export default request