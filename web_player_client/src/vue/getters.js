const getters = {
  getAlbums: (state) => state.albums,
  getSongs: (state) => state.songs,
  getAlbumSelection: (state) => state.selectedAlbum,
  getSongSelection: (state) => state.selectedSong,
  getSelectedAlbum: (state) => state.albums[state.selectedAlbum - 1],
};

export default getters;
