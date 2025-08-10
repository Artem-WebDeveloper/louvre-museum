class TicketsForm {
  _dateEl = document.querySelector('[name="visit-date"]');
  _timeEl = document.querySelector('[name="visit-time"]');

  _dateInfoEl = document.querySelector('#info-date');
  _timeInfoEl = document.querySelector('#info-time');

  _formName = document.querySelector('#name');
  _formEmail = document.querySelector('#e-mail');
  _formPhone = document.querySelector('#phone');
  constructor() {
    this._dateEl.addEventListener('change', this._displayDate.bind(this));
    this._timeEl.addEventListener('change', this._displayTime.bind(this));

    document.addEventListener('DOMContentLoaded', this._correctDate.bind(this));

    this._formName.addEventListener('input', this._validateName.bind(this));
    this._formName.addEventListener('blur', () => {
      const errorEl = document.querySelector('#error-name');
      errorEl.style.display = 'none';
    });

    this._formEmail.addEventListener('input', this._validateEmail.bind(this));
    this._formEmail.addEventListener('blur', () => {
      const errorEl = document.querySelector('#error-email');
      errorEl.style.display = 'none';
    });

    this._formPhone.addEventListener('input', this._validatePhone.bind(this));
    this._formPhone.addEventListener('blur', () => {
      const errorEl = document.querySelector('#error-phone');
      errorEl.style.display = 'none';
    });
  }

  _displayDate() {
    const date = new Date(this._dateEl.value);
    const month = date.toLocaleString('en-US', { month: 'long' });
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
    const day = date.getDate();

    this._dateInfoEl.textContent = `${dayOfWeek}, ${month} ${day}`;
  }

  _correctDate() {
    const today = new Date().toISOString().split('T')[0];
    this._dateEl.min = today;
    this._dateEl.value = today;

    this._displayDate();
  }

  _displayTime() {
    const selectTime = document.querySelector('select[name="visit-time"]');
    this._timeInfoEl.textContent = selectTime.value.split(':').join(' : ');
  }

  _validateName() {
    const errorEl = document.querySelector('#error-name');

    const value = this._formName.value.trim();

    if (!/^[a-zA-Zа-яА-ЯёЁ\s]{3,15}$/.test(value)) {
      this._formName.classList.remove('form__input--valid');
      this._formName.classList.add('form__input--invalid');
    } else {
      this._formName.classList.remove('form__input--invalid');
      this._formName.classList.add('form__input--valid');
    }

    if (!value) {
      errorEl.textContent = 'Пустое поле!';
      errorEl.style.display = 'block';
    } else if (value.length < 3) {
      errorEl.textContent = 'Имя слишком короткое';
      errorEl.style.display = 'block';
    } else if (value.length > 15) {
      errorEl.textContent = 'Имя слишком длинное';
      errorEl.style.display = 'block';
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value)) {
      errorEl.textContent =
        'Имя может содержать только русские или английские буквы';
      errorEl.style.display = 'block';
    } else errorEl.style.display = 'none';
  }

  _validateEmail() {
    const errorEl = document.querySelector('#error-email');

    const value = this._formEmail.value.trim();

    if (!/^[a-zA-Z0-9_-]{3,15}@[a-z]{4,}\.[a-z]{2,}$/.test(value)) {
      this._formEmail.classList.remove('form__input--valid');
      this._formEmail.classList.add('form__input--invalid');
    } else {
      this._formEmail.classList.remove('form__input--invalid');
      this._formEmail.classList.add('form__input--valid');
    }

    const [username, domain] = value.split('@');
    if (!username) {
      errorEl.textContent = 'Отсутствует имя пользователя перед @';
      errorEl.style.display = 'block';
    } else if (username.length < 3) {
      errorEl.textContent = 'Имя пользователя слишком короткое';
      errorEl.style.display = 'block';
    } else if (username.length > 15) {
      errorEl.textContent = 'Имя пользователя слишком длинное';
      errorEl.style.display = 'block';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      errorEl.textContent =
        'Имя пользователя может содержать только латинские буквы, цифры, дефис и подчёркивание';
      errorEl.style.display = 'block';
    } else if (!domain) {
      errorEl.textContent = 'Отсутствует домен после @';
      errorEl.style.display = 'block';
    } else {
      const [firstLevel, topLevel] = domain.split('.');

      if (firstLevel && topLevel) {
        if (!/^[a-z]{4,}$/.test(firstLevel) || !/^[a-z]{2,}$/.test(topLevel)) {
          errorEl.textContent = 'Некорректный Email!';
          errorEl.style.display = 'block';
        } else {
          errorEl.style.display = 'none';
        }
      } else {
        errorEl.style.display = 'none';
      }
    }
  }

  _validatePhone() {
    const errorEl = document.querySelector('#error-phone');

    const value = this._formPhone.value.trim();
    const digitsOnly = value.replace(/[\s-]/g, '');
    const allowedChars = /^[\d\s-]+$/.test(value);
    const digitsAmount = digitsOnly.length > 4 && digitsOnly.length <= 10;
    const validFormate = /^(\d{1,3}([-\s]?\d{2,3})*)$/.test(value);

    const valid = allowedChars && digitsAmount && validFormate;

    if (!valid) {
      this._formPhone.classList.remove('form__input--valid');
      this._formPhone.classList.add('form__input--invalid');
    } else {
      this._formPhone.classList.remove('form__input--invalid');
      this._formPhone.classList.add('form__input--valid');
    }

    if (!value) {
      errorEl.textContent = 'Поле телефона пустое';
      errorEl.style.display = 'block';
    } else if (!allowedChars) {
      errorEl.textContent = 'Номер может содержать только цифры';
      errorEl.style.display = 'block';
    } else if (!digitsAmount) {
      errorEl.textContent = 'Длина номера не менее 5 и не более 10 цифр';
      errorEl.style.display = 'block';
    } else if (!validFormate) {
      errorEl.textContent = 'Неверный формат';
      errorEl.style.display = 'block';
    } else {
      errorEl.style.display = 'none';
    }
  }
}

export default TicketsForm;
