/*
 * @Author: your name
 * @Date: 2019-11-01 10:58:07
 * @LastEditTime: 2019-11-01 14:30:46
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /stc/config/db.js
 */
const Sequelize = require('sequelize')
const sequelize = new Sequelize('koa','root','123456',{
    host:'localhost',
    dialect:'mysql',
    operatorsAliases:false,
    dialectOptions:{
        //字符集
        charset:'utf8mb4',
        collate:'utf8mb4_unicode_ci',
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00'  //东八时区
})

module.exports = {
    sequelize
}