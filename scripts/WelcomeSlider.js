class WelcomeSlider {
  _btnLeft = document.querySelector('.slider-arrow--left');
  _btnRight = document.querySelector('.slider-arrow--right');

  _slides = document.querySelectorAll('.slider-img');
  _track = document.querySelector('.slider-track');

  _squaresContainer = document.querySelector('.welcome-pagination__carousel');
  _curNumSlide = document.querySelector('.welcome-pagination__current');

  _curSlide = 0;
  _maxSlide = this._slides.length;

  _startX = 0;
  _endX = 0;

  constructor() {
    this._goToSlide(0);
    this._btnLeft.addEventListener('click', this._prevSlide.bind(this));
    this._btnRight.addEventListener('click', this._nextSlide.bind(this));

    this._squaresContainer.addEventListener(
      'click',
      this._handleSquareClick.bind(this)
    );

    /* Свайпы */
    // для мыши
    this._track.addEventListener('mousedown', this._handleMouseDown.bind(this));
    this._track.addEventListener('mouseup', this._handleMouseUp.bind(this));

    // swipes для мобилы
    this._track.addEventListener(
      'touchstart',
      this._handleTouchStart.bind(this),
      { passive: true }
    );
    this._track.addEventListener('touchend', this._handleTouchEnd.bind(this));
  }

  _handleSquareClick(e) {
    if (e.target.classList.contains('welcome-pagination__slide')) {
      const { slide } = e.target.dataset;
      this._curSlide = +slide;
      this._updateSlide();
    }
  }

  _goToSlide(slide) {
    this._track.style.transform = `translateX(-${100 * slide}%)`;
  }

  _nextSlide = function () {
    this._curSlide === this._maxSlide - 1
      ? (this._curSlide = 0)
      : this._curSlide++;
    this._updateSlide();
  };

  _prevSlide = function () {
    this._curSlide === 0
      ? (this._curSlide = this._maxSlide - 1)
      : this._curSlide--;
    this._updateSlide();
  };

  _activateSquare(slide) {
    const squares = document.querySelectorAll('.welcome-pagination__slide');
    squares.forEach(square =>
      square.classList.remove('welcome-pagination__slide--active')
    );

    document
      .querySelector(`[data-slide="${slide}"]`)
      .classList.add('welcome-pagination__slide--active');
  }

  _changeSlideNum(slide) {
    this._curNumSlide.textContent = `0${+slide + 1}`;
  }

  _updateSlide() {
    this._goToSlide(this._curSlide);
    this._activateSquare(this._curSlide);
    this._changeSlideNum(this._curSlide);
  }

  // Свайпы
  _handleTouchStart(e) {
    this._startX = e.touches[0].clientX;
  }

  _handleTouchEnd(e) {
    this._endX = e.changedTouches[0].clientX;
    this._handleSwipe();
  }

  _handleSwipe() {
    const distance = this._endX - this._startX;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        this._prevSlide();
      } else {
        this._nextSlide();
      }
    }
  }

  // для декстопа
  _handleMouseDown(e) {
    e.preventDefault();
    this._startX = e.clientX;
  }

  _handleMouseUp(e) {
    this._endX = e.clientX;
    this._handleSwipe();
  }
}

export default WelcomeSlider;
