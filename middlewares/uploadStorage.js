const multer = require('multer')

const images_directory = 'public/uploads/images'
const videos_directory = 'public/uploads/videos'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // setting destination of uploading files
    if (file.fieldname === 'image') {
      // if uploading image
      cb(null, images_directory)
    } else {
      // else uploading video
      cb(null, videos_directory)
    }
  },
  filename: (req, file, cb) => {
    // naming file
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
  },
})

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'image') {
    // if uploading image
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      // check file type to be png, jpg, or jpeg
      cb(null, true)
    } else {
      cb(null, false) // else fails
    }
  } else {
    // else uploading image
    if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3') {
      // check file type to be mp3
      cb(null, true)
    } else {
      cb(null, false) // else fails
    }
  }
}

const uploadStorage = multer({
  storage: storage,
  fileFilter: fileFilter,
})

module.exports = uploadStorage
