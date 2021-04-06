const nedb = require("nedb");
const { out, colors } = require("./utils");
let db = new nedb({ filename: "./playlist.db", autoload: true });
// db.loadDatabase((err) => {
//   console.error(err);
// });
//
let getPlaylist = () => {
  return new Promise((resolve, reject) => {
    db.find({}, (err, docs) => {
      resolve(docs);
    });
  });
};
let update = (files) => {
  files.forEach((song) => {
    db.find({ file: song.file, album: song.album }, (err, docs) => {
      if (err) out.error(err);
      if (docs.length == 0) {
        db.insert(song);
        out.print(
          colors.green,
          "DATABASE",
          `Added '${decodeURI(song.file)}' from '${song.album}' to database`
        );
      } else {
        if (docs[0].id != song.id) {
          let oldId = docs[0].id;
          db.update(
            { file: song.file, album: song.album },
            { $set: { id: song.id } },
            {},
            (err, replaced) => {
              if (err) out.error(err);
              out.print(
                colors.blue,
                "DATABASE",
                `Updated id [ ${oldId} => ${song.id}] in '${decodeURI(
                  song.file
                )}' from '${song.album}'`
              );
            }
          );
        }
        out.print(
          colors.white,
          "DATABASE",
          `Skipped '${decodeURI(song.file)}' from '${
            song.album
          }' - file already exist`
        );
      }
    });
    // Check if files were removed
    db.find({}, (err, docs) => {
      docs.forEach((doc) => {
        if (!files.some((s) => s.file == doc.file && s.album === doc.album))
          db.remove(
            { file: doc.file, album: doc.album },
            {},
            (err, removed) => {
              if (err) out.error(err);
              out.print(
                colors.red,
                "DATABASE",
                `Removed ${doc.album}/${doc.file} from database`
              );
            }
          );
      });
    });
    // db.insert(song);
  });
  db.persistence.compactDatafile();
  //   console.log(files);
};

module.exports = { update, getPlaylist };
