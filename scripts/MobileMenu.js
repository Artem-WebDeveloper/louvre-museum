class MobileMenu {
  _btnNav = document.querySelector('.mobile-nav-btn');
  _mobileNav = document.querySelector('.mobile-navigation');
  _welcomeBoxTitle = document.querySelector('.welcome-box');
  _menuOpenIcon = document.querySelector('[name="menu-outline"]');
  _menuCloseIcon = document.querySelector('[name="close-outline"]');
  constructor() {
    this._btnNav.addEventListener('click', this._switchMenu.bind(this));
  }

  _switchMenu() {
    this._mobileNav.classList.toggle('mobile-navigation--open');
    this._welcomeBoxTitle.classList.toggle('welcome-box--hidden');

    const menuIsOpen = this._mobileNav.classList.contains(
      'mobile-navigation--open'
    );

    this._menuOpenIcon.style.display = menuIsOpen ? 'none' : 'block';
    this._menuCloseIcon.style.display = menuIsOpen ? 'block' : 'none';
  }
}

export default MobileMenu;
