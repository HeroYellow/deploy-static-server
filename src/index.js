const http = require("http");
const chalk = require("chalk");

// 引入中间件模块
const middleware = require("./middleware");
// 引入配置模块
const defaultConfig = require("./config");
// 引入自动打开模块
// const open = require("./utils/open");
// 引入命令行配置
const argv = require("./cli");

let config = Object.assign({}, defaultConfig, argv);

let { port, host, root } = config;

// 创建服务器
const server = http.createServer(middleware(root));
// 访问服务器路径
let url = `http://${host}:${port}`;
// 设置监听端口号
server.listen(port, host, err => {
	if (err) {
		console.log(chalk.red("服务器启动失败"));
		return;
	}
	console.log(
		chalk.green("服务器启动成功，请访问") + chalk.underline.bold.yellow(url)
	);

	// 自动打开网页
	// open(url);
});
