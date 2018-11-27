module.exports = (redirectTo = '/profile') => (req, res, next) => {
  if (!req.user.pricePerHour) {
    res.redirect(redirectTo)
  } else {
    next();
  }
}