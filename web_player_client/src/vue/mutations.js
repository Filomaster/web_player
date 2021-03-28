const mutations = {
  SET_ALBUMS: (state, albums) => (state.albums = albums),
  SET_SONGS: (state, songs) => (state.songs = songs),
  SET_ALBUM_SELECTION: (state, id) => (state.selectedAlbum = id),
  SET_SONG_SELECTION: (state, id) => (state.selectedSong = id),
  SET_CURRENT_SONG: (state, id) => {
    state.currentSong =
      state.albums[state.selectedAlbum - 1].title + "/" + state.songs[id - 1].file;
  },
};

export default mutations;
