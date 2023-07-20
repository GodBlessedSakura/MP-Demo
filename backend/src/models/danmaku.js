import { DataTypes } from "sequelize";
import sequelize from "./sequelize";

const Danmaku = sequelize.define("Danmaku", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Danmaku;
