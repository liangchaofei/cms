/*
 * @Author: your name
 * @Date: 2019-10-15 09:56:22
 * @LastEditTime: 2019-11-07 15:51:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stc_fe/src/setupProxy.js
 */
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    // app.use(proxy('/api', {
    //     target: 'http://localhost:4000',
    //     pathRewrite(path) {
    //         return path.replace(/^\/api([^?]+)/, '$1.json');
    //     }
    // }));
    app.use(proxy('/api/v1', {
        target: 'http://localhost:3000'
    }));
};
