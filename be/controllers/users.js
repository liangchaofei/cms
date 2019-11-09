/*
 * @Author: your name
 * @Date: 2019-11-08 11:26:22
 * @LastEditTime: 2019-11-08 22:16:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cms/be/controllers/users.js
 */
const UserModule = require('../modules/users')
class UserControler {
    static async users(ctx){
        const { query } = ctx.request;
        try{
            const data = await UserModule.getUsers(query)
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
    }

    static async delUser(ctx){
        const query = ctx.params.id;
        console.log('query', query)
        if(query){
            try{
                const data = await UserModule.delUser(query)
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
                    msg:'error',
                    err
                }
            }
        }else{
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '缺少id',
            }
        }
    }


    static async login(ctx){
        const query = ctx.request.body;
        if(query.password && query.username){
            try{
                const data = await UserModule.addUsers(query)
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
                    msg:'error',
                    err
                }
            }
        }else{
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '参数不全'
            }
        }
    }
}

module.exports = UserControler;