'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('permissions', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      engine: 'InnoDB'
    });

    // await queryInterface.addConstraint('role_permissions', {
    //   fields: ['role_id', 'permission_id'],
    //   type: 'primary key',
    //   name: 'pk_role_permissions'
    // });

    // await queryInterface.addConstraint('role_permissions', {
    //   fields: ['role_id'],
    //   type: 'foreign key',
    //   name: 'fk_role_permissions_role',
    //   references: {
    //     table: 'roles',
    //     field: 'id'
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE'
    // });

    // await queryInterface.addConstraint('role_permissions', {
    //   fields: ['permission_id'],
    //   type: 'foreign key',
    //   name: 'fk_role_permissions_permission',
    //   references: {
    //     table: 'permissions',
    //     field: 'id'
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE'
    // });

    // await queryInterface.addIndex('role_permissions', ['role_id'], { name: 'idx_role_permissions_role_id' });
    // await queryInterface.addIndex('role_permissions', ['permission_id'], { name: 'idx_role_permissions_permission_id' });
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.removeIndex('role_permissions', 'idx_role_permissions_permission_id').catch(()=>{});
    // await queryInterface.removeIndex('role_permissions', 'idx_role_permissions_role_id').catch(()=>{});

    // await queryInterface.removeConstraint('role_permissions', 'fk_role_permissions_permission').catch(()=>{});
    // await queryInterface.removeConstraint('role_permissions', 'fk_role_permissions_role').catch(()=>{});
    // await queryInterface.removeConstraint('role_permissions', 'pk_role_permissions').catch(()=>{});
    // await queryInterface.dropTable('role_permissions').catch(()=>{});
    await queryInterface.dropTable('permissions').catch(()=>{});
  }
};
