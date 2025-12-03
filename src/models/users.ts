import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";

// 1. Attributes in table
export interface UsersAttributes {
  id: string;
  name: string;
  email: string;
  department: string;
  phone: string;
  password: string;
  role_id: string;
  is_active: boolean;
  is_deleted: boolean;
}

// 2. Fields allowed when creating row
export interface UsersCreationAttributes
  extends Optional<UsersAttributes, "id" | "is_active" | "is_deleted"> {}

// 3. Model class with types
export class Users
  extends Model<UsersAttributes, UsersCreationAttributes>
  implements UsersAttributes
{
  id!: string;
  name!: string;
  email!: string;
  department!: string;
  phone!: string;
  password!: string;
  role_id!: string;
  is_active!: boolean;
  is_deleted!: boolean;
}

// 4. Init
Users.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);
