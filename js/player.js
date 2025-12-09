const radio = document.getElementById("radio");
const btn = document.getElementById("playBtn");
const title = document.getElementById("trackTitle");
const cover = document.getElementById("cover");
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

let audioCtx, analyser, source, dataArray;
let playing = false;

btn.addEventListener("click", async () => {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      source = audioCtx.createMediaElementSource(radio);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    }

    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }

    if (!playing) {
      await radio.play();
      btn.textContent = "❚❚";
      playing = true;
      animate();
    } else {
      radio.pause();
      btn.textContent = "▶";
      playing = false;
    }
  } catch (e) {
    alert("Нажми ещё раз для запуска звука (ограничение iPhone)");
  }
});

function animate() {
  if (!playing) return;
  requestAnimationFrame(animate);

  analyser.getByteFrequencyData(dataArray);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = canvas.width / dataArray.length;
  for (let i = 0; i < dataArray.length; i++) {
    const barHeight = dataArray[i];

    ctx.fillStyle = "#ff0080";
    ctx.fillRect(
      i * barWidth,
      canvas.height - barHeight / 1.5,
      barWidth - 2,
      barHeight / 1.5
    );
  }
}

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
