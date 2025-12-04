'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) create table
    await queryInterface.createTable(
      'role_permissions',
      {
        role_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        permission_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },
      },
      {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        engine: 'InnoDB',
      }
    );

    // 2) composite primary key
    await queryInterface.addConstraint('role_permissions', {
      fields: ['role_id', 'permission_id'],
      type: 'primary key',
      name: 'pk_role_permissions',
    });

    // 3) foreign key -> roles(id)
    await queryInterface.addConstraint('role_permissions', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'fk_role_permissions_role',
      references: {
        table: 'roles',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // 4) foreign key -> permissions(id)
    await queryInterface.addConstraint('role_permissions', {
      fields: ['permission_id'],
      type: 'foreign key',
      name: 'fk_role_permissions_permission',
      references: {
        table: 'permissions',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // 5) indexes (optional but useful)
    await queryInterface.addIndex('role_permissions', ['role_id'], {
      name: 'idx_role_permissions_role_id',
    });
    await queryInterface.addIndex('role_permissions', ['permission_id'], {
      name: 'idx_role_permissions_permission_id',
    });
  },

  async down(queryInterface, Sequelize) {
    // remove indexes & constraints then drop table (defensive with .catch)
    await queryInterface.removeIndex('role_permissions', 'idx_role_permissions_permission_id').catch(() => {});
    await queryInterface.removeIndex('role_permissions', 'idx_role_permissions_role_id').catch(() => {});

    await queryInterface.removeConstraint('role_permissions', 'fk_role_permissions_permission').catch(() => {});
    await queryInterface.removeConstraint('role_permissions', 'fk_role_permissions_role').catch(() => {});
    await queryInterface.removeConstraint('role_permissions', 'pk_role_permissions').catch(() => {});

    await queryInterface.dropTable('role_permissions').catch(() => {});
  },
};
