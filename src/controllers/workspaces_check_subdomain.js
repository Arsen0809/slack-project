import Workspaces from '../../../models/Workspaces';
import Sequelize from 'sequelize';


module.exports = async (req, res) => {
  try {
    const { subDomain, } = req.query;
      const workspaces = await Workspaces.findAll({ where: {subDomain: {
        [Sequelize.Op.like]: `${subDomain}%`
      }}});
      if (!workspaces.length) return res.send({message: 'SubDomain is available', result:[]})
      const availableSubDomains = [];
      for(let i = 1; i <= 5; i++) {
        availableSubDomains.push(`${subDomain}${i}`)    
      }
      for (let i = 0; i < workspaces.length; i++) {
        const j = availableSubDomains.indexOf(`${workspaces[i].subDomain}`);
        if (j !== -1) {
            const index = +availableSubDomains[availableSubDomains.length - 1].split(subDomain)[1];
            availableSubDomains[j] = `${subDomain}${index + 1}`;
            i = 0
        }
      }
      res.send({message: 'SubDomain is not available', result: availableSubDomains});
  } catch (error) {
    console.log(error)
  }
};