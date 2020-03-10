/*
 * 自动打开模块
 */

const { exec } = require("child_process");

function open(url) {
  let cmd = "";
  switch (process.platform) {
    case "darwin": // mac系统
      cmd = "open";
      break;

    case "win32": // windows
      cmd = "start";
      break;

    case "linux":
      cmd = "xdg-open";
      break;
  }
  exec(`${cmd} ${url}`);
}

module.exports = open;
