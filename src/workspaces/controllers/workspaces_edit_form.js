import Workspaces from '../../../models/Workspaces';


module.exports = async (req, res) => {
    try {
        const {id} = req.params;
        const workspace = await Workspaces.findOne({where:{id}});
        res.render('workspacesForm', {workspace})
    } catch (error) {
        console.log(error)
    }
};