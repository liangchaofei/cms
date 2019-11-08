/*
 * @Author: your name
 * @Date: 2019-11-01 10:37:47
 * @LastEditTime: 2019-11-07 16:32:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stc/routes/blog.js
 */
const router = require('koa-router')()
const BlogControll = require('../controllers/blog')
const multer = require('koa-multer');

router.prefix('/api/v1')

//配置    
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/images/')  //注意路径必须存在
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})

//加载配置
var upload = multer({ storage: storage })

router.get('/blog', BlogControll.getAllBlog)
router.post('/blog', BlogControll.addBlog)
router.delete('/blog/:id',BlogControll.deleteBlog)
router.put('/blog', BlogControll.updateBlog)
router.post('/upload', upload.single('avatar'), async (ctx, next) => {
    console.log('123')
    ctx.body = {
        'body': ctx.req.body
    }
})

module.exports = router
