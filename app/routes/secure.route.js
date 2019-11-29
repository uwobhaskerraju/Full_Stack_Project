module.exports = (app) => {
    const secured = require('../controllers/secure.controller.js');

    // Validate Authentication
    app.post('/secure/validateUser', secured.validateUser);

    // Create a new user
    app.post('/secure/registerUser', secured.registerUser);

}