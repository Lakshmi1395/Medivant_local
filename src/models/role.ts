import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";

export interface RoleAttributes {
  id: string;
  name: string;
  description: string | null;
  created_by: string | null;
  created_at: Date;
  updated_by: string | null;
  updated_at: Date | null;
  deleted_by: string | null;
  deleted_at: Date | null;
  is_deleted: boolean;
}

export interface RoleCreationAttributes
  extends Optional<RoleAttributes,
    "id" | "description" | "created_by" | "updated_by" |
    "deleted_by" | "updated_at" | "deleted_at" | "is_deleted"
  > {}

export class Role extends Model<RoleAttributes, RoleCreationAttributes> {}

Role.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    description: { type: DataTypes.STRING(255), allowNull: true },
    created_by: { type: DataTypes.STRING, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_by: { type: DataTypes.STRING, allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true },
    deleted_by: { type: DataTypes.STRING, allowNull: true },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
  },
  {
    tableName: "roles",
    sequelize,
    timestamps: false,
  }
);
