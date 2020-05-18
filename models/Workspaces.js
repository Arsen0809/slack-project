

'use strict';
import Sequelize from 'sequelize';

class Workspaces extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER(16),
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER(16),
        references: {
          model: sequelize.models.Users,
          key: 'id'
        },
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        isEmail: true
      },
      subDomain: {
        type: DataTypes.STRING,
      }
    },
      {
        sequelize,
        tableName: 'workspaces',
        timestamps: true
      }
    );
  }
}

export default Workspaces;


