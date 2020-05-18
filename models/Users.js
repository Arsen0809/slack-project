

'use strict';
import Sequelize from 'sequelize';

class Users extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
        id: {
          type: DataTypes.INTEGER(16),
          primaryKey: true,
          autoIncrement: true
        },
        fullName: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
          isEmail: true
        },
        password: {
          type: DataTypes.STRING,
        }
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: true
      }
    );
  }

  static associate(models) {
    models.Users.hasMany(models.Workspaces, { foreignKey: 'userId', as: 'workspaces' });

  }
}

export default Users;


