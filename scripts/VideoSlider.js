class VideoSlider {
  _btnLeft = document.querySelector('#video-slider-btn-left');
  _btnRight = document.querySelector('#video-slider-btn-right');

  constructor() {
    this._btnLeft.addEventListener('click', this._prevSlide.bind(this));
    this._btnRight.addEventListener('click', this._nextSlide.bind(this));
  }

  goToSlide(slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
    // Принцип работы слайдера
    // -100%, 0%, 100%, 200%
    // curSlide =1: -100%, 0%, 100%, 200%
  }

  _prevSlide() {}

  _nextSlide() {}
}

export default VideoSlider;
