module.exports = (app) => {
    const secured = require('../controllers/secure.controller.js');

    // Validate Authentication - same for user and admin
    app.post('/secure/validateUser', secured.validateUser);

    // Create a new user 
    app.post('/secure/registerUser', secured.registerUser);

    
    
    
    
    // Admin APIs
    // deactivate a user
    app.put('/secure/deactUser',secured.deactUser);
}