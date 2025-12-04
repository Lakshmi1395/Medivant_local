import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import { Role } from './role';

interface PermissionAttributes {
  id: string;
  name: string;
}

type PermissionCreationAttributes = Optional<PermissionAttributes, 'id'>;

export class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> implements PermissionAttributes {
  public id!: string;
  public name!: string;

  public static initModel(sequelize: Sequelize) {
    Permission.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
        name: { type: DataTypes.STRING(100), allowNull: false },
      },
      {
        sequelize,
        tableName: 'permissions',
        timestamps: false,
      }
    );

    return Permission;
  }

  public static associate(models: any) {
    if (models.Role) {
      Permission.belongsToMany(models.Role, {
        through: 'role_permissions',
        as: 'roles',
        foreignKey: 'permission_id',
        otherKey: 'role_id',
        timestamps: false,
      });
    }
  }
}
