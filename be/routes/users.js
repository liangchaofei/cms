/*
 * @Author: your name
 * @Date: 2019-11-01 10:22:32
 * @LastEditTime: 2019-11-01 14:02:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stc/routes/users.js
 */
const router = require('koa-router')()

router.prefix('/usersa')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
