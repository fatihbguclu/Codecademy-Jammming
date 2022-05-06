import React from "react";
import './SearchBar.css'


export class SearchBar extends React.Component {
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Search for a Song" />
                <button className="SearchButton">SEARCH</button>
            </div>
        );
    }
}