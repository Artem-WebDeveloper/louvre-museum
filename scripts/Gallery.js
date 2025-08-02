class Gallery {
  _galleryBlock = document.querySelector('.gallery');

  static shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  constructor(amountImgs) {
    this.amountImgs = amountImgs;
    this.imgs = Gallery.shuffle(this._createImgesPath());
    this._viewGalleryImg();
  }

  _createImgesPath() {
    return Array.from({ length: this.amountImgs }, (_, i) => i + 1);
  }

  _viewGalleryImg() {
    if (!this._galleryBlock) {
      console.log('Ошибка галереи');
      return;
    }

    this._galleryBlock.innerHTML = '';
    this._galleryBlock.insertAdjacentHTML('afterbegin', this._generateMarkup());
  }

  _generateMarkup() {
    return `<div class="column column-left">
              <img
                class="gallery-img"
                src="assets/img/galery/galery${this.imgs.pop() ?? ''}.jpg"
                alt="Image" />
              <img
                class="gallery-img"
                src="assets/img/galery/galery${this.imgs.pop() ?? ''}.jpg"
                alt="Image" />
              <img
                class="gallery-img"
                src="assets/img/galery/galery${this.imgs.pop() ?? ''}.jpg"
                alt="Image" />

              <img
                class="gallery-img"
                src="assets/img/galery/galery${this.imgs.pop() ?? ''}.jpg"
                alt="Image" />
            </div>

            <div class="column column-center">
              <img
                class="gallery-img"
                src="assets/img/galery/galery${this.imgs.pop() ?? ''}.jpg"
                alt="Image" />
              <img
                class="gallery-img"
                src="assets/img/galery/galery${this.imgs.pop() ?? ''}.jpg"
                alt="Image" />
              <img
                class="gallery-img"
                src="assets/img/galery/galery${this.imgs.pop() ?? ''}.jpg"
                alt="Image" />
              <img
                class="gallery-img"
                src="assets/img/galery/galery${this.imgs.pop() ?? ''}.jpg"
                alt="Image" />
            </div>

            <div class="column column-right">
              <img
                class="gallery-img"
                src="assets/img/galery/galery${this.imgs.pop() ?? ''}.jpg"
                alt="Image" />
              <img
                class="gallery-img"
                src="assets/img/galery/galery${this.imgs.pop() ?? ''}.jpg"
                alt="Image" />
              <img
                class="gallery-img"
                src="assets/img/galery/galery${this.imgs.pop() ?? ''}.jpg"
                alt="Image" />
              <img
                class="gallery-img"
                src="assets/img/galery/galery${this.imgs.pop() ?? ''}.jpg"
                alt="Image" />
            </div>`;
  }
}

export default Gallery;
