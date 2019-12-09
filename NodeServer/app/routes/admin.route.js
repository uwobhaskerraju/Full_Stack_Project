module.exports = (app) => {
    const Admin = require('../controllers/admin.controller.js');

    const checkrequest = require('../middleware/appmiddleware.js');
    // Admin APIs

    // insert a new song
    app.post('/admin/song',checkrequest.CheckToken, Admin.insertSong);

    //delete a song
    app.delete('/admin/song',checkrequest.CheckToken, Admin.delSong);

    //mark a song as invisible
    app.put('/admin/song/hide',checkrequest.CheckToken, Admin.hideSong);

    // update song attributes
    app.put('/admin/song',checkrequest.CheckToken, Admin.updateSong);

    // delete a review
    app.delete('/admin/review',checkrequest.CheckToken, Admin.deleteReview)

    // Create a playlist - pass adminID as ownerID
    app.post('/admin/playlist',checkrequest.CheckToken, Admin.createPList);

    // Delete a playlist - no ownerid needed
    app.delete('/admin/playlist',checkrequest.CheckToken, Admin.deletePList);

    // Add a song to playlist
    app.put('/admin/playlist/song',checkrequest.CheckToken, Admin.addSongsPList);

    // remove a song to playlist
    app.delete('/admin/playlist/song',checkrequest.CheckToken, Admin.remSongsPList);

    // Hide a playlist
    app.put('/admin/playlist/hide',checkrequest.CheckToken, Admin.hidePList);

    // Get all playlist
    app.get('/admin/playlist',checkrequest.CheckToken, Admin.GetAllPlayLists);

    // deactivate a user
    app.put('/admin/user',checkrequest.CheckToken, Admin.deactUser);

    // get all songs for admin to view and hide
    app.get('/admin/songs',checkrequest.CheckToken, Admin.getAllSongs);

    // make a user admin
    app.put('/admin/user/admin', checkrequest.CheckToken, Admin.makeUserAdmin);

    // get list of users
    app.get('/admin/users', checkrequest.CheckToken, Admin.getAllUsers);
}