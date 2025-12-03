import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";

export interface PermissionAttributes {
  id: string;
  name: string;
}

export interface PermissionCreationAttributes
  extends Optional<PermissionAttributes, "id"> {}

export class Permission extends Model<
  PermissionAttributes,
  PermissionCreationAttributes
> {}

Permission.init(
  {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "permissions",
    sequelize,
    timestamps: false,
  }
);
