const userService = require('../services/user.service')

/**
 * @GET
 * Get login page
 */
const getLoginpage = (req, res) => {
  return res.render('login', {
    errors: req.flash('errors'),
    success: req.flash('success'),
  })
}

/**
 * @POST
 * Handle login
 */
const login = async (req, res) => {
  try {
    // Lấy email và password khi dùng đăng nhập
    const { email, password } = req.body
    console.log({ email, password })
    // Login
    const user = await userService.login(email, password)

    // Lưu user vào session
    req.session.user = user
    console.log({ user })
    // Success
    return res.redirect('/home')
  } catch (error) {
    console.log({ error })
    req.flash('errors', error.message)
    return res.redirect('/login')
  }
}

/**
 * @POST
 * Handle register
 */
const register = async (req, res) => {
  try {
    // Lấy name, email và password khi dùng đăng ký
    const { name, email, password } = req.body

    // Login
    await userService.create({ name, email, password })

    // Success
    req.flash('success', 'Tạo tài khoản thành công!')
    return res.redirect('/login')
  } catch (error) {
    req.flash('errors', error.message)
    return res.redirect('/login')
  }
}

/**
 * @GET
 * Handle logout
 */
const logout = (req, res) => {
  // Xóa user khỏi session
  delete req.session.user

  // success
  req.flash('success', 'Đăng xuất tài khoản thành công!')
  res.redirect('/login')
}

const getAll = async (req, res) => {
  const users = await userService.getAll()
  res.json(users)
}

const deleteById = async (req, res) => {
  await userService.deleteById(req.params.id)
  res.sendStatus(204)
}

module.exports = {
  getLoginpage,
  register,
  login,
  logout,
  getAll,
  deleteById,
}
