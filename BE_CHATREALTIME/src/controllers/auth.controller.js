const {registerNewUser, handleUserLogin, forgotPassword} = require('../services/auth.service');

const registerUser = async (req, res) => {
    try {
        let {name, username, password} = req.body;
        if (!name || !username || !password) {
            return res.status(400).json({
                EM: 'error encountered',
                EC: 1,
                DT: '',
            });
        }

        let data = await registerNewUser(name, username, password);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.error(e); // Log the error for debugging purposes
        return res.status(500).json({
            EM: 'error service registration',
            EC: 1,
            DT: '',
        });
    }
};
const handleLogin = async (req, res) => {
    try {

        let reqData = req.body;
        let {username, password} = reqData;
        if (!username || !password) {
            return res.status(400).json({
                EM: 'username or password is required',
                EC: 1,
                DT: ''
            })
        }
        let data = await handleUserLogin(reqData);
        if (data && data.DT && data.DT.accessToken) {
            res.cookie('jwt', data.DT.accessToken, {httpOnly: true});
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });

    } catch (e) {
        console.error(e); // Log the error for debugging purposes
        return res.status(500).json({
            EM: 'error service handler login',
            EC: 1,
            DT: '',
        });
    }
}


const handlerForgotPassword = async (req, res) => {
    try {
        let {username, password} = req.body.data;
        let data = await forgotPassword(username, password);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            EM: 'error service handler login',
            EC: 1,
            DT: '',
        });
    }
}
const getUserAccount = (req, res) => {
    return res.status(200).json({
        EC: 0,
        EM: "oke",
        DT: {
            id: req.user.id,
            accessToken: req.token,
            username: req.user.username,
            name: req.user.name
        }
    })
}

// const getUserAccount = (req, res) => {
//     return res.status(200).json({
//         EC: 0,
//         EM: "oke",
//         DT: ""
//     })
// }
module.exports = {
    registerUser,
    handleLogin,
    handlerForgotPassword,
    getUserAccount
};
