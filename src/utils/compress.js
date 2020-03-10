/*
 * 压缩文件模块
 */

const zlib = require("zlib");

function compress(req, res, rs) {
  let acceptEncoding = req.headers["accept-encoding"];
  if (acceptEncoding) {
    if (/\bdeflate\b/.test(acceptEncoding)) {
      res.setHeader("Content-Encoding", "deflate");
      return rs.pipe(zlib.createDeflate());
    } else if (/\bgzip\b/.test(acceptEncoding)) {
      res.setHeader("Content-Encoding", "gzip");
      return rs.pipe(zlib.createGzip());
    } else if (/\bbr\b/.test(acceptEncoding)) {
      res.setHeader("Content-Encoding", "gzip");
      return rs.pipe(zlib.createBrotliCompress());
    }
  }
  return rs;
}

module.exports = compress;
