import { Model, DataTypes, Sequelize } from 'sequelize';

export class RolePermission extends Model {
  public role_id!: string;
  public permission_id!: string;

  public static initialize(sequelize: Sequelize) {
    RolePermission.init(
      {
        role_id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: false,
        },
        permission_id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: false,
        },
      },
      {
        sequelize,
        tableName: 'role_permissions',
        timestamps: false,
      }
    );
  }
}
