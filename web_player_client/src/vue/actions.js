import axios from "axios";

const actions = {
  firstFetch({ commit }) {
    axios.post("http://192.168.0.234:8000", { action: "first" }).then((response) => {
      let albums = [];
      let files = [];
      response.data.dirs.forEach((dir, i) =>
        albums.push({ id: i + 1, title: dir, cover: response.data.covers[i] })
      );
      commit("SET_ALBUMS", albums);
      response.data.files.forEach((file, index) => {
        file.id = index + 1;
        files.push(file);
      });
      commit("SET_SONGS", files);
    });
  },
  fetchAlbum({ commit }, album) {
    axios.post("http://192.168.0.234:8000", { action: "next", album }).then((response) => {
      let files = [];
      response.data.files.forEach((file, index) => {
        file.id = index + 1;
        files.push(file);
      });
      commit("SET_SONGS", files);
    });
  },
};

export default actions;
