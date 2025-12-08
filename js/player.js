async function loadNow() {
  const r = await fetch("https://radio.retrodanceradio.com/api/nowplaying/retro_dance_radio");
  const d = await r.json();

  const s = d.now_playing.song;

  document.getElementById("nowTitle").textContent = s.title || "Unknown";
  document.getElementById("nowArtist").textContent = s.artist || "";
  document.getElementById("nowCover").src = s.art || "logo.png";

  const cont = document.getElementById("trackHistory");
  cont.innerHTML = "";

  d.song_history.forEach((t,i)=>{
    const div = document.createElement("div");
    div.className="track-card";
    div.innerHTML = `
      <img src="${t.song.art || 'logo.png'}">
      <div>${t.song.artist}</div>
      <div>${t.song.title}</div>
    `;
    cont.appendChild(div);
  });
}

loadNow();
setInterval(loadNow, 10000);

document.getElementById("shareBtn").onclick = () => {
  const text = "🎧 Слушаю Retro Dance Radio";
  if(navigator.share){navigator.share({ text });}
};
