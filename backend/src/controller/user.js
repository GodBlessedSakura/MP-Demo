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
import { menu, getMesseageForRecom } from "@/utils/gpt";
import { generateResponse } from "@/service/gpt";
import trainningMessage from "@/utils/trainningMessage";

export default class User {
  /* ---------  Non-admin functions --------- */
  /* ------ Create new user ------ */

  static async create(ctx) {
    try {
      // validation
      const schema = Joi.object({
        username: Joi.string().min(3).max(20).required(),
        password: Joi.string().min(6).max(20).required(),
      });

      const { error, value } = schema.validate(ctx.request.body);

      if (error) {
        return response.error(ctx, error.details[0].message);
      }

      // create new user
      const { username, password } = value;
      const hashPassword = await bcrypt.hash(password, 10); // saltRounds = 10

      let newUser;
      try {
        newUser = await UserModel.create({
          username,
          password: hashPassword,
        });
        // 创建指令并与用户关联
        const instructionOne = await InstructionModel.create({
          flag: 1,
          content: "一键点单",
          userId: newUser.id,
        });

        const instructionTwo = await InstructionModel.create({
          flag: 2,
          content: "展示历史订单",
          userId: newUser.id,
        });

        const instructionThree = await InstructionModel.create({
          flag: 3,
          content: "展示全部商家和餐品",
          userId: newUser.id,
        });

        const instructionFour = await InstructionModel.create({
          flag: 4,
          content: "拉黑商家",
          userId: newUser.id,
        });

        const instructionFive = await InstructionModel.create({
          flag: 5,
          content: "出餐",
          userId: newUser.id,
        });
        const instructionSix = await InstructionModel.create({
          flag: 6,
          content: "收餐",
          userId: newUser.id,
        });

        const instructionSeven = await InstructionModel.create({
          flag: 7,
          content: "展示弹幕",
          userId: newUser.id,
        });
      } catch (e) {
        return response.error(ctx, e.message);
      }

      return response.ok(ctx, {
        id: newUser.id,
        msg: "User created successfully!",
      });
    } catch (err) {
      // 记录错误日志
      logger.error(`Error: ${err.message}`, { stack: err.stack });
      return response.error(ctx, "Internal server error.", 500);
    }
  }
  /* ------ User Login ------ */

  static async login(ctx) {
    try {
      // validation
      const schema = Joi.object({
        username: Joi.string().min(3).max(20).required(),
        password: Joi.string().min(6).max(20).required(),
      });

      const { error, value } = schema.validate(ctx.request.body);
      if (error) {
        return response.error(ctx, error.details[0].message);
      }
      const { username, password } = value;

      // validate password
      const user = await UserModel.findOne({
        where: {
          username,
        },
      });
      if (!user) {
        return response.error(ctx, "Incorrect username or password", 401);
      }
      const hashPassword = user.password;
      const isTrue = bcrypt.compareSync(password, hashPassword);
      if (!isTrue) {
        return response.error(ctx, "Incorrect username or password", 401);
      }
      // 生成 JWT
      const token = jwt.sign(
        { id: user.id, username },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );
      return response.ok(ctx, {
        jwt: token,
        msg: `User ${user.username} log in successfully!`,
      });
    } catch (err) {
      logger.error(`Error: ${err.message}`, { stack: err.stack });
      return response.error(ctx, "Internal server error.", 500);
    }
  }

  static async get(ctx) {
    try {
      const authorization = ctx.headers.authorization;
      const token = authorization.split(" ")[1];

      // 验证 JWT 并获取 payload
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // --- check user exists ---
      const user = await UserModel.findOne({
        where: {
          id: payload.id,
        },
        include: [
          {
            model: OrderModel,
            as: "orders",
            required: false,
          },
          {
            model: DanmakuModel,
            as: "danmakus",
            required: false,
          },
          {
            model: InstructionModel,
            as: "instructions",
            required: false,
          },
        ],
      });
      if (!user) {
        return response.error(
          ctx,
          `User with id ${payload.id} does not exist or is banned`
        );
      }
      const res = user.toJSON(); // 隐藏密码信息
      return response.ok(ctx, { user: res, msg: "Query user successfully!" });
    } catch (err) {
      logger.error(`Error: ${err.message}`, { stack: err.stack });
      return response.error(ctx, "Internal server error.", 500);
    }
  }

  // /* ------ Send Message ------ */
  static async instruct(ctx) {
    try {
      const authorization = ctx.headers.authorization;
      const token = authorization.split(" ")[1];

      // 验证 JWT 并获取 payload
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      // validation
      const schema = Joi.object({
        conversation: Joi.string().required(),
      });

      const { error, value } = schema.validate(ctx.request.body);

      if (error) {
        return response.error(ctx, error.details[0].message);
      }
      const { conversation: content } = value;

      const conversations = [
        trainningMessage,
        {
          role: "user",
          content,
        },
      ];
      const { responseText: flag, consumedTokens } = await generateResponse(
        conversations
      );

      let additionalInfo = "";
      if (flag === "1") {
        const { responseText: recomMenu } = await generateResponse(
          getMesseageForRecom(content)
        );
        additionalInfo = recomMenu;
      } else if (flag === "3") {
        additionalInfo = menu;
      }

      return response.ok(ctx, {
        flag,
        consumedTokens,
        additionalInfo,
        msg: `Return message from GPT.`,
      });
    } catch (err) {
      logger.error(`Error: ${err.message}`, { stack: err.stack });
      return response.error(ctx, "Internal server error.", 500);
    }
  }
}
