/*
 * @Author: your name
 * @Date: 2019-11-08 11:27:56
 * @LastEditTime: 2019-11-08 16:58:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cms/be/modules/users.js
 */
const db = require('../config/db')
const Sequelize = db.sequelize;
const User = Sequelize.import('../schema/users.js')
User.sync({force: false})

class UserModule {
    static async getUsers(query){
        console.log('query',query)
        return await User.findAll({
            where: {
                ...query
            },
            order:[
                ["id","DESC"]
            ],
        })
      
    }

    static async delUser(id){
        return await User.destroy({
            where:{
                id
            }
        })
    }
}

module.exports = UserModule;