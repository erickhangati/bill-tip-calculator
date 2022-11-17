export const state = {};

export const calcTip = function () {
  // Calculate tip from selected option
  state.tip = (state.tipSelect / 100) * state.bill;
};

export const calcTipPerPerson = function () {
  // Calculate tip per person
  state.tipPerPerson = state.tip / state.people;
};

export const calcAmountPerPerson = function () {
  // Calculate amount per person
  state.amountPerPerson = (state.bill + state.tip) / state.people;
};
