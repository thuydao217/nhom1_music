const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const flash = require('connect-flash')

const indexRouter = require('./routes/index')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const mongodbUrl =
  'mongodb://localhost/Music'
// Connect mongodb
const connectDB = async () => {
  const options = {}
  const conn = await mongoose.connect(mongodbUrl, options)
  console.log(`MongDB Connected: ${conn.connection.host}`)
}

connectDB()

// Config session
const sessionStore = MongoStore.create({
  mongoUrl: mongodbUrl,
  autoRemove: 'native',
})
app.use(
  session({
    secret: 'keyboard cat',
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 86400 seconds = 1 day
    },
  })
)

// Enable flash message
app.use(flash())

// Initial routes
app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (error, req, res, next) {
  console.log({ error })
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  res.render('not-found')
})

app.listen(3000, function () {
  console.log('server is running on http://localhost:3000/home')
})

module.exports = app
