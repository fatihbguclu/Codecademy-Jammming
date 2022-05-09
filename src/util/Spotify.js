
const clientId = "388accba3d1745e89fffc78ad1e83335";
const redirectUri = "http://localhost:3000/";
const apiUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}`;

let userAccessToken = undefined;
let expiresIn = undefined;

const Spotify = {

    getAccessToken() {
        if (userAccessToken) {
            return userAccessToken;
        }

        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

        if (urlAccessToken && urlExpiresIn) {
            userAccessToken = urlAccessToken[1];
            expiresIn = urlExpiresIn[1];
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location = apiUrl;
        }

    },

    search(term) {
        const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;

        return fetch(searchUrl, {
            headers: {
                Authorization: `Bearer ${userAccessToken}`
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if (!jsonResponse.tracks) return [];
                return jsonResponse.tracks.items.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artist[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                })
            });
    },

    savePlayList(name, trackUris) {

        if (!name || !trackUris || trackUris.length === 0) return;

        const userUrl = "https://api.spotify.com/v1/me";
        const headers = {
            Authorization: `Bearer ${userAccessToken}`
        };

        let userId = undefined;
        let playlistId = undefined;

        fetch(userUrl, {
            headers: headers
        })
            .then(response => response.json())
            .then(jsonResponse => userId = jsonResponse.id)
            .then(() => {
                const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
                fetch(createPlaylistUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        name: name
                    })
                })
                    .then(response => response.json())
                    .then(jsonResponse => playlistId = jsonResponse.id)
                    .then(() => {
                        const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
                        fetch(addPlaylistTracksUrl, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify({
                                uris: trackUris
                            })
                        })
                    })
            });
    }
}

export default Spotify;