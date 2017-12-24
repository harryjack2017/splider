/**
 *   Created By NodeFly ON 2017/12/24
 *   DESC:
 */

const express = require("express");
let http = require("http");
const app = express();
const querystring = require("querystring");
const request = require("request");


function httpGet(host, path, data, isHttps) {
    let options = {
        host: host,
        port: 80,
        path: path + querystring.stringify(data),
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    if (isHttps) {
        option.port = 443;
        http = require("https");
    }
    return new Promise(function (resolve, reject) {
        let body = "";
        var getRequest = http.request(options, res => {
            res.setEncoding("utf-8");
            res.on("data", chunk => {
                body += chunk;
            })
            res.on("end", () => {
                resolve(body)
            })
            res.on("error", err => {
                reject(err);
            })
        })
        getRequest.end();
    })
}

function httpPost(host, path, data, isHttps) {
    var data = querystring.stringify(data);
    var options = {
        host: host,
        data: data,
        path: path,
        port: '80',
        method: "POST",
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
            "Content-Length": Buffer.byteLength(data)
        }
    }
    if (isHttps) {
        options.port = 443;
        http = require("https");
    }
    return new Promise(function (resolve, reject) {
        let body = "";
        let postRequest = http.request(options, res => {
            res.on("data", chunk => {
                body += chunk;
            })
            res.on("end", () => {
                resolve(body);
            })
            res.on("error", err => {
                reject(err);
            })
        })
        postRequest.write(data);
        postRequest.end();
    })
}

module.exports = {
    httpGet,
    httpPost
}