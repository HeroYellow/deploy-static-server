/*
 * 中间件模块
 */

const fs = require("fs");
const util = require("util");
const path = require("path");
const pug = require("pug");

// 引入目录模块
// const { root } = require("../config");
// 引入MIME类型模块
const getMimeType = require("../utils/mime");
// 引入compress压缩文件模块
const compress = require("../utils/compress");
// 引入cache缓存模块
const cache = require("../utils/cache");

// 把fs.stat()转换成同步 --- 判断文件或文件夹
let stat = util.promisify(fs.stat);
// 把fs.readdir()转换成同步 --- 读取文件夹
let readdir = util.promisify(fs.readdir);

module.exports = root => {
	return async (req, res) => {
		// 获取url地址栏上的请求路径 / /src /src/index.js
		let url = req.url;

		// 获取文件或文件夹路径
		// 注意: 获取的路径是 /开头的 拼接的时候需要在前面加 .
		let filePath = path.resolve(root, `.${url}`);

		try {
			// 获取fs.stat()请求成功后返回的stats参数
			let stats = await stat(filePath);
			// 判断请求的是文件夹
			if (stats.isDirectory()) {
				// 设置响应头信息
				res.statusCode = 200;
				res.setHeader("Content-Type", "text/html;charset=utf8");

				// 获取fs.readdir()请求成功后的参数files
				let files = await readdir(filePath);
				// 引入pug模板引擎
				let template = path.resolve(__dirname, "../view/index.pug");
				// 渲染模板引擎
				let html = pug.renderFile(template, {
					files,
					url
				});
				res.end(html);
				return;
			}

			// 判断请求的是文件
			if (stats.isFile()) {
				// 设置响应头
				res.statusCode = 200;
				res.setHeader("Content-Type", `${getMimeType(filePath)};charset=utf8`);

				// 流式读取文件  --- 流式才能压缩
				let rs = fs.createReadStream(filePath);
				// 压缩html/css/js/json/txt文件

				// 缓存控制
				let isCache = cache(stats, req, res);
				// 如果命中缓存，在函数中已经设置 statusCode 和 end，就不需要接着执行了
				if (isCache) return;

				if (!getMimeType(filePath).match(/(html|css|js|json|txt)/)) {
					rs = compress(req, res, rs);
				}

				// 把文件内容返回给页面
				rs.pipe(res);
				return;
			}
		} catch (e) {
			// 访问的不是有效路径
			res.statusCode = 404;
			res.setHeader("Content-Type", "text/plain;charset=utf8");
			res.end(`${url}不是文件或文件夹`);
			return;
		}
	};
};
