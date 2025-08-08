class TicketsForm {
  _dateEl = document.querySelector('[name="visit-date"]');
  _timeEl = document.querySelector('[name="visit-time"]');

  _dateInfoEl = document.querySelector('#info-date');
  _timeInfoEl = document.querySelector('#info-time');

  _formName = document.querySelector('#name');
  constructor() {
    this._dateEl.addEventListener('change', this._displayDate.bind(this));
    this._timeEl.addEventListener('change', this._displayTime.bind(this));

    document.addEventListener('DOMContentLoaded', this._correctDate.bind(this));

    this._formName.addEventListener('input', this._validateName.bind(this));
    this._formName.addEventListener('blur', () => {
      const errorEl = document.querySelector('#error-name');
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
    console.log('input');

    const value = this._formName.value.trim();

    if (!/^[a-zA-Zа-яА-ЯёЁ\s]{3,15}$/.test(value)) {
      this._formName.classList.remove('form__input--valid');
      this._formName.classList.add('form__input--invalid');
    } else {
      this._formName.classList.remove('form__input--invalid');
      this._formName.classList.add('form__input--valid');
    }

    if (value.length < 3) {
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
}

export default TicketsForm;
