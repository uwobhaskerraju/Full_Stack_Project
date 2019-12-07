module.exports = (app) => {
    const secured = require('../controllers/secure.controller.js');

    const checkrequest=require('../middleware/appmiddleware.js');

    // insert a new song
    app.post('/secure/song', secured.insertSong);

    // add a review for a song
    app.post('/secure/review', secured.reviewSong);

    // insert a rating for a song
    app.post('/secure/rate',secured.ratesong);

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

    // verify user email
    app.put('/secure/user/', checkrequest.CheckToken,secured.verifyEmail);

    // get all songs ( no limit)
    app.get('/secure/song',checkrequest.CheckToken,secured.getAllSongs);

    //1. insert followed by rate followed by review
    // delete rating of song at times of failure of inserting review
    app.delete('/secure/rate',secured.deleteRating);

    // delete song at times of failure of inserting rating
    app.delete('/secure/song',secured.deleteSong);
}