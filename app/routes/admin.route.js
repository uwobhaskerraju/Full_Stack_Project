module.exports = (app) => {
    const Admin = require('../controllers/admin.controller.js');
    // Admin APIs

    // insert a new song
    app.post('/admin/song', Admin.insertSong);

    // insert a review for a song
    //app.post('/admin/review', Admin.reviewSong);

    // insert a rating for a song
    //app.post('/admin/rate', Admin.ratesong);

    //update song rating
    //app.put('/admin/rate', Admin.updateRating);

    //delete a song
    app.delete('/admin/song', Admin.delSong);

    //mark a song as invisible
    app.put('/admin/song/hide', Admin.hideSong);

    // update song attributes
    app.put('/admin/song',Admin.updateSong);

    // delete a review
    //app.delete('/admin/review',Admin.deleteReview)


    // deactivate a user
    app.put('/admin/deactUser', Admin.deactUser);

    //delete song's rating
    app.delete('/admin/delsongrating', Admin.delsongrating);

    //delete song's review
    app.delete('/admin/deleteSongRev', Admin.deleteSongRev);







    // Create a playlist
    app.post('/admin/createPList', Admin.createPList);

    // Delete a playlist
    app.delete('/admin/deletePList', Admin.deletePList);

    // Add a song to playlist
    app.put('/admin/addSongsPList', Admin.addSongsPList);

    // remove a song to playlist
    app.put('/admin/remSongsPList', Admin.remSongsPList);

    // Hide a playlist by owner
    app.put('/admin/hidePList', Admin.hidePList);

    // Get all playlist
    app.get('/admin/GetAllPlayLists', Admin.GetAllPlayLists);


}