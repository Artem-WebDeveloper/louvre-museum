class TicketsCalculatorPopup {
  _btnOpenForm = document.querySelector('.btn-buy');
  _btnCloseForm = document.querySelector('.tickets-popup__btn-close');
  _popupModal = document.querySelector('.tickets-popup');

  _btnMinusBasic = document.querySelectorAll('[data-btn="basic-minus-pop"]');
  _btnPlusBasic = document.querySelectorAll('[data-btn="basic-plus-pop"]');
  _btnMinusSenior = document.querySelectorAll('[data-btn="senior-minus-pop"]');
  _btnPlusSenior = document.querySelectorAll('[data-btn="senior-plus-pop"]');

  _selectsType = document.querySelectorAll('[name="type-ticket"]');

  _amountBasic = document.querySelector('[data-basic-pop]');
  _amountSenior = document.querySelector('[data-senior-pop]');

  _totalElement = document.querySelector('#total-all');
  _basicTotalEl = document.querySelector('#basic-total');
  _seniorTotalEl = document.querySelector('#senior-total');
  _basicAmountEl = document.querySelector('.amount-tickets-basic');
  _seniorAmountEl = document.querySelector('.amount-tickets-senior');
  _basicPriceElements = document.querySelectorAll('.tickets-price-basic');
  _seniorPriceElements = document.querySelectorAll('.tickets-price-senior');
  _typeOfTicketEl = document.querySelector('#type-ticket-info');

  typeOfTicket = {
    light: 20,
    standard: 25,
    premium: 40,
  };

  total = {
    basic: 0,
    senior: 0,
    totalSum: 0,
  };

  constructor() {
    this._btnOpenForm.addEventListener('click', this._openForm.bind(this));
    this._btnCloseForm.addEventListener('click', this._closeForm.bind(this));
    this._popupModal.addEventListener('click', e => {
      if (e.target === this._popupModal) this._closeForm();
    });
    document.addEventListener('keydown', e => {
      if (
        e.code === 'Escape' &&
        !this._popupModal.classList.contains('tickets-popup--hiden')
      )
        this._closeForm();
    });

    [
      ...this._btnMinusBasic,
      ...this._btnPlusBasic,
      ...this._btnMinusSenior,
      ...this._btnPlusSenior,
    ].forEach(btn => {
      btn.addEventListener('click', this._updateTotals.bind(this));
    });

    const ticketSelect = document.querySelector(
      'select[name="type-ticket-pop"]'
    );
    if (ticketSelect) {
      ticketSelect.addEventListener('change', this._updateTotals.bind(this));
    }

    this._loadState();

    this._updateTotals();
  }

  _updateTotals() {
    this._calculateBasic();
    this._calculateSenior();
    this._calculateTotal();
    this._displayTotal();
    this._displayAmounts();
    this._displayPrices();
    this._displayTypeOfTicket();

    // this._saveState();
  }

  _calculateBasic() {
    const selectedOption = document.querySelector(
      'select[name="type-ticket-pop"]'
    );
    if (!selectedOption) return;
    this.total.basic =
      +this.typeOfTicket[selectedOption.value] * +this._amountBasic.value;
  }

  _calculateSenior() {
    const selectedOption = document.querySelector(
      'select[name="type-ticket-pop"]'
    );
    if (!selectedOption) return;
    this.total.senior =
      (+this.typeOfTicket[selectedOption.value] * +this._amountSenior.value) /
      2;
  }

  _calculateTotal() {
    this.total.totalSum = this.total.basic + this.total.senior;
  }

  _displayTotal() {
    this._totalElement.textContent = `${this.total.totalSum} €`;

    this._basicTotalEl.textContent = `${this.total.basic} €`;
    this._seniorTotalEl.textContent = `${this.total.senior} €`;
  }

  _displayAmounts() {
    this._basicAmountEl.textContent = `${this._amountBasic.value}`;
    this._seniorAmountEl.textContent = `${this._amountSenior.value}`;
  }

  _displayPrices() {
    const selectedOption = document.querySelector(
      'select[name="type-ticket-pop"]'
    );
    this._basicPriceElements.forEach(el => {
      el.textContent = this.typeOfTicket[selectedOption.value];
    });
    this._seniorPriceElements.forEach(el => {
      el.textContent = +this.typeOfTicket[selectedOption.value] / 2;
    });
  }

  _displayTypeOfTicket() {
    const selectedOption = document.querySelector(
      'select[name="type-ticket-pop"]'
    );

    this._typeOfTicketEl.textContent =
      selectedOption.options[selectedOption.selectedIndex].textContent;
  }

  /*  _saveState() {
    const selectedOption = document.querySelector(
      'input[name="type-ticket"]:checked'
    );

    const state = {
      selectedType: selectedOption?.value || null,
      basicAmount: this._amountBasic.value,
      seniorAmount: this._amountSenior.value,
    };

    localStorage.setItem('ticketsCalculatorState', JSON.stringify(state));
  } */

  _loadState() {
    const stateStorage = localStorage.getItem('ticketsCalculatorState');
    if (!stateStorage) return;

    const state = JSON.parse(stateStorage);

    if (state.basicAmount !== undefined) {
      this._amountBasic.value = state.basicAmount;
    }
    if (state.seniorAmount !== undefined) {
      this._amountSenior.value = state.seniorAmount;
    }

    if (state.selectedType) {
      const radioToSelect = document.querySelector(
        `input[name="type-ticket"][value="${state.selectedType}"]`
      );
      if (radioToSelect) {
        radioToSelect.checked = true;
      }

      const selectPopup = document.querySelector(
        'select[name="type-ticket-pop"]'
      );
      if (selectPopup) {
        selectPopup.value = state.selectedType;

        selectPopup.dispatchEvent(new Event('change'));
      }
    }
  }

  _openForm() {
    this._popupModal.classList.remove('tickets-popup--hiden');
    this._loadState();

    this._updateTotals();
  }
  _closeForm(e) {
    if (e) e.preventDefault();
    this._popupModal.classList.add('tickets-popup--hiden');

    this._loadState();

    this._updateTotals();
  }
}
export default TicketsCalculatorPopup;
