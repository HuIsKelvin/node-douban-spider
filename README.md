# 基于 Node.js 的豆瓣电影爬虫小demo

> 借鉴自项目 [NodeDouBanSpider](https://github.com/GitWuJun/NodeDouBanSpider)

## 简介

直接基于接口 [https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=电影&start=80&year_range=2019,2019](https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=%E7%94%B5%E5%BD%B1&start=80&year_range=2019,2019)，简单爬取了 2019 年的 80 条电影信息（包括电影名、评分、导演、主演、评分认数等信息），整理成一个 json 文件，放在 `data` 文件夹中。

原本是想爬取信息，来做信息分析与决策的作业的，最后没用这些信息。

## 快速开始

```js
git clone git@github.com:HuIsKelvin/node-douban-spider.git

cd ./node-douban-spider

// 安装依赖
npm install

// 启动
node myApp.js
```
