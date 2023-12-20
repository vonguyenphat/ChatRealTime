const express = require('express');

const {findUserById} = require('../controllers/user.controller')
const user_router =  express.Router();

user_router.get('/find-user-by-id/:userId',findUserById);

user_router.get('/:test', (req, res) => {
    return res.status(200).json({
        param1:  req.params.test
    })
});

module.exports = user_router;