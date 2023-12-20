const UserModel = require("../models/user.model");

const getUserById =  async (id) =>{
    try {
        const user = await UserModel.findOne({_id:id},{_id:1,username:1,name:1});
        return {
            EM: 'get user by id successfully',
            EC: 0,
            DT: user
        }
    }catch (e) {
        console.log(e);
        return {
            EM: 'get user by id failed',
            EC: 1,
            DT: ''
        }
    }
}

module.exports ={
    getUserById
}
