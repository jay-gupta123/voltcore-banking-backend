const express = require('express');
const router = express.Router();
const authmiddleware = require('../middleware/auth.middleware');
const accountcontroller = require('../controller/account.controller');


/*  create post api :- /api/account
create a new account for the user. This route is protected by the authmiddleware, which means that only authenticated users can access it. The authmiddleware checks for a valid JWT token in the request headers or cookies and verifies it. If the token is valid, the user information is attached to the request object, allowing the controller to create a new account for that user. If the token is invalid or missing, the middleware will return a 401 Unauthorized response, preventing access to this route. 
*/
router.post('/',authmiddleware.authMiddleware,accountcontroller.createAccount);

module.exports = router;