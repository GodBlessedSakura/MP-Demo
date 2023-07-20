import { DataTypes } from "sequelize";
import sequelize from "./sequelize";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  type: {
    type: DataTypes.INTEGER,
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

export default Order;
