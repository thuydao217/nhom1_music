// import Model
const User = require('../models/user.model')

// thêm mới
const create = async userBody => {
  const user = await User.findOne({ email: userBody.email })

  if (user) throw new Error('Email đã tồn tại trong hệ thống.')

  const newUser = new User(userBody)

  return newUser.save()
}

// Đăng nhập
const login = async (email, password) => {
  // Tìm user theo email
  const user = await User.findOne({ email })
  // console.log({ user })

  // Kiểm tra user có tồn tại và mật khẩu nhập đúng
  if (user && (await user.isPasswordMatch(password))) {
    delete user.password

    return user
  }

  // Error
  throw new Error('Incorrect email or password.')
}

const getAll = () => {
  return User.find().select('-password')
}

const deleteById = id => {
  return User.findByIdAndDelete(id)
}

module.exports = {
  create,
  login,
  getAll,
  deleteById,
}
