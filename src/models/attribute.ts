import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";

export interface AttributeAttributes {
  id: string;
  name: string;
  created_by: string | null;
  created_at: Date;
  updated_by: string | null;
  updated_at: Date | null;
  deleted_by: string | null;
  deleted_at: Date | null;
  is_deleted: boolean;
}

export interface AttributeCreationAttributes
  extends Optional<
    AttributeAttributes,
    "id" | "created_by" | "updated_by" | "deleted_by" |
    "updated_at" | "deleted_at" | "is_deleted"
  > {}

export class Attribute
  extends Model<AttributeAttributes, AttributeCreationAttributes>
  implements AttributeAttributes 
{
  id!: string;
  name!: string;
  created_by!: string | null;
  created_at!: Date;
  updated_by!: string | null;
  updated_at!: Date | null;
  deleted_by!: string | null;
  deleted_at!: Date | null;
  is_deleted!: boolean;
}

Attribute.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(100), allowNull: false },
    created_by: { type: DataTypes.STRING, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
    updated_by: { type: DataTypes.STRING, allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true },
    deleted_by: { type: DataTypes.STRING, allowNull: true },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "attributes",
    sequelize,
    timestamps: false,
  }
);
