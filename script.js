document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.querySelector('.play');
    const pauseButton = document.querySelector('.pause');
    const progressBar = document.querySelector('.progress-bar');

    let audio = new Audio('track.mp3');

    playButton.addEventListener('click', () => {
        audio.play();
    });

    pauseButton.addEventListener('click', () => {
        audio.pause();
    });

    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;
    });
});
