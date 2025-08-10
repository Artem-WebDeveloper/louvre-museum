class ButtonUp {
  _btn = document.querySelector('.btn-back-to-top');
  _scrollThreshold = 450;
  constructor() {
    if (!this._btn) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > this._scrollThreshold)
        this._btn.classList.remove('btn-back-to-top--hidden');
      else this._btn.classList.add('btn-back-to-top--hidden');
    });
    this._btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

export default ButtonUp;
