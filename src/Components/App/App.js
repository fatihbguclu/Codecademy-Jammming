import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import React from 'react';
import Spotify from '../../util/Spotify';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{ name: "aaa", artist: "aaa", album: "aaa", id: 1 }],
      playlistName: 'My Playlist',
      playlistTracks: []
    }
    this._bind('addTrack', 'removeTrack', 'updatePlaylistName', 'savePlaylist', 'searhc');
  }

  addTrack(track) {
    if (!this.state.playlistTracks.find(t => t.id === track.id)) {
      this.setState(prevState => ({
        playlistTracks: [...prevState.playlistTracks, track]
      }));
    }
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(t => t.id !== track.id)
    });
  }

  search(term) {
    Spotify.search(term)
      .then(searchResults => this.setState({
        searchResults: searchResults
      }));
  }

  savePlaylist() {
    const uriArray = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.playlistName, uriArray);
    this.setState({
      searchResults: []
    });
    this.updatePlaylistName('New Playlist');
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">

          <SearchBar onSearch={this.search} />

          <div className="App-playlist">

            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist onSave={this.savePlaylist} onNameChange={this.state.updatePlaylistName} playlistName={this.state.playlistName} tracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>

        </div>
      </div>
    );
  }
}

export default App;