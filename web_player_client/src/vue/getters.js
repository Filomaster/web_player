const getters = {
  getAlbums: (state) => state.albums,
  getSongs: (state) => state.songs,
  getAlbumSelection: (state) => state.selectedAlbum,
  getSongSelection: (state) => state.selectedSong,
  getSelectedAlbum: (state) => state.albums[state.selectedAlbum - 1],
  getSelectedSong: (state) => state.songs[state.selectedSong - 1],
  getCurrentSong: (state) => state.currentSong,
};

export default getters;
