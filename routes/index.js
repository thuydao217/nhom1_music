const express = require('express')
const router = express.Router()
const { auth, requireLogout } = require('../middlewares/auth')

const userController = require('../controller/user.controller')
const homeController = require('../controller/home.controller')
const songController = require('../controller/song.controller')
const uploadStorage = require('../middlewares/uploadStorage')

/* GET home page. */
router.get('/home', auth(), homeController.getHomePage)

/* GET songs */
router.get('/songs', songController.getAll)

/* POST songs */
router.post(
  '/songs',
  uploadStorage.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  songController.create
)

/* DELETE song */
router.get('/songs/:id', songController.deleteById)

/* GET login page. */
router.get('/admin', auth('admin'), homeController.getAdminPage)

/* GET login page. */
router.get('/users', userController.getAll)

/* GET login page. */
router.get('/users/:id', userController.deleteById)

/* GET login page. */
router.get('/login', requireLogout, userController.getLoginpage)

/* POST user login */
router.post('/login', requireLogout, userController.login)

/* POST user register */
router.post('/register', requireLogout, userController.register)

/* GET user register */
router.get('/logout', auth(), userController.logout)

module.exports = router
