const { OAuth2Client } = require('google-auth-library')
const userModel = require('../database/models/user');

const client = new OAuth2Client(process.env.CLIENT_ID);

const googleRegistration = async (req, res) => {
  const { token } = req.body
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  });
  const { name, email, picture } = ticket.getPayload();
  let userDb = await userModel.findOne({ email: email })
  if (userDb) {
    req.session.user = { id: userDb._id }
    console.log(req.session);
    res.json(userDb)
  }
  else {
    const user = await userModel.create({ email: email, avatar: picture, name: name })
    req.session.user = { id: user._id }
    res.json(user)
  }
}
module.exports = googleRegistration
