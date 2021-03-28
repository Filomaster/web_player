"use strict";

const fs = require("fs");
const { resolve } = require("path");
const path = require("path");
const { out } = require("./utils");

function readDir(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) reject(err); // Error handling
      resolve(files);
    });
  });
}

module.exports = {
  getFile: function (path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  },
  getSongs: function (album) {
    return new Promise((resolve, reject) => {
      let songs = [];
      readDir(path.join(__dirname, "../static/mp3", album))
        .then((files) => {
          files.forEach((file) => {
            if (file.endsWith(".mp3")) {
              songs.push({
                file: encodeURI(file),
                size: fs.statSync(path.join(__dirname, "../static/mp3", album, file)).size,
              });
            }
          });
          resolve(songs);
        })
        .catch((err) => reject(err));
    });
  },
  getCovers: function (dirs) {
    return new Promise((resolve, reject) => {
      let covers = [];
      let promises = [];
      for (let j = 0; j < dirs.length; j++) {
        promises.push(
          new Promise((resolve, reject) => {
            readDir(path.join(__dirname, "../static/mp3", dirs[j]))
              .then((files) => {
                for (let i = 0; i < files.length; i++) {
                  if (files[i].endsWith(".png") || files[i].endsWith(".jpg")) {
                    resolve(dirs[j] + "/" + files[i]);
                  }
                }
                resolve("default");
              })
              .catch((err) => reject(err));
          })
        );
      }
      Promise.all(promises).then((results) => {
        results.forEach((cover) => covers.push(cover));
        resolve(covers);
      });
    });
  },
  getMusicList: function (album = null) {
    return new Promise((resolve, reject) => {
      let fileList = { dirs: [], covers: [], files: [] };
      readDir(path.join(__dirname, "../static/mp3"))
        .then((dirs) => {
          fileList.dirs = dirs;
          // dirs.forEach((dir) => fileList.dirs.push(encodeURI(dir)));
          album = album === null ? fileList.dirs[0] : album; // If album isn't specified (ex. in first request) return files from 1st album
          album = decodeURI(album);

          Promise.all([this.getCovers(fileList.dirs), this.getSongs(album)]).then((values) => {
            fileList.covers = values[0];
            fileList.files = values[1];

            resolve(fileList);
          });
        })
        .catch((err) => reject(err));
    });
  },
};
