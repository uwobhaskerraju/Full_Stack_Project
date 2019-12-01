module.exports = (app) => {
    const secured = require('../controllers/secure.controller.js');

    // Validate Authentication - same for user and admin
    app.post('/secure/validateUser', secured.validateUser);

    // Create a new user 
    app.post('/secure/registerUser', secured.registerUser);

    
    
    
    
    // Admin APIs
    // deactivate a user
    app.put('/secure/deactUser',secured.deactUser);

    //mark a song as invisible
    app.put('/secure/hideSong',secured.hideSong);

    //update song rating
    app.put('/secure/updateRating',secured.updateRating);

    //delete a song
    app.delete('/secure/deleteSong',secured.delSong);

    //delete song's rating
    app.delete('/secure/delsongrating',secured.delsongrating);

    //delete song's review
    app.delete('/secure/deleteSongRev',secured.deleteSongRev);

    // insert a new song
    app.post('/secure/insertSong',secured.insertSong);

    // insert a review for a song
    app.post('/secure/reviewSong',secured.reviewSong);

    // insert a rating for a song
    app.post('/secure/ratesong',secured.ratesong);

    // Create a empty playlist
    app.post('/secure/createPList',secured.createPList);

}