import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";
import { Users } from "./users";
import { Role } from "./role";

export interface UserRoleAttributes {
  id: string;
  user_id: string;
  role_id: string;
}

export interface UserRoleCreationAttributes
  extends Optional<UserRoleAttributes, "id"> {}

export class UserRole
  extends Model<UserRoleAttributes, UserRoleCreationAttributes> {}

UserRole.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "roles", key: "id" },
    },
  },
  {
    tableName: "user_roles",
    sequelize,
    timestamps: false,
  }
);

Users.hasMany(UserRole, { foreignKey: "user_id" });
UserRole.belongsTo(Users, { foreignKey: "user_id" });

Role.hasMany(UserRole, { foreignKey: "role_id" });
UserRole.belongsTo(Role, { foreignKey: "role_id" });
