
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
    }

}

export default Spotify;