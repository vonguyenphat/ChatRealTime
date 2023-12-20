const jwt = require('jsonwebtoken');
require('dotenv');

const createToken = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, {expiresIn: process.env.JWT_EXPIRES_IN});
    } catch (e) {
        console.log(">>>>>>>>create token error: ", e);
    }
    return token;
}
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;
    try {
        data = jwt.verify(token, key);
    } catch (err) {
        console.log(">>>>>>>>verify token error: ", err);
        data = null;
    }
    return data;
}
const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}
let nonSecurePaths = ['/auth/login', '/auth/register','/mb/user','/mb/auth','/mb/chat','/mb/message'];

const checkUserLogin = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let cookie = req.cookies;
    let tokenFromHeader = extractToken(req);
    if ((cookie && cookie.jwt) || tokenFromHeader) {
        let token = cookie && cookie.jwt ? cookie.jwt : tokenFromHeader;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            req.token = token;
            next();
        } else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: 'Not authenticated the user'
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated the user'
        })
    }
}

module.exports = {
    createToken,
    checkUserLogin
}