module.exports = (app) => {
    const library = require('../controllers/library.controller.js');

    // Validate Authentication
    app.post('/secure/validateUser', library.validateUser);

    // Create a new user
    app.get('/secure/registerUser', library.registerUser);

}