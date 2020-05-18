import bcrypt from 'bcrypt';
import Users from '../../../models/Users';
import uuidv1 from 'uuid/v1';
import Workspaces from '../../../models/Workspaces';


module.exports = async (req, res) => {
    try {
        const { name, subDomain, } = req.body;
        let errors = [];

        if (!name || !subDomain) {
            errors.push({ msg: 'Please enter all fields' });
        }
        if (errors.length > 0) {
            console.log('error', errors)
            res.render('workspacesForm', {
                errors,
            });
        } else {
            const workspace = await Workspaces.findOne({ where: { id: req.params.id, userId: req.user.id } });
            if (!workspace) res.status(401).redirect(`/workspaces?token=${res.locals.token}`) 
            await Workspaces.update({
                name,
                subDomain,
            }, { where: { id: req.params.id } })
            await req.flash(
                'success_msg',
                'You are now registered and can log in'
            );
            res.redirect(`/workspaces?token=${res.locals.token}`);
        }
    } catch (error) {
        console.log(error)
    }
};