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

##### 安装脚本
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
// @version      2.1
// @description  名华在线网课全自动挂机脚本，支持验证码识别
// @author       Hidove 余生
// @include      *.minghuaetc.com/user/node?nodeId=*
// @supportURL   https://blog.hidove.cn/post/616
// ==/UserScript==

var script = document.createElement("script");

var head = document.getElementsByTagName('body')[0];

script.type = "text/javascript";
script.src = "//cdn.jsdelivr.net/gh/Hidove/minghuaetc/main.js?v=" + new Date().getTime();

head.appendChild(script);
```