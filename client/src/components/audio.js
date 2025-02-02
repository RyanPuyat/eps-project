import axios from 'axios';
class Audio {
  constructor() {
    this._apiUrl = 'http://localhost:5000';
    this.fetchAudio();
  }

  async fetchAudio() {
    const res = await axios.get(`${this._apiUrl}/api/audiolearnings`);
    this.audio = res.data.data;
    console.log(this.audio);
    this.displayAudio();
  }

  displayAudio() {
    const audioContainer = document.getElementById('audioPlayer');

    audioContainer.innerHTML = '';
    this.audio.forEach((audioData) => {
      const audioEl = document.createElement('div');
      audioEl.classList.add(
        'p-3',
        'mt-5',
        'border',
        'border-secondary',
        'rounded-pill'
      );

      audioEl.innerHTML = `
             <div class="audio-div">    
             <h5>Listen to the audio:</h5>
             <h2 class="audio-icon"> </h2>
             <span><i class="fa fa-volume-up fa-2x"></i></span>
             <span class="audio-text">${audioData.hangul}</span> 
             <span class="audio-text">${audioData.slang}</span> 
             <span class="audio-text">${audioData.english}</span> 
             <audio hidden>
             <source src="${audioData.audio}" />
               Your browser does not support the audio element.
             </audio>
             </div>`;
      audioContainer.appendChild(audioEl);
      this.audioControls();
    });
  }

  audioControls() {
    const audioEl = document.querySelectorAll('audio');

    audioEl.forEach((audio) => {
      const playButton = audio.parentElement.querySelector('i');
      let isPlaying = false;

      playButton.addEventListener('click', () => {
        audioEl.forEach((otherAudio) => {
          if (otherAudio !== this.audio && !otherAudio.paused) {
            otherAudio.pause();
            otherAudio.parentElement.querySelector('i').style.opacity = '.5';
          }
        });

        if (!isPlaying) {
          audio.play();
          isPlaying = true;
          playButton.style.opacity = '1';
        } else {
          audio.pause();
          audio.currentTime = 0;
          isPlaying = false;
          playButton.style.opacity = '.5';
        }
      });

      audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        isPlaying = false;
        playButton.style.opacity = '.5';
      });
    });
  }
}

export default Audio;
