import React, { Component } from "react";
import { TrackList } from "../TrackList/TrackList";
import './Playlist.css'

export class Playlist extends Component {
    render(){
        return (
            <div className="Playlist">
            <input value="New Playlist"/>
            <TrackList />
            <button class="Playlist-save">SAVE TO SPOTIFY</button>
          </div>
        );
    }
}