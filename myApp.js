/* 
 * 通过豆瓣获取一定年份的电影信息
 */

"ust strict";

//用于读写数据的库
const fs = require('fs')
//用于解析url的库=
const url = require('url')
//异步处理函数库
// const async = require('async')
//像jQuery一样解析操作DOM的库
const cheerio = require('cheerio');
//基础url
// const baseUrl = 'https://movie.douban.com/top250'
// start 就是开始请求的条目index，一次请求20个条目
// 2018年数据
const baseUrl = "https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=%E7%94%B5%E5%BD%B1&start=80&year_range=2019,2019"

// 结果
let resultMovies = [];

//通过发送请求，获取基础数据
const sendRequest = (startIndex) => {
	const http = require("https");
	let path = "/j/new_search_subjects?sort=U&range=0,10&tags=%E7%94%B5%E5%BD%B1&start="+ startIndex +"&year_range=2018,2018"
	let reqOption = {
		hostname: "movie.douban.com",
		// path: "/j/new_search_subjects?sort=U&range=0,10&tags=%E7%94%B5%E5%BD%B1&start=80&year_range=2018,2018",
		path: path,
		method: "GET",
	}
	let req = http.request(reqOption, res => {
		if (res.statusCode == 200) {
			console.log("-------------------");
			// console.log(res);
			console.log("-------------------");
			
			var mydata = []
			res.setEncoding("utf-8");
			res.on('data', resData => {
				dataArray = JSON.parse(resData).data;
				// console.log(dataArray)
				// mydata = [...mydata, ...dataArray]
				mydata.push(...dataArray);
				resultMovies.push(...dataArray);
				// mydata.push((JSON.parse(resData)));
				// console.log(resData.toString());
			})

			//请求结束
			res.on('end', () => {
				//结束后，将buffer转换成字符串传入到成功回调中
				if (mydata) {
					let resultString = JSON.stringify(resultMovies);
					let filePath = "./data";
					creatDir(filePath)
						.then(res => {
							writeFile(res, resultString);
							console.log("num of result: " + resultMovies.length);
						})
						.catch(err =>{ console.log(err) })
				}
			})
		} else {
			console.log(`请求发生错误:ErrorCode:${res.statusCode}`)
		}

	});

	// 关闭request
	req.end();
}

//创建文件夹--返回一个promise对象，可以进行链式调用
const creatDir = (dirPath) => {
	return new Promise((resolve, reject) => {
		fs.exists(dirPath,exist => {
			if (!exist) {											//文件夹不存在
				fs.mkdir(dirPath, err => {
					if (err) {
						console.log(`创建文件夹失败:${err}`)
						reject(`创建文件夹失败:${err}`)
					}else{
						resolve(dirPath)
					}
				})
			} else {
				resolve(dirPath)
			}
		})
	})
}

//将json格式的数据以txt的形式存入到本地
const writeFile = (dirPath, data)=>{
	//文件路径拼接
	let filePath = `${dirPath}/data.json`
	fs.writeFile(filePath, data, (err)=>{
		if (err) {
			console.log("输出文件失败");
		}else{
			console.log("输出文件完成！"); 
		}
	})
}

const myfunction = ()=> {
	console.log("start");
	for(let i = 0; i < 4; i++) {
		sendRequest(i * 20);
	}
	// sendRequest(20);
	// sendRequest(60);
	// console.log(resultMovies);
}

myfunction();