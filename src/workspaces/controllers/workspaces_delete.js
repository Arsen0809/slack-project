import Workspaces from '../../../models/Workspaces';


module.exports = async (req, res) => {
  try {
      await Workspaces.destroy({ where: { id: req.params.id }});
      await req.flash(
        'success_msg',
        'You have successfully deleted workspace'
      );
      res.redirect(`/workspaces?token=${res.locals.token}`);
  } catch (error) {
    console.log(error)
  }
};