let makeSongString = (state, id) => {
  return state.songs[id].album + "/" + state.songs[id].file;
};
let setCurrentSong = (state) => {
  state.currentSong =
    state.songs[state.selectedSong - 1].album +
    "/" +
    state.songs[state.selectedSong - 1].file;
};
const mutations = {
  SET_ALBUMS: (state, albums) => (state.albums = albums),
  SET_SONGS: (state, songs) => (state.songs = songs),
  SET_PLAYLIST: (state, playlist) => (state.playlist = playlist),
  SET_ALBUM_SELECTION: (state, id) => (state.selectedAlbum = id),
  SET_NEXT_SONG: (state, playlistSong = null) => {
    if (playlistSong) {
      if (state.playlistPosition >= state.playlist.length) return;
      state.playlistPosition++;
      state.currentSong = state.playlist[state.playlistPosition];
      return;
    }
    if (state.selectedSong >= state.songs.length) return;
    state.selectedSong++;
    setCurrentSong(state);
  },
  SET_PREV_SONG: (state) => {
    if (state.selectedSong == 1) return;
    state.selectedSong--;
    setCurrentSong(state);
  },
  SET_CURRENT_SONG: (state, id) => {
    state.selectedSong = id;
    setCurrentSong(state);
  },
  CLEAR_CURRENT_SONG: (state) => {
    state.currentSong = null;
  },
  ADD_TO_PLAYLIST: (state, song) => {
    let newSong = { ...song };
    // let song = makeSongString(state, id - 1);
    if (
      !state.playlist.some(
        (s) => s.file === song.file && s.album === song.album
      )
    ) {
      newSong.id = state.playlist.length + 1;
      state.playlist.push(newSong);
    }
    console.log(state.playlist);
  },
  REMOVE_FROM_PLAYLIST: (state, song) => {
    let p = state.playlist;
    p.splice(
      p.findIndex((s) => s.file == song.file && s.album == song.album),
      1
    );
    p.forEach((s, i) => {
      s.id = i + 1;
    });
  },
  LOAD_PLAYLIST: (state) => {
    state.songs = state.playlist;
  },
};

export default mutations;
