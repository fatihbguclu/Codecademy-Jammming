import React from "react";
import './SearchBar.css'


class SearchBar extends React.Component {

    constructor(props){
        super(props);
        this._bind('search', 'handleTermChange');
    }

    search(term){
        this.props.onSearch(term);
    }

    handleTermChange(e){
        this.search(e.target.value)
    }

    render() {
        return (
            <div className="SearchBar">
                <input onChange={this.handleTermChange} placeholder="Search for a Song" />
                <button className="SearchButton">SEARCH</button>
            </div>
        );
    }
}

export default SearchBar;