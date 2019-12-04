module.exports = (app) => {
    const secured = require('../controllers/secure.controller.js');

    // insert a new song
    app.post('/secure/song', secured.insertSong);

    // add a review for a song
    app.post('/secure/review', secured.reviewSong);

    // insert a rating for a song
    app.post('/secure/rate', secured.ratesong);

    // Create a playlist
    app.post('/secure/playlist', secured.createPList);

    //Edit title and description of Playlist by owner
    app.put('/secure/playlist', secured.editPlaylist);

    // Add a song to playlist by owner
    app.put('/secure/playlist/song', secured.addSongsPList);

    // remove a song to playlist by owner
    app.delete('/secure/playlist/song', secured.remSongsPList);

    // Hide a playlist by owner
    app.put('/secure/playlist/hide', secured.hidePList);

    // activate a user
    app.put('/secure/user/', secured.activateUser);
}