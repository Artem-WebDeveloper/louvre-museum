import CustomVideoPlayer from './CustomVideoPlayer.js';

class VideoSlider {
  _btnLeft = document.querySelector('#video-slider-btn-left');
  _btnRight = document.querySelector('#video-slider-btn-right');
  _sliderTrack = document.querySelector('.video-slider');
  _sliderElements = document.querySelectorAll('.video-slider__item');

  _paginationDots = document.querySelectorAll('.video-pagination__circle');
  _dotContainer = document.querySelector('.video-pagination');
  _maxSlide = this._sliderElements.length;
  _curSlide = 0;

  _mainVideoEl = document.querySelector('.video-element');

  constructor() {
    this._customPlayer = new CustomVideoPlayer();
    this._visibleSlides = this._calcVisibleSlides();
    this._btnLeft.addEventListener('click', this._prevSlide.bind(this));
    this._btnRight.addEventListener('click', this._nextSlide.bind(this));
    this._dotContainer.addEventListener(
      'click',
      this._handleDotClick.bind(this)
    );
    window.addEventListener('resize', this._handleResize.bind(this));

    this._goToSlide(0);

    document.addEventListener('keydown', this._keyboardSlideSwitch.bind(this));
  }

  _calcVisibleSlides() {
    const width = window.innerWidth;
    if (width >= 769) return 3;
    return 2;
  }

  _handleResize() {
    const oldVisible = this._visibleSlides;
    this._visibleSlides = this._calcVisibleSlides();
    if (oldVisible !== this._visibleSlides) {
      this._goToSlide(this._curSlide);
    }
  }

  _goToSlide(slide) {
    if (this._maxSlide <= this._visibleSlides) {
      slide = 0;
    } else {
      if (slide < 0) slide = this._maxSlide - this._visibleSlides;
      if (slide > this._maxSlide - this._visibleSlides) slide = 0;
    }

    this._curSlide = slide;

    let slideWidthPercent;
    let gapPercent = 3;

    if (this._visibleSlides === 3) {
      slideWidthPercent = 31.4;
    } else if (this._visibleSlides === 2) {
      slideWidthPercent = 48.6;
    } else {
      slideWidthPercent = 100;
    }
    const shiftPercent = -slide * (slideWidthPercent + gapPercent);
    this._sliderTrack.style.transform = `translateX(${shiftPercent}%)`;
  }

  _nextSlide() {
    this._goToSlide(this._curSlide + 1);
    this._activateDot(this._curSlide);

    this._changeMainVideo(this._curSlide);
  }

  _prevSlide() {
    this._goToSlide(this._curSlide - 1);
    this._activateDot(this._curSlide);

    this._changeMainVideo(this._curSlide);
  }

  _keyboardSlideSwitch(e) {
    if (e.code === 'ArrowLeft') this._prevSlide();
    if (e.code === 'ArrowRight') this._nextSlide();
  }

  _activateDot(slide) {
    this._paginationDots.forEach(dot =>
      dot.classList.remove('video-pagination__circle--active')
    );

    document
      .querySelector(`.video-pagination__circle[data-slide="${slide}"]`)
      .classList.add('video-pagination__circle--active');
  }

  _handleDotClick(e) {
    if (e.target.classList.contains('video-pagination__circle')) {
      const slide = +e.target.dataset.slide;

      this._goToSlide(slide);
      this._activateDot(slide);

      this._changeMainVideo(slide);
    }
  }

  _changeMainVideo(slide) {
    this._mainVideoEl.src = `assets/video/video${slide}.mp4`;
    this._mainVideoEl.poster = `assets/video/poster${slide}.jpg`;

    this._customPlayer.resetPlayerState();
  }
}

export default VideoSlider;
