module.exports = (app) => {
    const Admin = require('../controllers/admin.controller.js');
    // Admin APIs
    // deactivate a user
    app.put('/admin/deactUser',Admin.deactUser);

    //mark a song as invisible
    app.put('/admin/hideSong',Admin.hideSong);

    //update song rating
    app.put('/admin/updateRating',Admin.updateRating);

    //delete a song
    app.delete('/admin/deleteSong',Admin.delSong);

    //delete song's rating
    app.delete('/admin/delsongrating',Admin.delsongrating);

    //delete song's review
    app.delete('/admin/deleteSongRev',Admin.deleteSongRev);

    // insert a new song
    app.post('/admin/insertSong',Admin.insertSong);

    // insert a review for a song
    app.post('/admin/reviewSong',Admin.reviewSong);

    // insert a rating for a song
    app.post('/admin/ratesong',Admin.ratesong);

    // Create a playlist
    app.post('/admin/createPList',Admin.createPList);

    // Delete a playlist
    app.delete('/admin/deletePList',Admin.deletePList);

    // Add a song to playlist
    app.put('/admin/addSongsPList',Admin.addSongsPList);

    // remove a song to playlist
    app.put('/admin/remSongsPList',Admin.remSongsPList);

     // Hide a playlist by owner
     app.put('/admin/hidePList',Admin.hidePList);

     // Get all playlist
     app.get('/admin/GetAllPlayLists',Admin.GetAllPlayLists);


}