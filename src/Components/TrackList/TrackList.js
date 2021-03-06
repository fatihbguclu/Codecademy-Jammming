import React from "react";
import Track  from "../Track/Track";
import './TrackList.css'

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {/* <!-- You will add a map method that renders a set of Track components  --> */}
                {this.props.tracks.map(track => <Track key={track.id} track={track} onAdd={this.props.onAdd} />)}
            </div>
        )
    }
}

export default TrackList;