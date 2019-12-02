module.exports = (app) => {
    const open = require('../controllers/open.controller.js');

    // Get top 10 songs for Non-Auth users
    app.get('/open/songs/ten', open.getTopTenSongs);

    // Search for songs
    app.get('/open/search', open.autoFill);

    //get review of particular song
    app.get('/open/review/:songID', open.getReview);

    //get data of particular song
    app.get('/open/song/:songID', open.getSong);

    //get rating of particular song
    app.get('/open/rating/:songID', open.getRating);

}