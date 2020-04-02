// ==UserScript==
// @name         Hidove名华在线刷课好好学习版
// @namespace    https://www.hidove.cn/
// @version      1.0
// @description  老老实实刷满时长，自动切换课程
// @author       Hidove 余生
// @include      *.minghuaetc.com/user/*
// @grant        none
// ==/UserScript==

var updateTime = '2019年11月23日14:06:41';
(window.onload=function() {
    'use strict';
    if (window.console && window.console.log) {
        console.clear();
        console.log("%c 当前版本：Hidove名华在线刷课好好学习版 %c https://blog.hidove.cn ","color: #fadfa3; background: #030307; padding:5px 0;","background: #fadfa3; padding:5px 0;");
        
        console.log("%c 最后更新时间：" + updateTime + " ","color: #fff; margin: 1em 0; padding: 5px 0; background: #3498db;");

        console.log("%c 本脚本永久免费，如果你是购买的那么说明你被骗了","color: #fff; margin: 1em 0; padding: 5px 0; background: #ffa9be;");

        console.log("%c 脚本加载完成 当前时间：" + new Date(),"color: #fff; margin: 1em 0; padding: 5px 0; background: #673ab7;");
    }
    var IdList = getIdList();
    if (judgementState(IdList)){
        //主要执行方法
        jwplayer("mediaplayer").onComplete(function(){
            print("播放完成");
            var fn = jwplayer("mediaplayer").getDuration();
            print("视频长度为"+fn+"秒");
            if (isOver(IdList,getCurrentId())) {
                print("恭喜你，已全部刷完");
            }else{
                print("2秒后跳转下一部");
                setTimeout(function(){
                    window.location.href = getFullUrl(getNextId(IdList,getCurrentId()));
                },2000);
            }
        });
    }

});

//获取当前状态，判断是否为播放页
function judgementState(IdList){
    if (document.getElementsByClassName("intro-content").length != 0) {
        print("前面的章节还没有学完，此章节不能观看！2秒后返回上一部");
        setTimeout(function(){
            window.location.href = getFullUrl(getLastId(IdList,getCurrentId()));
        },2000);
        return false;
    }else if(document.getElementById('enterObjectExamDiv') != null){
        if (isOver(IdList,getCurrentId())) {
            print("恭喜你，已全部刷完");
            return false;
        }else{
            print("当前为章节测验，2秒后跳过");
            setTimeout(function(){
                window.location.href = getFullUrl(getNextId(IdList,getCurrentId()));
            },2000);
            return false;
        }
    }else if(document.getElementsByClassName("view-video").length != 1){
        print("出现异常，2秒后跳转到正确页面");
        setTimeout(function(){
            window.location.href = getFullUrl(getNearId(IdList,getCurrentId()));
        },2000);
        return false;
    }else{
        //强制播放播放
        jwplayer("mediaplayer").play(false);
        jwplayer("mediaplayer").play(true); 
        return true;
    }
}
function print(msg){
    if (window.console && window.console.log) {
        console.log("%c " + msg,"color: #fff; margin: 1em 0; padding: 5px 0; background: #00a9e0;");
    }
}
//获取当前课程所有id数组
function getIdList(){
    var list = document.getElementsByClassName("sub-nav-text");
    var arr = [];
    for(var i = 0; i < list.length; i++) {
        var obj = list[i];
        var unitid = obj.getAttribute("unitid");
        arr.push(unitid);
    }
    return arr;
}
//获取当前Id
function getCurrentId(){
    var url = window.location.href;
    var urlt = url.split('/');
    var temp = urlt.pop();
    var currentId =  Number(temp.split('.')[0]);
    return currentId;
}
//获取上一个Id
function getLastId(IdList,id){
    for (var i in IdList) {
        if (IdList[i] == id) {
            return IdList[Number(i)-1];
        }
    }
    print("获取上一个Id失败");
    return getCurrentId();
}
//获取下一个Id
function getNextId(IdList,id){
    for (var i in IdList) {
        if (IdList[i] == id) {
            return IdList[Number(i)+1];
        }
    }
    print("获取下一个Id失败");
    return getCurrentId();
}
//获取最近Id
function getNearId(IdList,id){
    for (var i in IdList) {
        if (IdList[i] > id && i != 0) {
            return IdList[Number(i)-1];
        }
    }
    print("获取最近Id失败，跳转第一课");
    return IdList[0];
}
//判断是否学完
function isOver(IdList,id){
    if(IdList[IdList.length - 1] == id){
        return true;
    }
    return false;
}
//拼接完整课程Url
function getFullUrl(id){
    var url = window.location.href;
    var urlt = url.split('/');
    urlt.pop();
    var urln = urlt.toString().replace(/,/g,'/');
    var newurl = urln + '/'+ id + '.mooc'
    return newurl;
}