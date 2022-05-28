const mongoose = require('mongoose')

const SongSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    singer: { type: String, require: true },
    image: { type: String, require: true },
    video: { type: String, require: true },
  },
  { timestamps: true }
)

const Song = mongoose.model('song', SongSchema)

module.exports = Song
