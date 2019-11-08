/*
 * @Author: your name
 * @Date: 2019-11-01 10:22:32
 * @LastEditTime: 2019-11-08 17:10:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stc/routes/users.js
 */
const router = require('koa-router')()
const UserController = require('../controllers/users')

router.prefix('/api/v1')

router.get('/users', UserController.users)
router.delete('/users/:id', UserController.delUser)
router.post('/login', UserController.login)



module.exports = router
