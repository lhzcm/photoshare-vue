const host =  "127.0.0.1:9090"
//const host = "www.onlinemusic.top:9090"
const config = {
    host : "http://" + host,
    ws: "ws://" + host,
    imageBaseUrl: "http://" + host + "/static/msgimg/",
    publishImgUrl: "http://" + host + "/static/publishimg/"
}

export default config