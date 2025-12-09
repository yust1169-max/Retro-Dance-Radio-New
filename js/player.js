const radio = document.getElementById("radio");
const btn = document.getElementById("playBtn");
const trackTitle = document.getElementById("trackTitle");
const cover = document.getElementById("cover");
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

let playing = false;
let audioCtx, analyser, source, dataArray;

btn.onclick = async () => {
  if (!playing) {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      source = audioCtx.createMediaElementSource(radio);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    }

    await radio.play();
    btn.innerText = "❚❚";
    playing = true;
    draw();
  } else {
    radio.pause();
    btn.innerText = "▶";
    playing = false;
  }
};

function draw() {
  if (!playing) return;

  requestAnimationFrame(draw);
  analyser.getByteFrequencyData(dataArray);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / dataArray.length);
  for (let i = 0; i < dataArray.length; i++) {
    const barHeight = dataArray[i] / 2;
    ctx.fillStyle = "#f4258c";
    ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 2, barHeight);
  }
}

async function updateNowPlaying() {
  try {
    const res = await fetch("https://radio.retrodanceradio.com/api/nowplaying/1");
    const data = await res.json();
    if (data?.now_playing?.song) {
      trackTitle.innerText = data.now_playing.song.text;
      if (data.now_playing.song.art) {
        cover.style.backgroundImage = "url('" + data.now_playing.song.art + "')";
      }
    }
  } catch(e) {}
}

updateNowPlaying();
setInterval(updateNowPlaying, 15000);
