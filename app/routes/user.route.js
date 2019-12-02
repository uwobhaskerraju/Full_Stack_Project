module.exports = (app) => {
    const user = require('../controllers/user.controller.js');
    const checkrequest=require('../middleware/validaterequest.js');
    
    //register user
    app.post('/user/register',checkrequest,user.registerUser);

}