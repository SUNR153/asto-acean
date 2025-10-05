class BackgroundAudio {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.volume = 0.3;
    this.isMuted = false;
    this.createAudioElement();
    this.createAudioControls();
    this.setupEventListeners();
  }

  createAudioElement() {
    this.audio = document.createElement('audio');
    this.audio.src = 'music/ambient.mp3';
    this.audio.loop = true;
    this.audio.volume = this.volume;
    this.audio.preload = 'auto';
    
    this.audio.style.display = 'none';
    document.body.appendChild(this.audio);
  }

  createAudioControls() {
    const audioPanel = document.createElement('div');
    audioPanel.id = 'audio-controls';
    audioPanel.innerHTML = `
      <div class="audio-panel">
        <button id="audio-play-pause" class="audio-btn" title="Play/Pause">
          ▶️
        </button>
        <button id="audio-mute" class="audio-btn" title="Sound off">
          🔊
        </button>
        <div class="volume-slider-container">
          <input type="range" id="volume-slider" min="0" max="1" step="0.1" value="${this.volume}">
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      #audio-controls {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
      }

      .audio-panel {
        display: flex;
        align-items: center;
        gap: 10px;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        padding: 10px 15px;
        border-radius: 25px;
        border: 1px solid rgba(168, 182, 255, 0.3);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
      }

      .audio-panel:hover {
        background: rgba(0, 0, 0, 0.9);
        border-color: rgba(168, 182, 255, 0.5);
      }

      .audio-btn {
        background: none;
        border: none;
        color: #a8b6ff;
        font-size: 18px;
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
      }

      .audio-btn:hover {
        background: rgba(168, 182, 255, 0.2);
        color: #b8c6ff;
        transform: scale(1.1);
      }

      .volume-slider-container {
        display: flex;
        align-items: center;
      }

      #volume-slider {
        width: 80px;
        height: 4px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        outline: none;
        cursor: pointer;
        -webkit-appearance: none;
        appearance: none;
      }

      #volume-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        background: #a8b6ff;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      #volume-slider::-webkit-slider-thumb:hover {
        background: #b8c6ff;
        transform: scale(1.2);
      }

      #volume-slider::-moz-range-thumb {
        width: 16px;
        height: 16px;
        background: #a8b6ff;
        border-radius: 50%;
        cursor: pointer;
        border: none;
        transition: all 0.3s ease;
      }

      #volume-slider::-moz-range-thumb:hover {
        background: #b8c6ff;
        transform: scale(1.2);
      }

      /* Адаптивность для мобильных устройств */
      @media (max-width: 768px) {
        #audio-controls {
          bottom: 15px;
          right: 15px;
        }

        .audio-panel {
          padding: 8px 12px;
          gap: 8px;
        }

        .audio-btn {
          width: 30px;
          height: 30px;
          font-size: 16px;
          padding: 6px;
        }

        #volume-slider {
          width: 60px;
        }
      }

      @media (max-width: 480px) {
        #audio-controls {
          bottom: 10px;
          right: 10px;
        }

        .audio-panel {
          padding: 6px 10px;
          gap: 6px;
        }

        .audio-btn {
          width: 28px;
          height: 28px;
          font-size: 14px;
          padding: 5px;
        }

        #volume-slider {
          width: 50px;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(audioPanel);
  }

  setupEventListeners() {
    const playPauseBtn = document.getElementById('audio-play-pause');
    const muteBtn = document.getElementById('audio-mute');
    const volumeSlider = document.getElementById('volume-slider');

    playPauseBtn.addEventListener('click', () => {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    });

    muteBtn.addEventListener('click', () => {
      this.toggleMute();
    });

    volumeSlider.addEventListener('input', (e) => {
      this.setVolume(parseFloat(e.target.value));
    });

    document.addEventListener('click', () => {
      if (!this.isPlaying && !this.isMuted) {
        this.play();
      }
    }, { once: true });

    this.loadAudioState();
  }

  play() {
    if (this.audio && !this.isMuted) {
      this.audio.play().then(() => {
        this.isPlaying = true;
        this.updatePlayButton();
        this.saveAudioState();
      }).catch(error => {
        console.log('auto-playback is blocked by the browser:', error);
      });
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.updatePlayButton();
      this.saveAudioState();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audio) {
      this.audio.muted = this.isMuted;
      this.updateMuteButton();
      this.saveAudioState();
    }
  }

  setVolume(volume) {
    this.volume = volume;
    if (this.audio) {
      this.audio.volume = volume;
      this.saveAudioState();
    }
  }

  updatePlayButton() {
    const playPauseBtn = document.getElementById('audio-play-pause');
    if (playPauseBtn) {
      playPauseBtn.textContent = this.isPlaying ? '⏸️' : '▶️';
      playPauseBtn.title = this.isPlaying ? 'Pause' : 'Play';
    }
  }

  updateMuteButton() {
    const muteBtn = document.getElementById('audio-mute');
    if (muteBtn) {
      muteBtn.textContent = this.isMuted ? '🔇' : '🔊';
      muteBtn.title = this.isMuted ? 'Sound on' : 'Sound of';
    }
  }

  saveAudioState() {
    const state = {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume
    };
    localStorage.setItem('stormy_audio_state', JSON.stringify(state));
  }

  loadAudioState() {
    try {
      const savedState = localStorage.getItem('stormy_audio_state');
      if (savedState) {
        const state = JSON.parse(savedState);
        this.isMuted = state.isMuted || false;
        this.volume = state.volume || 0.3;
        
        if (this.audio) {
          this.audio.muted = this.isMuted;
          this.audio.volume = this.volume;
        }

        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
          volumeSlider.value = this.volume;
        }

        this.updateMuteButton();
      }
    } catch (error) {
      console.log('error loading audio status:', error);
    }
  }

  getAudioState() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume
    };
  }

  setAudioState(isPlaying, isMuted, volume) {
    this.isMuted = isMuted;
    this.volume = volume;
    
    if (this.audio) {
      this.audio.muted = this.isMuted;
      this.audio.volume = this.volume;
    }

    const volumeSlider = document.getElementById('volume-slider');
    if (volumeSlider) {
      volumeSlider.value = this.volume;
    }

    this.updateMuteButton();
    
    if (isPlaying && !this.isMuted) {
      this.play();
    } else {
      this.pause();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.backgroundAudio = new BackgroundAudio();
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BackgroundAudio;
}
