const { getAll, create, getOne, remove, update, Login, logged, setPost } = require('../controllers/user.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');


const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJWT, getAll)
    .post(create)

routerUser.route('/login')
     .post(Login)

routerUser.route('/me')
     .get(verifyJWT, logged)  
//   POST /users/:id/post        
routerUser.route('/:id/post')
         .post(setPost)

routerUser.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = routerUser;