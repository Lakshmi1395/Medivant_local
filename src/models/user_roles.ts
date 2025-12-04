import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

export interface UserRoleAttributes {
  id: string;
  user_id: string;
  role_id: string;
}

export interface UserRoleCreationAttributes extends Optional<UserRoleAttributes, 'id'> {}

export class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes> implements UserRoleAttributes {
  public id!: string;
  public user_id!: string;
  public role_id!: string;

  public static initModel(sequelize: Sequelize) {
    UserRole.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        user_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'users', key: 'id' } },
        role_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'roles', key: 'id' } },
      },
      {
        sequelize,
        tableName: 'user_roles',
        timestamps: false,
      }
    );

    return UserRole;
  }

  public static associate(models: any) {
    if (models.Users) {
      UserRole.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
    }

    if (models.Role) {
      UserRole.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
    }
  }
}
