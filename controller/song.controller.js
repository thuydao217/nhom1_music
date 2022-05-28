const songService = require('../services/song.service')

const create = async (req, res, next) => {
  try {
    const { name, singer } = req.body
    const image = req.files.image[0].filename
    const video = req.files.video[0].filename

    // create song
    await songService.create({ name, image, video, singer })

    // success
    req.flash('success', 'Đã tạo bài hát thành công!')
    res.redirect('/admin')
  } catch (error) {
    // success
    req.flash('errors', 'Tạo bài hát không thành công!')
    res.redirect('/admin')
  }
}

const getAll = async (req, res, next) => {
  const songs = await songService.getAll()
  res.status(200).json(songs)
}

const deleteById = async (req, res, next) => {
  await songService.deleteById(req.params.id)
  res.redirect('/admin')
}

module.exports = {
  create,
  getAll,
  deleteById,
}
