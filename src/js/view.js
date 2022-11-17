class View {
  _calculator = document.querySelector(".calculator");
  _tipOption = document.querySelectorAll(".select-tip__option--numbered");
  _tipCustomBtn = document.querySelector(".select-tip__option--custom");
  _tipCustom = document.querySelector(".bill-input--tip-select");
  _tipCustomInput = document.querySelector(".bill-input__amount--custom-tip");
  _totalBill = document.querySelector(".bill-input__amount--total");
  _numPeople = document.querySelector(".bill-input__amount--people");
  _tipPerPerson = document.querySelector(
    ".amount-container__amount--tip-per-person"
  );
  _totalPerPerson = document.querySelector(
    ".amount-container__amount--total-per-person"
  );
  _reset = document.querySelector(".btn--reset");

  _clearBtns() {
    // Clear select options active
    this._tipOption.forEach((option) => option.classList.remove("selected"));

    // Clear custom active
    this._tipCustomBtn.classList.remove("selected");
  }

  _renderError(input) {
    // Select input container
    const inputContainer = input.closest(".bill-input");
    inputContainer.classList.add("input--error");

    // Select error heading
    const errorHeading =
      inputContainer.closest(".input-container").firstElementChild
        .lastElementChild;
    errorHeading.classList.remove("hidden");
  }

  _removeError(input) {
    // Select input container
    const inputContainer = input.closest(".bill-input");
    inputContainer.classList.remove("input--error");

    // Select error heading
    const errorHeading =
      inputContainer.closest(".input-container").firstElementChild
        .lastElementChild;
    errorHeading.classList.add("hidden");
  }

  _inputFocus() {
    // Selecting the bill field to focus
    this._totalBill.focus();
  }

  getTipOptions(handler) {
    // Listening to Tip Options button clicks
    this._tipOption.forEach((option) => {
      const selectOption = function () {
        // Get selected tip
        const selected = +option.dataset.select;

        // Highlight selected button
        this._clearBtns();
        option.classList.add("selected");

        // Pass it to the handler
        handler(selected);

        // Focus on number of people selected
        this._numPeople.focus();

        // Hide custom tip input
        this._tipCustom.classList.remove("active");

        // Clear custom tip input
        this._tipCustomInput.value = "";
      };

      option.addEventListener("click", selectOption.bind(this));
    });
  }

  getCustomTip(handler) {
    // Listening to Custom Tip Option button click
    const customOption = () => {
      // Show custom tip input
      this._tipCustom.classList.toggle("active");

      // Highlight selected button
      this._clearBtns();
      this._tipCustomBtn.classList.add("selected");

      // Focus custom tip input
      setTimeout(() => this._tipCustomInput.focus(), 500);

      // Clear preselected tip
      handler();
    };

    this._tipCustomBtn.addEventListener("click", customOption.bind(this));
  }

  getSubmission(handler) {
    // Get input submissions
    const submissions = function (e) {
      // Prevent form submission
      e.preventDefault();

      // Get bill input values
      const bill = +this._totalBill.value;

      // Bill input values validation
      if (!Number.isFinite(bill) || bill < 0 || bill === 0 || bill === "")
        return this._renderError(this._totalBill);
      else this._removeError(this._totalBill);

      // Get number of people input values
      const people = +this._numPeople.value;

      // Number of people input values validation
      if (
        !Number.isFinite(people) ||
        people < 0 ||
        people === 0 ||
        people === ""
      )
        return this._renderError(this._numPeople);
      else this._removeError(this._numPeople);

      // Check if tip option selected
      const selectTipOption = Array.from(this._tipOption).some(
        ({ classList }) => classList.contains("selected")
      );

      // Get custom tip input values
      const customTipInput = +this._tipCustomInput.value;

      // Tip values validation
      if (
        (!Number.isFinite(customTipInput) ||
          customTipInput < 0 ||
          customTipInput === 0 ||
          customTipInput === "") &&
        selectTipOption === false
      )
        return this._renderError(this._tipCustomInput);
      else this._removeError(this._tipCustomInput);

      // Pass input values to handler
      handler(bill, people, customTipInput);

      // Highlight reset button
      this._reset.classList.add("active--reset");
      this._reset.disabled = false;
    };

    // Listen for submission
    this._calculator.addEventListener("submit", submissions.bind(this));
  }

  showCalculations(data) {
    const tipPerIndividual = data.tipPerPerson.toFixed(2);
    const amountPerIndividual = data.amountPerPerson.toFixed(2);

    // Display tip per person
    this._tipPerPerson.innerHTML = `&dollar;${tipPerIndividual}`;

    // Dipslay amount per person
    this._totalPerPerson.innerHTML = `&dollar;${amountPerIndividual}`;
  }

  reset(handler) {
    const resets = function () {
      // Clear inputs
      this._tipCustomInput.value =
        this._totalBill.value =
        this._numPeople.value =
          "";

      // Clear calculations
      this._tipPerPerson.innerHTML =
        this._totalPerPerson.innerHTML = `&dollar;0.00`;

      // Hide custom input field
      this._tipCustom.classList.remove("active");

      // Highlight selected button
      this._clearBtns();

      // Call the handler function
      handler();

      // Highlight reset button
      this._reset.classList.remove("active--reset");

      // Disable reset button
      this._reset.disabled = true;
    };

    this._reset.addEventListener("click", resets.bind(this));
  }
}

export default new View();
