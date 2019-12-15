module.exports = (app) => {
    const secured = require('../controllers/secure.controller.js');

    const checkrequest=require('../middleware/appmiddleware.js');

    // insert a new song
    app.post('/secure/song',checkrequest.CheckRole,checkrequest.CheckToken, secured.insertSong);

    // add a review for a song
    app.post('/secure/review',checkrequest.CheckRole,checkrequest.CheckToken, secured.reviewSong);

    // insert a rating for a song
    app.post('/secure/rate',checkrequest.CheckRole,checkrequest.CheckToken,secured.ratesong);

    // get all playlists
    app.get('/secure/playlist/:userID',checkrequest.CheckRole,checkrequest.CheckToken,secured.getAllPlaylists);

    // Create a playlist
    app.post('/secure/playlist',checkrequest.CheckRole,checkrequest.CheckToken, secured.createPList);

    //Edit title and description of Playlist by owner
    app.put('/secure/playlist',checkrequest.CheckRole,checkrequest.CheckToken, secured.editPlaylist);

    // Add a song to playlist by owner
    app.put('/secure/playlist/song',checkrequest.CheckRole,checkrequest.CheckToken, secured.addSongsPList);

    // remove a song to playlist by owner
    app.delete('/secure/playlist/song',checkrequest.CheckRole, checkrequest.CheckToken,secured.remSongsPList);

    // Hide a playlist by owner
    app.put('/secure/playlist/hide',checkrequest.CheckRole,checkrequest.CheckToken, secured.hidePList);

    // verify user email
    app.put('/secure/user/',checkrequest.CheckRole, checkrequest.CheckToken,secured.verifyEmail);

    // get all songs ( no limit)
    app.get('/secure/song',checkrequest.CheckRole,checkrequest.CheckToken,secured.getAllSongs);

    //1. insert followed by rate followed by review
    // delete rating of song at times of failure of inserting review
    app.delete('/secure/rate',checkrequest.CheckRole,checkrequest.CheckToken,secured.deleteRating);

    // delete song at times of failure of inserting rating
    app.delete('/secure/song',checkrequest.CheckRole,checkrequest.CheckToken,secured.deleteSong);

    // get all playlist that are not private
    app.get('/secure/getPlaylists',checkrequest.CheckRole,checkrequest.CheckToken,secured.allPlaylists)

    // search songs
    app.get('/secure/search',checkrequest.CheckRole,checkrequest.CheckToken,secured.searchSongs);

    app.post('/secure/test',secured.test);
}