module.exports = (app) => {
    const user = require('../controllers/user.controller.js');
    //register user
    app.post('/open/register',user.registerUser);

}