const checkAuth = (req, res, next) => {
  const userID = req.session?.user?.id

  if (userID) {
    return next()
  }

  return res.sendStatus(401)
}
module.exports = {
  checkAuth,
}
