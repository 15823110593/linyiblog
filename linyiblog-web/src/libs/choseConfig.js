/*
 * title: 选择配置项
 */
import configObj from "@/api/domain.js";

var port;

//根据不同命令行指令加载不同配置， 此process不是node环境中的全局变量，而是webpack打包过程中仿制的一个假process
if(process.env.NODE_ENV == "development"){ // 如果运行的是npm run dev 则process.env.NODE_ENV == "development"
  port = configObj.development; //设置相关配置为本机测试配置
}else if(process.env.NODE_ENV == "production"){ //如果运行的是npm run build 或 npm run build ...(此省略号代表build后面的pro、test等后缀名) 则process.env.NODE_ENV == "production"
  switch (process.env.srconfig){// process.env.srconfig 为 npm run build 之后的后缀名
    case "pro": //如果命令是npm run build pro  ，采用生产环境配置
      port = configObj.production;
      break;
    case "test": //如果命令是npm run build test ，采用公司测试环境配置
      port = configObj.companyTest;
      break;
    default : //如果命令是npm run build ，默认采用公司测试环境配置
      port = configObj.companyTest;
      break;
  }
}
export default port;
