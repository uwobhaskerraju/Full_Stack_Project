module.exports = (app) => {
    const Admin = require('../controllers/admin.controller.js');

    const checkrequest=require('../middleware/appmiddleware.js');
    // Admin APIs

    // insert a new song
    app.post('/admin/song', Admin.insertSong);

    //delete a song
    app.delete('/admin/song', Admin.delSong);

    //mark a song as invisible
    app.put('/admin/song/hide', Admin.hideSong);

    // update song attributes
    app.put('/admin/song', Admin.updateSong);

    // delete a review
    app.delete('/admin/review', Admin.deleteReview)

    // Create a playlist - pass adminID as ownerID
    app.post('/admin/playlist', Admin.createPList);

    // Delete a playlist - no ownerid needed
    app.delete('/admin/playlist', Admin.deletePList);

    // Add a song to playlist
    app.put('/admin/playlist/song', Admin.addSongsPList);

    // remove a song to playlist
    app.delete('/admin/playlist/song', Admin.remSongsPList);

    // Hide a playlist
    app.put('/admin/playlist/hide', Admin.hidePList);

    // Get all playlist
    app.get('/admin/playlist', Admin.GetAllPlayLists);

    // deactivate a user
    app.put('/admin/user', Admin.deactUser);

    // get all songs for admin to view and hide
    app.get('/admin/songs', Admin.getAllSongs);

    // get list of users
    app.get('/admin/users',checkrequest.CheckToken,Admin.getAllUsers);
}