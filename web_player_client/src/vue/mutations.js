const mutations = {
  SET_ALBUMS: (state, albums) => (state.albums = albums),
  SET_SONGS: (state, songs) => (state.songs = songs),
  SET_ALBUM_SELECTION: (state, id) => (state.selectedAlbum = id),
  SET_SONG_SELECTION: (state, id) => (state.selectedSong = id),
};

export default mutations;
