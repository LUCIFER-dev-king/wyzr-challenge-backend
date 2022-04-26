module.exports.isUserAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send("User not Logged In.");
  }
};
