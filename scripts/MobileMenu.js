class MobileMenu {
  _btnNav = document.querySelector('.mobile-nav-btn');
  _mobileNav = document.querySelector('.mobile-navigation');
  _welcomeBoxTitle = document.querySelector('.welcome-box');
  _menuOpenIcon = document.querySelector('[data-icon="menu-outline"]');
  _menuCloseIcon = document.querySelector('[data-icon="close-outline"]');
  constructor() {
    this._btnNav.addEventListener('click', this._switchMenu.bind(this));
  }

  _switchMenu() {
    const menuIsOpen = this._mobileNav.classList.contains(
      'mobile-navigation--open'
    );

    if (menuIsOpen) this._closeMenu();
    else {
      this._openMenu();
      document.addEventListener('click', this._handleOutsideClick);
    }
  }

  _openMenu() {
    this._mobileNav.classList.add('mobile-navigation--open');
    this._welcomeBoxTitle.classList.add('welcome-box--hidden');
    this._menuOpenIcon.style.display = 'none';
    this._menuCloseIcon.style.display = 'block';
  }

  _closeMenu() {
    this._mobileNav.classList.remove('mobile-navigation--open');
    this._welcomeBoxTitle.classList.remove('welcome-box--hidden');
    this._menuOpenIcon.style.display = 'block';
    this._menuCloseIcon.style.display = 'none';

    document.removeEventListener('click', this._handleOutsideClick);
  }

  _handleOutsideClick = e => {
    const clickedInsideMenu = this._mobileNav.contains(e.target);
    const clickedBtn = this._btnNav.contains(e.target);

    if (!clickedInsideMenu && !clickedBtn) {
      this._closeMenu();
    }
  };
}

export default MobileMenu;
