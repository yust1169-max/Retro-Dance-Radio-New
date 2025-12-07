const trackEl = document.getElementById('track');

async function updateNowPlaying() {
    try {
        const response = await fetch('https://radio.retrodanceradio.com/api/nowplaying/1');
        const data = await response.json();
        const song = data.now_playing.song;
        trackEl.textContent = song.artist + ' - ' + song.title;
    } catch(err) {
        trackEl.textContent = 'Нет данных о треке';
    }
}

updateNowPlaying();
setInterval(updateNowPlaying, 10000);
