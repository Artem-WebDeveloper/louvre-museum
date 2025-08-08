class TicketsCalculator {
  _btnMinusBasic = document.querySelectorAll('[data-btn="basic-minus"]');
  _btnPlusBasic = document.querySelectorAll('[data-btn="basic-plus"]');
  _btnMinusSenior = document.querySelectorAll('[data-btn="senior-minus"]');
  _btnPlusSenior = document.querySelectorAll('[data-btn="senior-plus"]');

  _selectsType = document.querySelectorAll('[name="type-ticket"]');

  _amountBasic = document.querySelector('[data-basic]');
  _amountSenior = document.querySelector('[data-senior]');

  _totalElement = document.querySelector('.tickets-buy__total');

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
    [
      ...this._btnMinusBasic,
      ...this._btnPlusBasic,
      ...this._btnMinusSenior,
      ...this._btnPlusSenior,
    ].forEach(btn => {
      btn.addEventListener('click', this._updateTotals.bind(this));
    });

    this._selectsType.forEach(select => {
      select.addEventListener('change', this._updateTotals.bind(this));
    });

    this._loadState();

    this._updateTotals();
  }

  _updateTotals() {
    this._calculateBasic();
    this._calculateSenior();
    this._calculateTotal();
    this._displayTotal();

    this._saveState();
  }

  _calculateBasic() {
    const selectedOption = document.querySelector(
      'input[name="type-ticket"]:checked'
    );
    this.total.basic =
      +this.typeOfTicket[selectedOption.value] * +this._amountBasic.value;
  }

  _calculateSenior() {
    const selectedOption = document.querySelector(
      'input[name="type-ticket"]:checked'
    );
    this.total.senior =
      (+this.typeOfTicket[selectedOption.value] * +this._amountSenior.value) /
      2;
  }

  _calculateTotal() {
    this.total.totalSum = this.total.basic + this.total.senior;
  }

  _displayTotal() {
    this._totalElement.textContent = `Total €${this.total.totalSum}`;
  }

  _saveState() {
    const selectedOption = document.querySelector(
      'input[name="type-ticket"]:checked'
    );

    const state = {
      selectedType: selectedOption?.value || null,
      basicAmount: this._amountBasic.value,
      seniorAmount: this._amountSenior.value,
    };

    localStorage.setItem('ticketsCalculatorState', JSON.stringify(state));
  }

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
}
export default TicketsCalculator;
