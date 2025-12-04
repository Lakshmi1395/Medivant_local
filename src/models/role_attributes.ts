import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

export interface RoleAttributeAttributes {
  id: string;
  role_id: string;
  attribute_id: string;
}

export interface RoleAttributeCreationAttributes extends Optional<RoleAttributeAttributes, 'id'> {}

export class RoleAttribute extends Model<RoleAttributeAttributes, RoleAttributeCreationAttributes>
  implements RoleAttributeAttributes {
  public id!: string;
  public role_id!: string;
  public attribute_id!: string;

  public static initModel(sequelize: Sequelize) {
    RoleAttribute.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        role_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'roles', key: 'id' } },
        attribute_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'attributes', key: 'id' } },
      },
      {
        sequelize,
        tableName: 'role_attributes',
        timestamps: false,
      }
    );

    return RoleAttribute;
  }

  public static associate(models: any) {
    const { Role, Attribute } = models || {};
    if (!Role || !Attribute) return;

    RoleAttribute.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
    RoleAttribute.belongsTo(Attribute, { foreignKey: 'attribute_id', as: 'attribute' });
  }
}
