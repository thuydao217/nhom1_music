const { getHomePage } = require('../controller/home.controller')
const { getLoginpage } = require('../controller/user.controller')

const auth = (...roles) => {
  return (req, res, next) => {
    const user = req.session.user

    // Nếu không tồn tại user yêu cầu người dùng đăng nhập
    if (!user) {
      res.redirect('/login')
      return
    }

    // Kiểm tra user có quyền truy cập vào route không
    if (roles.length > 0 && !roles.includes(user.role)) {
      res.redirect('/home')
      return
    }

    next()
  }
}

const requireLogout = (req, res, next) => {
  const user = req.session.user

  if (user) res.redirect('/home')

  next()
}

module.exports = { auth, requireLogout }
