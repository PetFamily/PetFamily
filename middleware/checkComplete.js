module.exports = (redirectTo = '/profile') => (req, res, next) => {
  // console.log(req.user.pricePerHour)

  if (!req.user.pricePerHour) {
    res.redirect(redirectTo)
  } else {
    next();
  }
}