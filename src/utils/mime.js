/*
 * MIME类型模块
 */

const path = require("path");

let mimeTypes = {
  js: "application/javascript",
  css: "text/css",
  html: "text/html",
  txt: "text/plain",
  gif: "image/gif",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  icon: "image/x-icon",
  svg: "image/svg+xml",
  json: "application/json",
  mp3: "audio/mp3",
  mp4: "video/mp4"
};

function getMimeType(filePath) {
  // 我们需要mimeTypes的属性名 所以去掉 .
  // path.extname(文件地址): 获取文件的扩展名 .html .css .js
  return mimeTypes[path.extname(filePath).slice(1)];
}

module.exports = getMimeType;
