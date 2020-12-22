/*
 * title: 主要用于配置项目的一些公共设置，如请求url配置文件
 */

let config = {
  //本地开发环境相关配置  运行 npm run dev 打包此配置
  development:{
    port: "http://localhost:3000/"
    // port: "http://114.215.82.198:3000/" //公司内部测试环境 数据接口地址

  },
  //公司内部测试环境相关配置  运行 npm run build 打包此配置
  companyTest:{
    port: "http://114.215.82.198:3000/" //公司内部测试环境 数据接口地址
  },
  //正式生产环境相关配置    运行 npm run build pro 打包此配置
  production:{
    port: "http://114.215.82.198:3000/" //正式生产环境 数据接口地址
  }
};
export default config;
