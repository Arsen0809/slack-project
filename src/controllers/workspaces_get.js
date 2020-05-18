import bcrypt from 'bcrypt';
import Workspaces from '../../../models/Workspaces';


module.exports = async (req, res) => {
  try {
    const token =  req.query.token
    const workspaces = await Workspaces.findAll({ where: { userId: req.user.id } });
    res.render('workspaces', { workspaces, token });
  } catch (error) {
  }
};