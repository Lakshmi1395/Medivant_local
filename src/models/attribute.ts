import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

export interface AttributeAttributes {
  id: string;
  name: string;
  created_by?: string | null;
  created_at?: Date | null;
  updated_by?: string | null;
  updated_at?: Date | null;
  deleted_by?: string | null;
  deleted_at?: Date | null;
  is_deleted: boolean;
}

export type AttributeCreationAttributes = Optional<
  AttributeAttributes,
  'id' | 'created_by' | 'updated_by' | 'deleted_by' | 'updated_at' | 'deleted_at' | 'is_deleted'
>;

export class Attribute extends Model<AttributeAttributes, AttributeCreationAttributes> implements AttributeAttributes {
  public id!: string;
  public name!: string;
  public created_by?: string | null;
  public created_at?: Date | null;
  public updated_by?: string | null;
  public updated_at?: Date | null;
  public deleted_by?: string | null;
  public deleted_at?: Date | null;
  public is_deleted!: boolean;

  public static initModel(sequelize: Sequelize) {
    Attribute.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        created_by: { type: DataTypes.STRING, allowNull: true },
        created_at: { type: DataTypes.DATE, allowNull: true },
        updated_by: { type: DataTypes.STRING, allowNull: true },
        updated_at: { type: DataTypes.DATE, allowNull: true },
        deleted_by: { type: DataTypes.STRING, allowNull: true },
        deleted_at: { type: DataTypes.DATE, allowNull: true },
        is_deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      },
      {
        sequelize,
        tableName: 'attributes',
        timestamps: false,
      }
    );

    return Attribute;
  }

  public static associate(models: any) {
    if (models.RoleAttribute) {
      Attribute.hasMany(models.RoleAttribute, { foreignKey: 'attribute_id', as: 'attributeRoleAttributes' });
    }
  }
}
