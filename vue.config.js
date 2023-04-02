'use strict'
const path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}

const name = 'vue Admin Template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: '/formily', // Nginx访问路径
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    // 开发配置，与线上环境无关，开发时请修改为自身所需
    devServer: {
        // 开发环境使用，避免跨域请求报错
        // 匹配请求路径，重定向到指定的API服务器
        port: port,
        // open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        // -----------------------------------开发时请改为自身环境-----------------------------------------
        host: '9.135.226.75', 
        // -----------------------------------开发时请改为自身环境-----------------------------------------
        disableHostCheck: true,
        // before: require('./mock/mock-server.js')
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
}
