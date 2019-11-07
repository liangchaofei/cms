/*
 * @Author: your name
 * @Date: 2019-11-01 11:02:54
 * @LastEditTime: 2019-11-06 22:19:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stc/controllers/blog.js
 */
const BlogModel = require('../modules/blog')


class blogController {
    // 所有blog
    static async getAllBlog(ctx){
        const { query } = ctx.request;
        console.log('query', query)
        try{
            let data = await BlogModel.getAllBlog(query)
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: 'success',
                data,
                count:data.length
            }
        }catch(err){
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: 'error',
                err,
            }
        }
    }   
    // 添加
    static async addBlog(ctx){
        let req = ctx.request.body;
        if(req.title && req.author && req.content){
            try{
               let data = await BlogModel.addBlog(req)
               ctx.response.status = 200
               ctx.body = {
                   code:200,
                   msg:'success',
                   data
               }
            }catch(err){
               ctx.response.status = 412
               ctx.body = {
                   code:412,
                   msg:'error',
                   err
               }
            }
        }else{
           ctx.response.status = 416
           ctx.body = {
               code:416,
               msg:'参数不全',
           }
        }
    }
    // 更新blog 
    static async updateBlog(ctx){
        let req = ctx.request.body;
        console.log('req',req)
        try{
            let data = await BlogModel.updateBlog(req)
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: 'success',
            }
        }catch(err){
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: 'error',
                err
            }
        }
    }
    static async deleteBlog(ctx){
        let id = ctx.params.id;
        if(id){
           try{
               let data = await BlogModel.deleteBlogs(id)
               ctx.response.status = 200;
               ctx.body = {
                   code:200,
                   msg:'success',
               }
           }catch(err){
               ctx.response.status = 412;
               ctx.body = {
                   code:412,
                   msg:'err',
                   err
               }
           }
        }else{
            ctx.response.status = 416;
            ctx.body = {
                code:416,
                msg:'缺少id',
            }
        }
    }
}
module.exports = blogController;