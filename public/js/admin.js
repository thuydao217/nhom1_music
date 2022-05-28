const $ = document.querySelector.bind(document)

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

const htmlRows = songs => {
  const html = songs.map(
    song => `
    <tr>
      <td>${song.name}</td>
      <td>${song.singer}</td>
      <td>
        <img src="/uploads/images/${song.image}" alt='img' />
      </td>
      <td>
      <audio controls>
        <source src="/uploads/videos/${song.video}" type="audio/ogg">
        <source src="/uploads/videos/${song.video}" type="audio/mpeg">
          Your browser does not support the audio element.
      </audio>

      <td>
        <button class='view'>view</button>
        <a href="/songs/${song._id}" class='delete'>Delete</a>
      </td>
    </tr>`
  )
  return html.join('')
}

// Đợi DOM loaded
document.addEventListener('DOMContentLoaded', async () => {
  const songs = await getSongs()

  // If songs is empty
  if (songs.length < 1) return

  // Lấy số bài hát được tạo trong 24 giờ qua
  $('.new-songs span').innerHTML = songs.filter(
    song => new Date().getTime() - new Date(song.createdAt).getTime() <= 8640000 // 1day = 24 * 60 * 60 * 100
  ).length

  // Lấy số lượng bài hát có trong server
  $('.total-song span').innerHTML = songs.length

  // Đếm số ca sĩ có trong server
  $('.total-singer span').innerHTML = new Set(songs.map(s => s.singer)).size

  // New song component
  $('.menu-item__new-song').onclick = e => {
    $('.menu-item__new-song').classList.add('active')
    $('.menu-item__list-song').classList.remove('active')

    $('.list-song__container').classList.add('d-none')
    $('.new-song__container').classList.remove('d-none')

    $('.success') && $('.success').remove()
    $('.error') && $('.error').remove()
  }

  // List song component
  $('.menu-item__list-song').onclick = e => {
    $('.menu-item__list-song').classList.add('active')
    $('.menu-item__new-song').classList.remove('active')

    $('.list-song__container').classList.remove('d-none')
    $('.new-song__container').classList.add('d-none')

    $('.list-song__container tbody').innerHTML = htmlRows(songs)
  }
})
