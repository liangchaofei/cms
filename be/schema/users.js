/*
 * @Author: your name
 * @Date: 2019-11-01 11:52:39
 * @LastEditTime: 2019-11-08 16:49:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stc/schema/blog.js
 */
// import blogs from './blog'
const users = (sequelize, DataTypes) => {
    return sequelize.define('user',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:true,
            autoIncrement:true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'username'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'password'
        },
        createdAt:{
            type:DataTypes.DATE
        },
        updatedAt:{
            type:DataTypes.DATE
        }
    },{
        /**
         * 如果为true，则表示名称和model相同，即user
         * 如果为fasle，mysql创建的表名称会是复数，即users
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: false
    })
}
// blogs.belongsTo(comment, { foreignKey: 'cid', targetKey: 'id', as: 'blogs' });
module.exports = users;