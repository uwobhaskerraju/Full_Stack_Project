module.exports = (app) => {
    const open = require('../controllers/open.controller.js');

    // Get top 10 songs for Non-Auth users
    app.get('/open/getTen', open.getTopTenSongs);

    // Create a new user
    //app.post('/open/registerUser', open.registerUser);

}