<!--
 * @Author: your name
 * @Date: 2019-11-09 23:02:06
 * @LastEditTime: 2020-05-10 18:56:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cms/README.md
 -->
# react全家桶 + ts + koa写的一个博客管理系统和博客展示系统

## 界面展示
![avatar](/static/640.jpeg)

![avatar](/static/641.png)

![avatar](/static/642.jpeg)

![avatar](/static/643.png)

![avatar](/static/644.png)


## FE 用法

### 安装
+ npm install

### 使用
+ npm start

## BE 用法
### 安装
+ npm install

### 使用
+ npm run dev

## 数据库
+ blog表：文章

    | 名称        | 类型    |  长度  |  主键 | 
    | --------   | -----:   | :----: | :----: |
    | id        | int      |   11    | true| 
    | title       | varchar      |   255    | false |
    | authore        | varchar      |   255    | false|
    | content        | varchar      |   255    | false|
    | createdAt        | datetime      |   0    | false|
    | updatedAt        | datetime      |   0    | false|

+ comment表：评论

    | 名称        | 类型    |  长度  |  主键 | 
    | --------   | -----:   | :----: | :----: |
    | cid        | int      |   11    | true| 
    | comment       | varchar      |   255    | false |
    | id        | int      |   11    | false|
    | createdAt        | datetime      |   0    | false|
    | updatedAt        | datetime      |   0    | false|

+ user表：用户

    | 名称        | 类型    |  长度  |  主键 | 
    | --------   | -----:   | :----: | :----: |
    | id        | int      |   11    | true| 
    | username       | varchar      |   255    | false |
    | password        | varchar      |   255    | false|
    | createdAt        | datetime      |   0    | false|
    | updatedAt        | datetime      |   0    | false|