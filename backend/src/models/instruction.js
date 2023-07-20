import { DataTypes } from "sequelize";
import sequelize from "./sequelize";

const Instruction = sequelize.define("Instruction", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  flag: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Instruction;
