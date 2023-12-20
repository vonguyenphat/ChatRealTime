const {getUserById} = require('../services/user.service');

const findUserById = async (req, res) => {
    let idUser = req.params.userId;
    if (!idUser) {
        return res.status(500).json({
            EM: 'server error findUserById ',
            EC: 1,
            DT: '',
        });
    }
    try {
        const data = await getUserById(idUser);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            EM: 'server error findUserById ',
            EC: 1,
            DT: '',
        });
    }
}
module.exports ={
    findUserById
}