# 安装依赖 #
## 前端依赖 ##
  1. redux(npm install redux --save)
  2. react-redux(npm install react-redux --save)
  3. react-router-dom(teact-router4)(npm install react-router-dom --save)
  4. redux-thunk(npm install redux-thunk --save)
  5. antd-mobile(npm install antd-mobile --save)
  6. browser-cookies(操作cookie)(npm install browser-cookies --save)
  7. babel-plugin-import(antd-mobile按需加载)(npm install babel-plugin-import --save)
  8. axios(请求数据)(npm install axios --save)
  9. socket.io-client(npm install socket.io-client --save)
  10. prop-types(react 数据类型检测)(npm install prop-types --save)
## 后端依赖nodejs ##
  1. 首先下载nodejs
  2. express(nodejs 开发框架)(npm install express --save)
  3. cookie-parser(npm insatll cookie-parser --save)
  4. utility(密码加密)(npm install utility --save)
  5. body-parser(中间件)(npm install body-parser --save)
  6. socket.io(npm install socket.io --save)
## 数据库 ##
  1. 下载mongodb
  2. mongoose(npm insatll mongoose --save)
# antd-mobile按需加载配置 #
  1. 首先弹出配置文件(npm run eject)
  2. 在babel加入
    ```
    "plugins": [
      [
        "import",
        {
          "libraryName": "antd-mobile",
          "style": "css"
        }
      ]
    ]
    ```
  3. npm insatll babel-plugin-import --save-dev
# 解决请求跨域问题 #
  1. 在package.json中最后加入
  ```
  "proxy": "http://localhost:9093"
  ```
# 启动服务 #
## 前端 ##
  npm start
## 后端 ##
  nodemon server/server.js
## 数据库 ##
  mongod --config /usr/local/etc/mongod.conf
