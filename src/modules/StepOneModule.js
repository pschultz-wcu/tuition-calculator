export default class StepOneModule {
  setOptions(that, n, o) {
    for (const program of Object.keys(o)) {
      that.stepData.stepOne.fields[n].options.push(program);
    }
  }

  multipleOptions(that, n, o) {
    that.setOptions(n, o);
    that.stepData.stepOne.fields[n].disabled = false;
  }

  oneOption(that, n, o) {
    console.log("nextField = ", n);
    console.log("options = ", Object.keys(o)[0]);
    that.setOptions(n, o);

    that.userChoices.stepOne[n] = Object.keys(o)[0];
    that.stepData.stepOne.fields[n].disabled = false;
    that.stepData.stepOne.fields[n + 1].disabled = false;
    that.handleSelection(n);
  }

  setFields(that, nextField, options) {
    console.log(Object.keys(options).length == 1);
    Object.keys(options).length == 1
      ? that.oneOption(nextField, options)
      : that.multipleOptions(nextField, options);
  }

  clearSuccessiveFields(that, index) {
    console.log(index, that.previousIndex);
    let clearIndex = index + 1;
    while (clearIndex < 4) {
      console.log(clearIndex);
      that.userChoices.stepOne[clearIndex] = "";
      clearIndex++;
    }
    that.stepperKey += 1;
  }

  setStepOneUserChoices(that, index) {
    let options;
    switch (index) {
      case 0:
        options = that.wcuProgramData[that.userChoices.stepOne[0]];
        break;
      case 1:
        options =
          that.wcuProgramData[that.userChoices.stepOne[0]][
            that.userChoices.stepOne[1]
          ];
        break;
      case 2:
        options =
          that.wcuProgramData[that.userChoices.stepOne[0]][
            that.userChoices.stepOne[1]
          ][that.userChoices.stepOne[2]];
        break;
    }
    return options;
  }

  handleSelection(that, index) {
    console.log("previous index: " + that.previousIndex, "index: " + index);
    that.stepData.stepOne.fields[index + 1].options = [];
    if (that.previousIndex !== null && index < that.previousIndex) {
      that.clearSuccessiveFields(index);
    }
    const options = that.setStepOneUserChoices(index);
    console.log(options);
    that.previousIndex = index;
    that.setFields(index + 1, options);
  }
}
