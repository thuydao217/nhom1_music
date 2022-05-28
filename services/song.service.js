// import Model
const Song = require('../models/song.model')

// thêm mới
const create = songBody => {
  // Tạo bài hát
  const song = Song.create(songBody)

  // Success
  return song
}

// Lấy ra tất cả bài hát
const getAll = () => {
  const songs = Song.find().sort('-createdAt')

  // Success
  return songs
}
const deleteById = songId => {
  const song = Song.findByIdAndDelete(songId)
  return song
}
module.exports = {
  create,
  getAll,
  deleteById,
}
