// Truy cập vào các thành phần
const musicContainer = document.getElementById('music-container')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')

const audio = document.getElementById('audio')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')
const title = document.getElementById('title')
const cover = document.getElementById('cover')

// Lấy tất cả bài hát từ server
const getSongs = async () => {
  try {
    const response = await fetch('http://localhost:3000/songs')
    const songs = response.json()
    return songs
  } catch (error) {
    console.log({ serverError: error })
    alert('Server crashed, please try again.')
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const songs = await getSongs()

  console.log({ songs })

  // Lấy index bất kỳ trong mảng songs để hiện thị
  let songIndex = 0
  console.log({ song1: songs[songIndex] })

  // Load 1 bài hát theo index
  loadSong(songs[songIndex])

  // Cập nhật thông tin bài hát
  function loadSong(song) {
    title.innerText = song.name
    audio.src = `/uploads/videos/${song.video}`
    cover.src = `/uploads/images/${song.image}`
  }

  // Play song
  function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
  }

  // Pause song
  function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
  }

  function prevSong() {
    songIndex--

    // Nếu đang là bài hát đầu thì quay lại bài hát cuối
    if (songIndex < 0) {
      songIndex = songs.length - 1
    }

    // Cập nhật thông tin của bài hát lên giao diện
    loadSong(songs[songIndex])

    // Phát nhạc
    playSong()
  }

  // Next song
  function nextSong() {
    // Tăng index của songIndex lên 1
    songIndex++

    // Nếu đang là bài hát cuối thì quay lại bài hát đầu
    if (songIndex > songs.length - 1) {
      songIndex = 0
    }

    // Cập nhật thông tin của bài hát lên giao diện
    loadSong(songs[songIndex])

    // Phát nhạc
    playSong()
  }

  function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100)
    curr_track.currentTime = seekto
  }

  function setVolume() {
    curr_track.volume = volume_slider.value / 100
  }

  // Update progress bar
  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
  }

  // Set progress bar
  function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
  }

  // Lắng nghe sự kiện
  playBtn.addEventListener('click', () => {
    // Kiểm tra xem musicContainer có chứa class "play" hay không?
    const isPlaying = musicContainer.classList.contains('play')

    // Nếu có thì thực hiện pause
    // Nếu không thì thực hiện play
    if (isPlaying) {
      pauseSong()
    } else {
      playSong()
    }
  })

  // Lắng nghe sự kiện khi next và prev bài hát
  prevBtn.addEventListener('click', prevSong)
  nextBtn.addEventListener('click', nextSong)

  // Time/song update
  audio.addEventListener('timeupdate', updateProgress)

  // Click on progress bar
  progressContainer.addEventListener('click', setProgress)

  // Lắng nghe sự kiện khi kết thúc bài hát
  audio.addEventListener('ended', nextSong)
})
