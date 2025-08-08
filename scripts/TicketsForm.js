class TicketsForm {
  _dateEl = document.querySelector('[name="visit-date"]');
  _timeEl = document.querySelector('[name="visit-time"]');

  _dateInfoEl = document.querySelector('#info-date');
  _timeInfoEl = document.querySelector('#info-time');
  constructor() {
    this._dateEl.addEventListener('change', this._displayDate.bind(this));
    this._timeEl.addEventListener('change', this._displayTime.bind(this));

    document.addEventListener('DOMContentLoaded', this._correctDate.bind(this));
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
  }

  _displayTime() {
    const selectTime = document.querySelector('select[name="visit-time"]');
    this._timeInfoEl.textContent = selectTime.value.split(':').join(' : ');
  }
}

export default TicketsForm;
