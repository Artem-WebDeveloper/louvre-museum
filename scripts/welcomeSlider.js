class WelcomeSlider {
  _btnLeft = document.querySelector('.slider-arrow--left');
  constructor() {
    this._btnLeft.addEventListener('click', () => {
      console.log('work');
      console.log('33');
    });
  }
}

export default WelcomeSlider;
