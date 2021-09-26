const User = require('../database/models/user');
const bcrypt = require('bcrypt');

const saltRound = 10;

const userSignup = async (req, res) => {
  const { email, password: pass, name, surname } = req.body;
  if (email && pass && name && surname) {
    const password = await bcrypt.hash(pass, saltRound);
    const newUser = await User.create({
      email,
      password,
      name,
      surname,
    });

    req.session.user = {
      id: newUser._id,
      name: newUser.name,
    };

    return res.json({
      name: newUser.name,
      _id: newUser._id,
      email: newUser.email,
      status: newUser.status,
      avatar: newUser.avatar,
    });
  }
  return res.statuStatus(418);
};

const userSignin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (email && password) {
    const currentUser = await User.findOne({ email });
    console.log(currentUser);
    if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
      req.session.user = {
        id: currentUser._id,
        name: currentUser.name,
      };
      return res.json({
        name: currentUser.name,
        _id: currentUser._id,
        email: currentUser.email,
        status: currentUser.status,
        avatar: currentUser.avatar,
      });
    }
    return res.sendStatus(412);
  }
  return res.sendStatus(412);
};

const getUser = async (req, res) => {
  const user = await User.find;
  console.log(user);
  res.json(user);
};

const userSignout = async (req, res) => {
  req.session.destroy(function (err) {
    if (err) return res.sendStatus(401);

    res.clearCookie(req.app.get('cookieName'));
    return res.sendStatus(200);
  });
};

const userInfo = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.json(user);
};

const changeAvatarBack = async (req, res) => {
  const { id } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    {
      avatar: `/img/${req.file.filename}`,
    },
    { new: true }
  );

  return res.json({
    _id: user._id,
    status: user.status,
    email: user.email,
    rating: user.rating,
    name: user.name,
    avatar: user.avatar,
  });
};

const checkUser = async (req, res) => {
  if (req.session.user?.id) {
    const currentUser = await User.findById(req.session.user.id, {
      password: 0,
    });
    return res.json(currentUser);
  }
  return res.sendStatus(401);
};

const updateUserProfile = async (req, res) => {
  const { name, surname, email, telegram, showContact } = req.body;
  const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updateUser);
};

module.exports = {
  userSignup,
  userSignin,
  userSignout,
  userInfo,
  checkUser,
  changeAvatarBack,
  getUser,
  updateUserProfile,
};
