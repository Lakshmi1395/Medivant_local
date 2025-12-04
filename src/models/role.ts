import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

export interface RoleAttributes {
  id: string;
  name: string;
  description?: string | null;
  created_by?: string | null;
  created_at?: Date | null;
  updated_by?: string | null;
  updated_at?: Date | null;
  deleted_by?: string | null;
  deleted_at?: Date | null;
  is_deleted: boolean;
}

export type RoleCreationAttributes = Optional<
  RoleAttributes,
  | 'id' | 'description' | 'created_by' | 'created_at'
  | 'updated_by' | 'updated_at' | 'deleted_by' | 'deleted_at'
>;

export class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  public id!: string;
  public name!: string;
  public description?: string | null;
  public created_by?: string | null;
  public created_at?: Date | null;
  public updated_by?: string | null;
  public updated_at?: Date | null;
  public deleted_by?: string | null;
  public deleted_at?: Date | null;
  public is_deleted!: boolean;

  public static initModel(sequelize: Sequelize) {
    Role.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
          field: 'id',
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
          field: 'name',
        },
        description: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'description',
        },
        created_by: { type: DataTypes.STRING, allowNull: true, field: 'created_by' },
        created_at: { type: DataTypes.DATE, allowNull: true, field: 'created_at' },
        updated_by: { type: DataTypes.STRING, allowNull: true, field: 'updated_by' },
        updated_at: { type: DataTypes.DATE, allowNull: true, field: 'updated_at' },
        deleted_by: { type: DataTypes.STRING, allowNull: true, field: 'deleted_by' },
        deleted_at: { type: DataTypes.DATE, allowNull: true, field: 'deleted_at' },
        is_deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted' },
      },
      {
        sequelize,
        tableName: 'roles',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: false,
      }
    );
    return Role;
  }

  public static associate(models: any) {
    if (models.Permission) {
      Role.belongsToMany(models.Permission, {
        through: 'role_permissions',
        as: 'permissions',
        foreignKey: 'role_id',
        otherKey: 'permission_id',
        timestamps: false,
      });
    }

    if (models.RoleAttribute) {
      Role.hasMany(models.RoleAttribute, { foreignKey: 'role_id', as: 'roleAttributes' });
    }

    if (models.UserRole) {
      Role.hasMany(models.UserRole, { foreignKey: 'role_id', as: 'userRolesForRole' });
    }
  }
}
