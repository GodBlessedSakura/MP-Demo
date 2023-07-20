import Router from "koa-router";
import User from "@/controller/user";
import Danmaku from "@/controller/danmaku";
// import Topic from "@/controller/topic";
// import Conversation from "@/controller/conversation";

const router = new Router();

router.prefix("/api");
const USER_BASE_URL = "/user";
const DANMAKU_BASE_URL = "/danmaku";

// User
router
  .post(USER_BASE_URL + "/create", User.create)
  .post(USER_BASE_URL + "/login", User.login)
  .get(USER_BASE_URL + "/get", User.get)
  .post(USER_BASE_URL + "/instruct", User.instruct)

  .post(DANMAKU_BASE_URL + "/create", Danmaku.create)
  .get(DANMAKU_BASE_URL + "/get_all", Danmaku.getAll);

export default router;
