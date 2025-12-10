const radio = document.getElementById("radio");
const btn = document.getElementById("playBtn");
const title = document.getElementById("trackTitle");
const cover = document.getElementById("cover");

let playing = false;

btn.addEventListener("click", async () => {
  try {
    if (!playing) {
      await radio.play();
      btn.textContent = "❚❚";
      playing = true;
    } else {
      radio.pause();
      btn.textContent = "▶";
      playing = false;
    }
  } catch(e) {
    alert("Нажмите ещё раз для запуска звука (ограничение браузера).");
  }
});

// AzuraCast Now Playing
async function updateNowPlaying() {
  try {
    const res = await fetch("https://radio.retrodanceradio.com/api/nowplaying/1");
    const data = await res.json();
    if (data?.now_playing?.song?.text) {
      title.innerText = data.now_playing.song.text;
      if (data.now_playing.song.art) {
        cover.style.backgroundImage = `url('${data.now_playing.song.art}')`;
      }
    }
  } catch(e) {}
}

updateNowPlaying();
setInterval(updateNowPlaying, 15000);
