module.exports = (app) => {
    const library = require('../controllers/library.controller.js');

    // Create a new Note
    app.post('/validateUser', library.validateUser);

    // Retrieve all library
    app.get('/registerUser', library.registerUser);

    // Retrieve a single Note with noteId
    app.get('/library/:noteId', library.findOne);

    // Update a Note with noteId
    app.put('/library/:noteId', library.update);

    // Delete a Note with noteId
    app.delete('/library/:noteId', library.delete);
}