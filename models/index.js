import Sequelize from 'sequelize';
import Users from './Users';
import Workspaces from './Workspaces';
import config from '../components/db/config';
const dbConfig = config[process.env.NODE_ENV];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    port: dbConfig.port
  }
);

const models = {
  Users: Users.init(sequelize, Sequelize),
  Workspaces: Workspaces.init(sequelize, Sequelize)
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

sequelize.sync()

export default {
  ...models,
  sequelize
};