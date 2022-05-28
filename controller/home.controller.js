const getHomePage = (req, res) => {
  const user = req.session.user
  delete user.password
  return res.render('home', { user })
}

const getAdminPage = (req, res) => {
  const user = req.session.user
  delete user.password
  return res.render('admin', {
    errors: req.flash('errors'),
    success: req.flash('success'),
    user,
  })
}

module.exports = {
  getHomePage,
  getAdminPage,
}
