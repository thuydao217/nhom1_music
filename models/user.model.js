const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
    require: true,
    default: 'user',
  },
})

// Hash password khi lưu or chỉnh password
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

// Function kiểm tra mật khẩu
UserSchema.methods = {
  async isPasswordMatch(password) {
    return bcrypt.compare(password, this.password)
  },
}

const User = mongoose.model('user', UserSchema)

module.exports = User
