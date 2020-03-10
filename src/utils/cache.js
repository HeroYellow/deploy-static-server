/*
 * 缓存模块
 */

const etag = require("etag");

function checkCache(stats, req) {
  let ifNodeMatch = req.headers["if-none-match"];
  let ifModifiedSince = req.headers["if-modified-since"];

  let eTag = etag(stats);
  if (ifNodeMatch && ifNodeMatch === eTag) {
    return true;
  }

  let lastModified = new Date(stats.mtime).toGMTString();
  if (ifModifiedSince && ifModifiedSince === lastModified) {
    return true;
  }

  return false;
}

function setCache(stats, res) {
  // 设置强制缓存
  res.setHeader("Cache-Control", "max-age=3600, public");
  res.setHeader("Expires", new Date(Date.now() + 3600).toGMTString());

  // 设置协商缓存
  res.setHeader("Etag", etag(stats));
  res.setHeader("Last-modified", new Date(stats.mtime).toGMTString());
}

function cache(stats, req, res) {
  let isCache = checkCache(stats, req);
  if (isCache) {
    res.statusCode = 304;
    res.end();
    return true;
  }

  setCache(stats, res);
  return false;
}

module.exports = cache;
