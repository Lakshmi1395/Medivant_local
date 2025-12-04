import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

export interface UsersAttributes {
  id: string;
  name: string;
  email: string;
  department: string;
  phone: string;
  password: string;
  role_id?: string | null;
  is_active: boolean;
  is_deleted: boolean;
}

export interface UsersCreationAttributes extends Optional<UsersAttributes, 'id' | 'role_id' | 'is_active' | 'is_deleted'> {}

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  public id!: string;
  public name!: string;
  public email!: string;
  public department!: string;
  public phone!: string;
  public password!: string;
  public role_id!: string | null;
  public is_active!: boolean;
  public is_deleted!: boolean;

  public static initModel(sequelize: Sequelize) {
    Users.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING(50), allowNull: false },
        email: { type: DataTypes.STRING(100), allowNull: false },
        department: { type: DataTypes.STRING(50), allowNull: false },
        phone: { type: DataTypes.STRING(20), allowNull: false },
        password: { type: DataTypes.STRING(100), allowNull: false },
        role_id: { type: DataTypes.UUID, allowNull: true },
        is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: false,
      }
    );

    return Users;
  }

  public static associate(models: any) {
    if (models.UserRole) {
      Users.hasMany(models.UserRole, { foreignKey: 'user_id', as: 'userRoles' });
    }
  }
}
