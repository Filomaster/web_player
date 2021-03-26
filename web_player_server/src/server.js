//  Author: Filip Majorek 3iB
// Description: Main file of the api server, which provide data for Vue client

"use strict";

const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");

const { out } = require("./utils");
const musicManager = require("./musicManager");
const { fstat } = require("fs");
out.checkColors();

const PORT = process.env.PORT || 8000;

let router = {
  setHeaders: function (res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return res;
  },
  getPostBody: function (req) {
    return new Promise((resolve, reject) => {
      let body = "";
      req.on("data", (data) => (body += data));
      req.on("end", () => resolve(JSON.parse(body)));
    });
  },
  post: function (link, callback, req) {
    if (req.method == "POST" && req.url == link) {
      callback();
    }
  },
  get: function (link, callback, req) {
    if (req.method == "GET" && req.url == link) {
      callback();
    }
  },
};

const server = http.createServer(function (req, res) {
  // console.log(req.method);
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res = router.setHeaders(res);
  switch (req.method) {
    case "GET":
      let parsedUrl = url.parse(req.url, true);
      // console.log(req.method, parsedUrl);
      let resType;
      switch (parsedUrl.pathname) {
        case "/images/":
          let file = parsedUrl.query.file ?? "default";
          resType =
            "image/" + (file === "default" ? "png" : file.match(/\..{3}$/)[0].replace(".", ""));
          res.setHeader("Content-Type", resType);
          let filePath =
            file === "default"
              ? path.join(__dirname, "../static/default.png")
              : path.join(__dirname, "../static/mp3/", file);
          musicManager.getFile(filePath).then((data) => {
            res.write(data);
            res.end();
          });
          break;
      }

      break;
    case "POST":
      router.getPostBody(req).then((body) => {
        res.setHeader("Content-Type", "application/json");
        let response;
        if (body.action == "first") {
          out.warn("first");
          musicManager.getMusicList().then((out) => {
            res.write(JSON.stringify(out));
            res.end();
          });
        }
        if (body.action == "next") {
          out.warn("next");
          musicManager.getSongs(decodeURI(body.album)).then((songs) => {
            res.write(JSON.stringify({ files: songs }));
            res.end();
          });
        }
      });

      break;
    default:
      res.end();
      break;
  }

  // res.end();
});

server.listen(PORT, () => {
  out.info(`Started server on port ${PORT}`);
  // musicManager.getMusicList().then((out) => console.log(out));
});
