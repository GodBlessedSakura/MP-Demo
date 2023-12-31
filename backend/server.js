import dotenv from "dotenv";
import bodyParser from "koa-bodyparser";

import Koa from "koa";
import body from "koa-body";
import jwt from "koa-jwt";
import koaStatic from "koa-static";
import session from "koa-session";
import cors from "koa-cors";
import compress from "koa-compress";
import cacheControl from "koa-cache-control";
import onerror from "koa-onerror";
import logger from "koa-logger";
import helmet from "koa-helmet";
// import { loadModel } from "@/utils/tfnlp";

// 配置环境变量
dotenv.config();

// 导入 rouer.js 文件
import router from "@/router";

const app = new Koa();

// 在使用 koa-session 之前，必须需要指定一个私钥
// 用于加密存储在 session 中的数据
app.keys = ["some secret hurr"];

// 将捕获的错误消息生成友好的错误页面（仅限开发环境）
onerror(app);

// 加载nlp模型
// const initModel = async () => {
//   await loadModel();
//   console.log("Tenserflow model loaded");
// };
// initModel();

// app挂载中间件
app
  // 在命令行打印日志
  .use(logger())
  // 缓存控制
  .use(cacheControl({ maxAge: 60000 }))
  // 开启 gzip 压缩
  .use(compress())
  // 跨域（允许在 http 请求头中携带 cookies）
  .use(cors({ credentials: true }))
  // 安全
  .use(helmet())
  // 静态资源服务器
  // .use(koaStatic(__dirname + '/src/public'))
  // session
  .use(session(app))
  // 解析 request body
  .use(bodyParser({ jsonLimit: "10mb" }))
  // 使用koa-jwt中间件进行鉴权
  .use(
    jwt({ secret: process.env.JWT_SECRET }).unless({
      path: ["/api/user/login", "/api/user/create"],
    })
  )

  // 开启了多文件上传，并设置了文件大小限制
  // .use(
  //   body({
  //     multipart: true,
  //     formidable: {
  //       maxFileSize: 200 * 1024 * 1024,
  //     },
  //   })
  // )
  // 载入路由
  .use(router.routes(), router.allowedMethods())
  // 启动一个 http 服务器，并监听 3000 端口
  .listen(3000, () => console.log("Server running at http://127.0.0.1:3000"));
// 导出 koa 实例（用于测试）
// 查看已注册中间件
export default app;
