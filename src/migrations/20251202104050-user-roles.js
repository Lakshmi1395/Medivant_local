'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_roles', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      role_id: {
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
    });

    await queryInterface.addConstraint('user_roles', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_user_roles_user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('user_roles', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'fk_user_roles_role',
      references: {
        table: 'roles',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('user_roles', {
      fields: ['user_id', 'role_id'],
      type: 'unique',
      name: 'unique_user_role_pair',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('user_roles', 'unique_user_role_pair').catch(() => {});

    await queryInterface.removeConstraint('user_roles', 'fk_user_roles_role').catch(() => {});
    await queryInterface.removeConstraint('user_roles', 'fk_user_roles_user').catch(() => {});

    await queryInterface.dropTable('user_roles');
  }
};
