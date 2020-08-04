
let host = "https://weixin.abzc.net";
// let host = 'http://192.168.1.233:7500'
function post(url, data, callback) {
    $.ajax({
        url: host + url,
        data: data,
        type: "post",
        contentType: "application/x-www-form-urlencoded",
        headers: { 'token': localStorage.getItem("token") },
        resultType: "JSON",
        success: function (res) {
            callback(res);
        },
        fail: function (res) {
            console.log('get:', res);
            callback(res);
        },
        complete: function (res) {
            checkToken(res);
        }
    })
}

function get(url, data, callback) {
    $.ajax({
        url: host + url,
        data: data,
        type: "get",
        contentType: "application/x-www-form-urlencoded",
        headers: { 'token': localStorage.getItem("token") },
        resultType: "JSON",
        success: function (res) {
            console.log('get:', window.location.href);
            callback(res);
        },
        fail: function (res) {
            console.log('get:', res);
            callback(res);
        },
        complete: function (res) {
            checkToken(res);
        }
    })
}

export default {
    post, get
}