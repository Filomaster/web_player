//  Author: Filip Majorek 3iB
// Description: Main file of the api server, which provide data for Vue client

"use strict";

const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");

const { out } = require("./utils");
const fileManager = require("./fileManager");
const { fstat } = require("fs");
const database = require("./databaseManager");
out.checkColors();

const PORT = process.env.PORT || 3000;

let router = {
  setHeaders: function (res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
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

let parseUrl = (url) => {
  const address = /(\/[a-zA-Z]+\/)|(\/[a-zA-Z ]+$)/;
  const paramName = /(?:(?<=\?)[^\=]*(?=\=))|(?:(?<=\&)[^\=]*(?=\=))/;
  const paramValue = /(?:(?<=\=)[^\=]*(?=$))|(?:(?<=\=)[^\=]*(?=\&))/;
};

const server = http.createServer(function (req, res) {
  res = router.setHeaders(res);
  switch (req.method) {
    case "GET":
      let parsedUrl = url.parse(req.url, true);
      let resType;
      out.warn(parsedUrl.pathname);
      // out.error(req.url);
      switch (parsedUrl.pathname) {
        case "":
          console.log(parsedUrl.query);
          break;
        case "/admin":
          res.setHeader("Content-Type", "text/html");
          fs.readFile(
            path.join(__dirname, "../static/admin/index.html"),
            (err, data) => {
              if (err) {
                out.error(err);
                res.statusCode = 404;
              } else res.write(data);
              res.end();
            }
          );
          break;
        case "/images/":
          let file = parsedUrl.query.file;
          file = file != null ? parsedUrl.query.file : "default";
          resType =
            "image/" +
            (file === "default"
              ? "png"
              : file.match(/\..{3}$/)[0].replace(".", ""));
          let filePath =
            file === "default"
              ? path.join(__dirname, "../static/default.png")
              : path.join(__dirname, "../static/mp3/", file);
          fileManager.getFile(filePath).then((data) => {
            res.setHeader("Content-Type", resType);
            res.write(data.data);
            res.end();
          });
          break;
        case "/audio/":
          resType = "audio/mpeg";
          out.info("song request: ", parsedUrl.query.file);
          if (parsedUrl.query.file == "null") {
            res.end();
            break;
          }
          fileManager
            .getFile(
              path.join(__dirname, "../static/mp3/", parsedUrl.query.file)
            )
            .then((file) => {
              res.setHeader("Content-Type", resType);
              res.setHeader("Content-Length", file.size),
                res.setHeader("Accept-Ranges", "bytes");
              res.write(file.data);
              res.end();
            });
          break;
        case "/dirs":
          fileManager
            .readDir(path.join(__dirname, "../static/mp3"))
            .then((dirs) => {
              res.write(JSON.stringify(dirs));
              res.end();
            });
          break;
        default:
          res.statusCode = 404;
          fs.readFile(
            path.join(__dirname, "../static/admin/error.html"),
            (err, data) => {
              if (err) out.error(err);
              else res.write(data);
              res.end();
            }
          );
          break;
      }

      break;
    case "POST":
      router.getPostBody(req).then((body) => {
        res.setHeader("Content-Type", "application/json");
        let response;
        switch (body.action) {
          case "first":
            out.warn("first");
            fileManager.getMusicList().then((out) => {
              database.getPlaylist().then((playlist) => {
                out.playlist = playlist;

                res.write(JSON.stringify(out));
                res.end();
              });
            });
            break;
          case "next":
            out.warn("next");
            fileManager.getSongs(decodeURI(body.album)).then((songs) => {
              res.write(JSON.stringify({ files: songs }));
              res.end();
            });
            break;
          case "save":
            out.warn("save");
            database.update(body.playlist);
            res.end();
            break;
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
  // fileManager.getMusicList().then((out) => console.log(out));
});
