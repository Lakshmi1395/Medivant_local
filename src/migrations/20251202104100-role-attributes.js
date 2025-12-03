'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('role_attributes', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      attribute_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      engine: 'InnoDB'
    });

    await queryInterface.addConstraint('role_attributes', {
      fields: ['role_id', 'attribute_id'],
      type: 'unique',
      name: 'unique_role_attribute_pair'
    });

    await queryInterface.addConstraint('role_attributes', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'fk_role_attributes_role',
      references: {
        table: 'roles',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('role_attributes', {
      fields: ['attribute_id'],
      type: 'foreign key',
      name: 'fk_role_attributes_attribute',
      references: {
        table: 'attributes',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addIndex('role_attributes', ['role_id'], { name: 'idx_role_attributes_role_id' });
    await queryInterface.addIndex('role_attributes', ['attribute_id'], { name: 'idx_role_attributes_attribute_id' });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('role_attributes', 'idx_role_attributes_attribute_id').catch(()=>{});
    await queryInterface.removeIndex('role_attributes', 'idx_role_attributes_role_id').catch(()=>{});

    await queryInterface.removeConstraint('role_attributes', 'fk_role_attributes_attribute').catch(()=>{});
    await queryInterface.removeConstraint('role_attributes', 'fk_role_attributes_role').catch(()=>{});
    await queryInterface.removeConstraint('role_attributes', 'unique_role_attribute_pair').catch(()=>{});

    await queryInterface.dropTable('role_attributes').catch(()=>{});
  }
};
