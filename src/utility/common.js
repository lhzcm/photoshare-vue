import md5 from "./md5.js"

const common = {
    //md5转换
    md5Convert: function(obj){
        return md5.md5(obj)
    },
    //数组分组
    arrayChunk: function(array, nums){
        var target = []
        for(let i = 0; i < array.length; i+=nums){
            target.push(new Array())
        }
        for(let i = 0; i < array.length; i++){
            target[parseInt(i/nums)].push(array[i])
        }
        return target
    }
}

export default common