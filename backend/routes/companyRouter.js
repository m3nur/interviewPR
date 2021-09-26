const { Router } = require('express');
const {
  getAllCompany,
  findCompanyByInput,
  findOneCompanyById,
  setCompanyGraduates,
} = require('../controllers/companyController');

const companyRouter = Router();

companyRouter.route('/').get(getAllCompany);
companyRouter.route('/').post(findCompanyByInput);
companyRouter.route('/:id').get(findOneCompanyById);
companyRouter.route('/edit/:id').patch(setCompanyGraduates);
module.exports = companyRouter;
