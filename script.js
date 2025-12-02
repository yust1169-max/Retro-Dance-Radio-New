async function updateNowPlaying() {
  try {
    const response = await fetch('http://84.247.184.238/api/nowplaying/1');
    const data = await response.json();

    const currentTrack = data.now_playing.song;
    document.getElementById('current-track').textContent = currentTrack.title;

    const historyEl = document.getElementById('history');
    historyEl.innerHTML = '';
    const lastTracks = data.now_playing.played.slice(-10).reverse();
    lastTracks.forEach(track => {
      const li = document.createElement('li');
      li.textContent = track.song.title;
      historyEl.appendChild(li);
    });

  } catch (error) {
    console.error('Ошибка при получении данных AzuraCast:', error);
    document.getElementById('current-track').textContent = "Прямой эфир Retro Dance Radio";
  }
}

setInterval(updateNowPlaying, 15000);
updateNowPlaying();
