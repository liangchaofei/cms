/*
 * @Author: your name
 * @Date: 2019-11-01 11:43:21
 * @LastEditTime: 2019-11-07 22:38:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stc/modules/blog.js
 */
const db = require('../config/db')
const Sequelize = db.sequelize;
const Comment = Sequelize.import('../schema/comment.js')
Comment.sync({force: false})
 
class CommentModel {
    static async getComment(query){
        return await Comment.findAll({
            where: {
                ...query
            },
        })
      
    }
    static async addComment(query){
        return await Comment.create({
            id: query.id,
            comment: query.comment
        })
    }
}

module.exports = CommentModel;

