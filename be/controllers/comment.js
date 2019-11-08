/*
 * @Author: your name
 * @Date: 2019-11-01 11:02:54
 * @LastEditTime: 2019-11-07 22:35:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stc/controllers/blog.js
 */
const CommentModel = require('../modules/comment')
const multer = require('koa-multer');

class commentController {
    static async getComment(ctx) {
        const { query } = ctx.request;
        try {
            let data = await CommentModel.getComment(query)
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: 'success',
                data,
                count: data.length
            }
        } catch (err) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: 'error',
                err,
            }
        }
    }
    
    static async addComment(ctx){
        let req = ctx.request.body;
        if(req.id && req.comment){
            try{
                const data = await CommentModel.addComment(req)
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: 'success',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: 'error',
                    err
                }
            }
        }else{
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '缺少参数'
            }
        }
    }
  
  
 
}
module.exports = commentController;