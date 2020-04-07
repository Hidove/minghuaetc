## 说明

* 该程序是本人在大学期间用于学校网课系统（名华在线）挂机用，请勿用于非法用途。
* 骗钱、贩卖什么的的最讨厌了。
* 博客地址：<https://blog.hidove.cn/post/616>
* 支持作者的可以去博客也打赏，O(∩_∩)O~~~
* 有问题的可以在博客文章处留言

## 版本特性

* 自动播放
* 全自动挂机
* 自动发送模拟鼠标记录
* 自动识别验证码
* 自动跳转到下一课
* 去除多标签刷课的限制
* 去除无法拉进度条的限制
* 等等

## 使用

#### 首先需要安装`Tampermonkey`

<https://www.baidu.com/s?wd=Tampermonkey%E6%80%8E%E4%B9%88%E5%AE%89%E8%A3%85>

#### 配置一下浏览器

* 鼠标右键->检查  打开控制台

* 添加Request Blocking （禁止名华自己的代码执行）
##### 下方示意图为添加`Request Blocking`的教程

![](https://pic.abcyun.co/image/5e85ec8077c09.jpg)

![](https://pic.abcyun.co/image/5e85ec8077111.jpg)

![](https://pic.abcyun.co/image/5e85ec8076876.jpg)

#### 安装脚本
* 新建脚本
* 粘贴下方代码
* 保存代码
* 刷新网页
* 运行油猴脚本

> 注意： 请始终打开控制台！运行信息将会在控制台输出！
> 多门课程同时刷，需要每个浏览器标签都开启脚本！

```
// ==UserScript==
// @name         Hidove名华在线老实挂机版
// @namespace    https://www.hidove.cn/
// @version      2.3
// @description  名华在线网课全自动挂机脚本，支持验证码识别
// @author       Hidove 余生
// @include      *.minghuaetc.com/user/node*
// @supportURL   https://blog.hidove.cn/post/616
// ==/UserScript==

var script = document.createElement("script");

var head = document.getElementsByTagName('body')[0];

script.type = "text/javascript";
script.src = "//cdn.jsdelivr.net/gh/Hidove/minghuaetc@2.3/main.js?v=" + new Date().getTime();

head.appendChild(script);
```

## 补看脚本

#### 说明

* 同时看多个，名华的系统可能会漏掉，所以我又写了一个补漏的脚本。
* 用于补看漏掉的课时。和上方脚本功能一致
* 只不过是用来补看漏掉的课时，需要手动获取需要补看的课时的`id`

#### 使用

* 首先 需要获取所有`未看`or`未看完``课时`的`nodeId`。
* 然后填写到脚本本中的`noIdList`变量中，12行，有注释，请看注释。
* 之后操作和之前一致。
* 先随便打开一个已看完的课时，重要！！！脚本会自动跳转到第一个课时开始看起！
* 因为如果是未看完的课时，脚本会认为该课时之前的课时都已经看过了！！！只会看后面的课时！！！
* 下方有快速获取`nodeId`的方法。

```
// ==UserScript==
// @name         Hidove名华在线老实挂机版_补看
// @namespace    https://www.hidove.cn/
// @version      2.3
// @description  名华在线网课全自动挂机脚本，支持验证码识别
// @author       Hidove 余生
// @include      *.minghuaetc.com/user/node*
// @supportURL   https://blog.hidove.cn/post/616
// ==/UserScript==

//这里填写需要看的课程ID（nodeId），请先删除原来的示例。
var noIdList = [ "1118520","1118521"];

var script = document.createElement("script");

var head = document.getElementsByTagName('body')[0];

var div = document.createElement("div");
div.setAttribute("hidden","hidden");
div.innerText=JSON.stringify(noIdList);
div.setAttribute("id","HidoveNoIdList");
head.appendChild(div)

script.type = "text/javascript";
script.src = "//cdn.jsdelivr.net/gh/Hidove/minghuaetc@2.3/bk_main.js?v=" + new Date().getTime();

head.appendChild(script);
```

#### 快速获取`nodeId`

* 进入个人中心
* 选择一个课程
* 点击学习记录
* 进入学习记录后，打开控制台，粘贴下方代码，回车，即可快速获取`未看完`or`未看完`的`nodeId`
* 不懂可以查看下方`示意图`

```
let courseId = 0;
let nodeIdList = [];
let vars = window.location.search.substring(1).split("&");
for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == "courseId") {
                courseId =  pair[1];
        }
}
$.ajax({
        url: 'http://www.minghuaetc.com/user/study_record.json',
        async: false,
        data: {
                state: 0,
                courseId: courseId,
        },
        dataType: "json",
        success: function (res) {
                for (let key in res.list) {
                        nodeIdList.push(res.list[key]["id"]);
                }
        }
});
$.ajax({
        url: 'http://www.minghuaetc.com/user/study_record.json',
        async: false,
        data: {
                state: 1,
                courseId: courseId,
        },
        dataType: "json",
        success: function (res) {
                for (let key in res.list) {
                        nodeIdList.push(res.list[key]["id"]);
                }
        }
});
console.log(nodeIdList);
```
##### 示意图
![](https://pic.abcyun.co/image/5e8c364232d52.jpg)
![](https://pic.abcyun.co/image/5e8c36425104a.jpg)