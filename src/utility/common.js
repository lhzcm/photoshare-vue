import md5 from "./md5.js"

const imgExifInfo = {
    "Make": "设备厂商",
    "Model": "型号",
    "ExposureTime": "曝光时间",
    "FNumber": "光圈值",
    "ISOSpeedRatings": "感光度",
    "ApertureValue": "镜头光圈",
    "FocalLength": "焦距",
    "ShutterSpeedValue": "快门速度",
    "LensMake": "镜头厂商",
    "LensModel": "镜头型号",
}

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
    },
    //获取图片信息字段
    getImgExifFiel: function(fiel){
        return imgExifInfo[fiel]
    }
}

export default common