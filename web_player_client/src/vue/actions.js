import axios from "axios";

const actions = {
  firstFetch({ commit }) {
    axios
      .post("http://localhost:3000", { action: "first" })
      .then((response) => {
        let albums = [];
        let files = [];
        response.data.dirs.forEach((dir, i) =>
          albums.push({ id: i + 1, title: dir, cover: response.data.covers[i] })
        );
        commit("SET_ALBUMS", albums);
        response.data.files.forEach((file, index) => {
          file.id = index + 1;
          file.album = albums[0].title;
          files.push(file);
        });
        if (response.data.playlist)
          commit("SET_PLAYLIST", response.data.playlist);
        commit("SET_SONGS", files);
      });
  },
  fetchAlbum({ commit }, album) {
    axios
      .post("http://localhost:3000", { action: "next", album })
      .then((response) => {
        let files = [];
        response.data.files.forEach((file, index) => {
          file.id = index + 1;
          file.album = album;
          files.push(file);
        });
        commit("SET_SONGS", files);
      });
  },
  savePlaylist({ commit, state }) {
    axios.post("http://localhost:3000", {
      action: "save",
      playlist: state.playlist,
    });
  },
};

export default actions;
