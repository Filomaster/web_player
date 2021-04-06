const getters = {
  getAlbums: (state) => state.albums,
  getSongs: (state) => state.songs,
  getAlbumSelection: (state) => state.selectedAlbum,
  getSongSelection: (state) => state.selectedSong,
  getSelectedAlbum: (state) => state.albums[state.selectedAlbum - 1],
  getSelectedSong: (state) => state.songs[state.selectedSong - 1],
  getCurrentSong: (state) => state.currentSong,
  getSongsTotal: (state) => state.songs.length,
  getPlaylist: (state) => state.playlist,
};

export default getters;
