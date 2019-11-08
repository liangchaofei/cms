/*
 * @Author: your name
 * @Date: 2019-11-01 10:37:47
 * @LastEditTime: 2019-11-07 22:33:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stc/routes/blog.js
 */
const router = require('koa-router')()
const CommentControll = require('../controllers/comment')

router.prefix('/api/v1')



router.get('/comment', CommentControll.getComment)
router.post('/comment', CommentControll.addComment)


module.exports = router
