const CompanyModel = require('../database/models/company');

const getAllCompany = async (req, res) => {
  const allCompanyFromServer = await CompanyModel.find();
  res.json(allCompanyFromServer);
};

const findCompanyByInput = async (req, res) => {
  const currentCompanyFromServer = await CompanyModel.find({
    companyName: { $regex: new RegExp('^' + req.body.text.toLowerCase(), 'i') },
  });
  res.json(currentCompanyFromServer);
};

const findOneCompanyById = async (req, res) => {
  const currentCompany = await CompanyModel.findById(req.params.id).populate({
    path: 'reviews',
    populate: {
      path: 'author',
    },
  });

  res.json(currentCompany);
};

const setCompanyGraduates = async (req, res) => {
  const newCompany = await CompanyModel.findById(req.params.id).populate({
    path: 'reviews',
    populate: {
      path: 'author',
    },
  });
  if (newCompany.graduates.includes(req.body.userId)) {
    newCompany.graduates.splice(
      newCompany.graduates.indexOf(req.body.userId),
      1
    );
  } else {
    newCompany.graduates.push(req.body.userId);
  }
  await newCompany.save();
  res.json(newCompany);
};

module.exports = {
  getAllCompany,
  findCompanyByInput,
  findOneCompanyById,
  setCompanyGraduates,
};
