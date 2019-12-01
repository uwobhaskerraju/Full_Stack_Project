module.exports = (app) => {
    const open = require('../controllers/open.controller.js');

    // Get top 10 songs for Non-Auth users
    app.get('/open/songs/ten', open.getTopTenSongs);

    // Search for songs
    app.get('/open/autoFill', open.autoFill);

    //get review of particular song
    app.get('/open/getReview/:songID', open.getReview);

    //get data of particular song
    app.get('/open/getSong/:songID', open.getSong);

    //get rating of particular song
    app.get('/open/getRating/:songID', open.getRating);
}