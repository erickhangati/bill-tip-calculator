import * as model from "./model";
import view from "./view";

// Polyfilling for old browsers
import "core-js/stable";
import "regenerator-runtime/runtime";

const controlTipSelect = function (tipOptions) {
  // Set tip selection
  model.state.tipSelect = +tipOptions;
};

const controlCustomTip = function () {
  // Clear preselected tip option
  model.state.tipSelect = "";
};

const controlSubmission = function (bill, people, customTip) {
  // Set bill amount
  model.state.bill = bill;

  // Set number of people
  model.state.people = people;

  // Set custom tip
  if (customTip) model.state.tip = customTip;

  // Set tip
  if (model.state.tipSelect) model.calcTip();

  // Set tip per person
  model.calcTipPerPerson();

  // Set amount per person
  model.calcAmountPerPerson();

  // Display calculations
  view.showCalculations(model.state);
};

const controlReset = function () {
  // Reset the state
  model.state.amountPerPerson =
    model.state.bill =
    model.state.people =
    model.state.tip =
    model.state.tipPerPerson =
    model.state.tipSelect =
      "";
};

const init = function () {
  // Listening for tip select options
  view.getTipOptions(controlTipSelect);

  // Listening for custom button click
  view.getCustomTip(controlCustomTip);

  // Listening to submissions
  view.getSubmission(controlSubmission);

  // Listening to reset button
  view.reset(controlReset);

  // Listening ti inputs focus
  view._inputFocus();
};

init();
