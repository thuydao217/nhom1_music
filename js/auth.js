const $ = document.querySelector.bind(document)

const registerForm = $('.register-form')
const loginForm = $('.login-form')

// Mở form login
$('.login-form .message span').onclick = () => {
  loginForm.setAttribute('style', 'display: none;')
  registerForm.setAttribute('style', 'display: block;')

  // Xóa message nếu nó tồn tại
  if ($('.success')) $('.success').remove()
  if ($('.error')) $('.error').remove()
}

// Mở form register
$('.register-form .message span').onclick = () => {
  registerForm.setAttribute('style', 'display: none;')
  loginForm.setAttribute('style', 'display: block;')

  // Xóa message nếu nó tồn tại
  if ($('.success')) $('.success').remove()
  if ($('.error')) $('.error').remove()
}
