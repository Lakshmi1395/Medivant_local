'use strict';

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

    // optional: add a unique index on name if you want unique permissions
    // await queryInterface.addIndex('permissions', ['name'], { name: 'ux_permissions_name', unique: true });
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.removeIndex('permissions', 'ux_permissions_name').catch(()=>{});
    await queryInterface.dropTable('permissions').catch(()=>{});
  }
};
