import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";
import { Role } from "./role";
import { Attribute } from "./attribute";

export interface RoleAttributeAttributes {
  id: string;
  role_id: string;
  attribute_id: string;
}

export interface RoleAttributeCreationAttributes
  extends Optional<RoleAttributeAttributes, "id"> {}

export class RoleAttribute 
  extends Model<RoleAttributeAttributes, RoleAttributeCreationAttributes> {}

RoleAttribute.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "roles", key: "id" }
    },
    attribute_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "attributes", key: "id" }
    },
  },
  {
    tableName: "role_attributes",
    sequelize,
    timestamps: false,
  }
);


Role.hasMany(RoleAttribute, { foreignKey: "role_id" });
RoleAttribute.belongsTo(Role, { foreignKey: "role_id" });

Attribute.hasMany(RoleAttribute, { foreignKey: "attribute_id" });
RoleAttribute.belongsTo(Attribute, { foreignKey: "attribute_id" });
