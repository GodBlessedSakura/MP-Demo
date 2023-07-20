import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  UserModel,
  DanmakuModel,
  InstructionModel,
  OrderModel,
} from "@/models";
import response from "@/utils/response";
import logger from "@/utils/logger";
import { menu, getMesseageForRecom, getMesseageForInspec } from "@/utils/gpt";
import { generateResponse } from "@/service/gpt";
import trainningMessage from "@/utils/trainningMessage";

export default class Danmaku {
  static async create(ctx) {
    try {
      const authorization = ctx.headers.authorization;
      const token = authorization.split(" ")[1];

      // 验证 JWT 并获取 payload
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // validation
      const schema = Joi.object({
        content: Joi.string().min(1).max(2000).required(),
      });

      const { error, value } = schema.validate(ctx.request.body);

      if (error) {
        return response.error(ctx, error.details[0].message);
      }

      // create new danmaku
      const { content } = value;
      const { responseText: flag } = await generateResponse(
        getMesseageForInspec(content)
      );
      if (flag === "1") return response.error(ctx, "用户发言不当", 403);

      let newDanmaku;
      try {
        newDanmaku = await DanmakuModel.create({
          content,
          createdTime: new Date(),
          userId: payload.id,
        });
      } catch (e) {
        return response.error(ctx, e.message);
      }

      return response.ok(ctx, {
        id: newDanmaku.id,
        msg: "Danmaku created successfully!",
      });
    } catch (err) {
      // 记录错误日志
      logger.error(`Error: ${err.message}`, { stack: err.stack });
      return response.error(ctx, "Internal server error.", 500);
    }
  }
  /* ------ Danmaku Get ------ */

  static async getAll(ctx) {
    try {
      const authorization = ctx.headers.authorization;
      const token = authorization.split(" ")[1];

      // 验证 JWT 并获取 payload
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      const danmakus = await DanmakuModel.findAll({
        order: [["createdTime", "ASC"]],
      });

      return response.ok(ctx, {
        danmakus,
        msg: "Danmakus query successfully!",
      });

      // 打印Danmaku内容
    } catch (err) {
      logger.error(`Error: ${err.message}`, { stack: err.stack });
      return response.error(ctx, "Internal server error.", 500);
    }
  }
}
