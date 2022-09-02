export default class CalculationModule {
  setTuitionRate(that) {
    that.userChoices.stepTwo.tuition.rate =
      that.stepData.stepTwo.tuition.rates[
        that.stepData.stepTwo.tuition.options.indexOf(
          that.userChoices.stepTwo.tuition.option
        )
      ];
  }

  calculateTuition(that) {
    let cost =
      that.userChoices.stepTwo.tuition.rate * 120 -
      that.userChoices.stepFour.transferCredits *
        that.userChoices.stepTwo.tuition.rate +
      that.calculatorData.fees;
    that.calculatorData.estimatedTuition = `$${cost}`;
  }
}
