/*
 * @Author: your name
 * @Date: 2019-11-01 11:43:21
 * @LastEditTime: 2019-11-04 18:04:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stc/modules/blog.js
 */
const db = require('../config/db')
const Sequelize = db.sequelize;
const Blog = Sequelize.import('../schema/blog.js')
Blog.sync({force: false})

class BlogModel {

    static async getAllBlog(query){
        return await Blog.findAll({
            where: {
                ...query
            }
        })
      
    }
    // add blog
    static async addBlog(data){
        console.log('data',data)
        return await Blog.create({
            title: data.title,
            author: data.author,
            content: data.content,
        })
    }
    static async deleteBlogs(id){
        return await Blog.destroy({
            where:{
                id
            }
        })
    }
}

module.exports = BlogModel;

