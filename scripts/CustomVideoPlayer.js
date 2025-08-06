class CustomVideoPlayer {
  _videoPlayer = document.querySelector('.video-player');
  _video = document.querySelector('.video-element');
  _btnPlaySmall = document.querySelector('.player-btn--small');
  _btnPlayBig = document.querySelector('.player-btn--big');
  _btnVolume = document.querySelector('.player-btn__volume-icon');
  _btnFullScreen = document.querySelector('.player-btn__fullscreen-icon');
  _iconPlaySmall = document.querySelector('.player-btn__img--play');
  _iconVolume = document.querySelector('.player-btn__img--volume');

  _progressDuration = document.querySelector('.progress-bar--duration');
  _progressVolume = document.querySelector('.progress-bar--volume');

  _prevVolume;
  _isMute = false;
  _isPlayerVisible = false;
  static DEFAULT_VOLUME = 50;
  static DEFAULT_PROGRESS_COLOR = '#710707';

  _observer = new IntersectionObserver(
    ([entry]) => {
      this._isPlayerVisible = entry.isIntersecting;
    },
    {
      threshold: 0.15,
    }
  );

  constructor() {
    this._video.addEventListener('click', this._togglePlay.bind(this));
    this._video.addEventListener('play', this._updateBtn.bind(this));
    this._video.addEventListener('pause', this._updateBtn.bind(this));
    this._video.addEventListener(
      'timeupdate',
      this._updateProgressDuration.bind(this)
    );

    this._btnPlaySmall.addEventListener('click', this._togglePlay.bind(this));
    this._btnPlayBig.addEventListener('click', this._togglePlay.bind(this));
    this._btnVolume.addEventListener('click', this._toggleMute.bind(this));
    this._btnFullScreen.addEventListener(
      'click',
      this._toggleFullscreen.bind(this)
    );

    this._progressDuration.addEventListener(
      'input',
      this._updateDurationVideo.bind(this)
    );
    this._progressVolume.addEventListener(
      'input',
      this._updateVolume.bind(this)
    );

    this._progressVolume.value = CustomVideoPlayer.DEFAULT_VOLUME;
    this._updateVolume();
    this._updateBgSlider(
      this._progressDuration,
      CustomVideoPlayer.DEFAULT_PROGRESS_COLOR
    );

    document.addEventListener(
      'fullscreenchange',
      this._closeFullscreenForce.bind(this)
    );

    this._observer.observe(this._videoPlayer);
    document.addEventListener('keydown', this._handleControlVideo.bind(this));
  }

  _togglePlay() {
    this._video.paused ? this._video.play() : this._video.pause();
  }

  _toggleMute() {
    this._isMute = !this._isMute;

    if (this._isMute) {
      this._prevVolume = this._video.volume;
      this._video.volume = 0;
      this._progressVolume.value = 0;
    } else {
      this._video.volume =
        this._prevVolume ?? CustomVideoPlayer.DEFAULT_VOLUME / 100;
      this._progressVolume.value = this._video.volume * 100;
    }

    this._updateBtnVolume();
    this._updateBgSlider(
      this._progressVolume,
      CustomVideoPlayer.DEFAULT_PROGRESS_COLOR
    );
  }

  _toggleFullscreen() {
    if (!document.fullscreenElement) {
      this._videoPlayer.requestFullscreen();
      this._video.classList.add('video-element--fullscreen');
    } else {
      document.exitFullscreen();
      this._video.classList.remove('video-element--fullscreen');
    }
  }

  _updateBtn() {
    this._iconPlaySmall.src = this._video.paused
      ? 'assets/svg/button-play-small.svg'
      : 'assets/svg/button-pause-small.svg';

    this._btnPlayBig.style.opacity = this._video.paused ? '1' : '0';
  }

  _updateBtnVolume() {
    this._iconVolume.src = this._isMute
      ? 'assets/svg/volume-icon-off.svg'
      : 'assets/svg/volume-icon.svg';
  }

  _updateDurationVideo() {
    this._video.currentTime =
      (this._progressDuration.value / 100) * this._video.duration;
    this._updateBgSlider(
      this._progressDuration,
      CustomVideoPlayer.DEFAULT_PROGRESS_COLOR
    );
  }

  _updateProgressDuration() {
    this._progressDuration.value =
      (this._video.currentTime / this._video.duration) * 100;
    this._updateBgSlider(
      this._progressDuration,
      CustomVideoPlayer.DEFAULT_PROGRESS_COLOR
    );
  }

  _updateBgSlider(slider, color) {
    const value = slider.value;
    slider.style.background = `linear-gradient(
  to right,
  ${color} 0%,
  ${color} ${value}%,
  #c4c4c4 ${value}%,
  #c4c4c4 100%
)`;
  }

  _updateVolume() {
    this._video.volume = this._progressVolume.value / 100;
    this._updateBgSlider(
      this._progressVolume,
      CustomVideoPlayer.DEFAULT_PROGRESS_COLOR
    );

    if (this._video.volume == 0) {
      this._isMute = true;
    } else {
      this._isMute = false;
      this._prevVolume = this._video.volume;
    }
    this._updateBtnVolume();
  }

  _closeFullscreenForce() {
    if (!document.fullscreenElement) {
      this._video.classList.remove('video-element--fullscreen');
    } else {
      this._video.classList.add('video-element--fullscreen');
    }
  }

  _handleControlVideo(e) {
    const activeElement = document.activeElement;
    const tag = activeElement.tagName.toLowerCase();
    const isSliderFocused =
      activeElement === this._progressDuration ||
      activeElement === this._progressVolume;

    if (!['input', 'textarea'].includes(tag) || isSliderFocused) {
      if (!this._isPlayerVisible) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          this._togglePlay();
          break;
        case 'KeyM':
          this._toggleMute();
          break;
        case 'KeyF':
          this._toggleFullscreen();
          break;
        case 'Period':
          if (e.shiftKey) this._slowDownVideo();
          break;
        case 'Comma':
          if (e.shiftKey) this._speedUpVideo();
          break;
      }
    }
  }

  _speedUpVideo() {
    this._video.playbackRate = +Math.min(
      this._video.playbackRate + 0.25,
      3
    ).toFixed(2);
  }

  _slowDownVideo() {
    this._video.playbackRate = +Math.max(
      this._video.playbackRate - 0.25,
      0.25
    ).toFixed(2);
  }
}

export default CustomVideoPlayer;
