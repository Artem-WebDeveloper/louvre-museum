class ExploreSlider {
  _slider = document.querySelector('.explore-container__img-slider');
  _containerSlider = document.querySelector('.explore-container__img');
  constructor() {
    this._slider.addEventListener('input', e => {
      this._containerSlider.style.setProperty(
        '--position',
        `${e.target.value}%`
      );
    });
  }
}

export default ExploreSlider;
