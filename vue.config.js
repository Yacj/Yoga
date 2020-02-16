module.exports = {
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "192.168.0.108",
        port: '8081',
        proxy: {
            '/api': {
                target: 'http://m.yujia.com/api', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin,
                'pathRewrite': { // 路径改写规则
                    '^/api': '' // 以/proxy/为开头的改写为''
                }
            }
        },
    },
    pwa: {
        name: 'yoga',
        themeColor: '#ff0000',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
    }
}